const express = require("express");
var Sequelize = require('sequelize');
const { HAT_Alert_Setup, HatPatient, Patient_Exercise_Diary, PatientAlerts, Arm_Bike_Exercise } = require("../models");


const Op = Sequelize.Op;

const MonthlyAlert = async (req, res) => {
    ExerciseMonthlyAlert()
};


const ExerciseMonthlyAlert = async() =>{
    const AlertSetup = await HAT_Alert_Setup.findAll({where:{
        STC_MISSING_DAYS_LAST_30: {
            [Op.not]: null
          }
        },
        include: [
            {
                model: HatPatient,
                as: 'patient',
            },
        ]
    });
    for (let i = 0; i < AlertSetup.length; i++) {
         console.log("Patient Id : "+AlertSetup[i].PATIENT_ID)
         const today = new Date().toLocaleDateString()
         const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString()  
         var lastExercise = await Patient_Exercise_Diary.findAll({
            where: { 
                PATIENT_ID:AlertSetup[i].PATIENT_ID,
                END_DATE: {[Op.between] : [thirtyDaysAgo , today ]}
            },
            order: [[ 'END_DATE', 'DESC' ]],
        })
        if(lastExercise != null){
            // console.log(lastExercise.length)
            const needToWorkDays = 30 - parseInt(AlertSetup[i].STC_MISSING_DAYS_LAST_30)
            console.log("clinican Request work days" + needToWorkDays)
            if(lastExercise.length < needToWorkDays){
                const createAlert = {
                    PATIENT_ID:AlertSetup[i].PATIENT_ID,
                    LAST_NAME:AlertSetup[i].patient.LAST_NAME,
                    FIRST_NAME:AlertSetup[i].patient.FIRST_NAME,
                    ALERT_ID:AlertSetup[i].ALERT_SETUP_ID,
                    DATE_OF_ALERT:today,
                    ALERT_TYPE:`NO Enough Exercise, for last 30 days patient require to exercise for unless ${needToWorkDays}, from ${thirtyDaysAgo} to ${today} but patient only exercise for ${lastExercise.length} day`
                }

                const alertSend = await setAlertToDatabase(createAlert)
                console.log(createAlert)
            }
        }
    }
}



const setAlertToDatabase = async(createAlert) =>{
    try {
        return await PatientAlerts.create(createAlert);                
    }catch (err) {
        console.log(err);
    }
}

module.exports = {
    MonthlyAlert,
};
