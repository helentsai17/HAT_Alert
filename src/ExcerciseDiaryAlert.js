const express = require("express");
var Sequelize = require('sequelize');
const { HAT_Alert_Setup, HatPatient, Patient_Exercise_Diary, PatientAlerts, Arm_Bike_Exercise, ViewPatientExercisePlan, Patient_Exercise_Diary_Detail } = require("../models");


const Op = Sequelize.Op;

const ExcerciseDiaryAlert = async (req, res) => {
    // MissingConsecutiveByDay()
    // ExerciseWeeklyAlert()
    // ExerciseMonthlyAlert()
    // ArmBikeExerciseAlert()
        await PerExerciseRepeatCheckAlert()
//    await PerExerciseSetCheckAlert()
};

const PerExerciseSetCheckAlert = async() =>{

    const ExercisePlans = await ViewPatientExercisePlan.findAll({
        where: {
            SETS_THRESHOLD:{[Op.gt]: 0}
        },
        include: [{ model: HatPatient, as:'patient'}]
    })

    // console.log(ExercisePlans)

    for (let i = 0; i < ExercisePlans.length; i++) {
        // console.log(ExercisePlans[i].CURRENT_EXERCISE_ID)
        // console.log(ExercisePlans[i].PATIENT_ID)
        // console.log(ExercisePlans[i].patient.LAST_NAME)
        // console.log(ExercisePlans[i].patient.FIRST_NAME)
       
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString();
        const today = new Date()
        Patient_Exercise_Diary.findOne({
            where:{
                PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                END_DATE: { [Op.gte]: yesterday }
            }
        }).then(async(exercise) =>{
            if(!exercise){
                // console.log("patient didn't even exercise yesterday, no data value")
                const createAlert = {
                    PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                    LAST_NAME:ExercisePlans[i].patient.LAST_NAME,
                    FIRST_NAME:ExercisePlans[i].patient.FIRST_NAME,
                    ALERT_ID:ExercisePlans[i].CURRENT_EXERCISE_ID,
                    DATE_OF_ALERT:today,
                    ALERT_TYPE:`NO:EXERCISE RECORD : yesterday ${yesterday} patient did not do exercise, so we did not have record for patient doing exercise ${ExercisePlans[i].NAME}`
                }

                 const alertSend = await setAlertToDatabase(createAlert)
                 console.log(alertSend)
            }else{
                //patient did exercise, find if patient is doing the one
                await Patient_Exercise_Diary_Detail.findAll({
                    where:{
                        PATIENT_EXERCISE_DIARY_ID: exercise.PATIENT_EXERCISE_DIARY_ID,
                        QUESTION_NUM:1, 
                        EXERCISE_ID: ExercisePlans[i].EXERCISE_ID,
                    }
                }).then(async(record) =>{
                    if(!record || record.length <= 0){
                        const ExerciseRecordAlert = {
                            PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                            LAST_NAME:ExercisePlans[i].patient.LAST_NAME,
                            FIRST_NAME:ExercisePlans[i].patient.FIRST_NAME,
                            ALERT_ID:ExercisePlans[i].CURRENT_EXERCISE_ID,
                            DATE_OF_ALERT:today,
                            ALERT_TYPE:`yesterday ${yesterday} patient did not did ${ExercisePlans[i].NAME}`
                        }
                        const alertSend = await setAlertToDatabase(ExerciseRecordAlert)
                        console.log(alertSend)
                    }else{
           
                        // console.log(record.length)
                        
                        if(ExercisePlans[i].SETS_THRESHOLD >  record.length){
                            // console.log("the hightest value "+highestRepeat)
                            const NoEnoughSETAlert = {
                                PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                                LAST_NAME:ExercisePlans[i].patient.LAST_NAME,
                                FIRST_NAME:ExercisePlans[i].patient.FIRST_NAME,
                                ALERT_ID:ExercisePlans[i].CURRENT_EXERCISE_ID,
                                DATE_OF_ALERT:today,
                                ALERT_TYPE:`EXERCISE SET : patient been request to do exercise : ${ExercisePlans[i].NAME}, for ${ExercisePlans[i].SETS_THRESHOLD} set, only did ${record.length}, see if patient need some help`
                            }
                           
                            const alertSend = await setAlertToDatabase(NoEnoughSETAlert)
                            console.log(alertSend)
                        }else{
                            console.log("patient did enought set, do nothing")
                        }
                    }
                })
            }
        })
 

    }
}
 
const PerExerciseRepeatCheckAlert = async() =>{
    const ExercisePlans = await ViewPatientExercisePlan.findAll({
        where: {
                REPS_THRESHOLD:{[Op.gt]: 0}
        },
        include: [{ model: HatPatient, as:'patient'}]
    })

    // console.log(ExercisePlans)

    for (let i = 0; i < ExercisePlans.length; i++) {
        // console.log(ExercisePlans[i].CURRENT_EXERCISE_ID)
        // console.log(ExercisePlans[i].PATIENT_ID)
        // console.log(ExercisePlans[i].patient.LAST_NAME)
        // console.log(ExercisePlans[i].patient.FIRST_NAME)
       
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1)).toLocaleDateString();
        const today = new Date()
        Patient_Exercise_Diary.findOne({
            where:{
                PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                END_DATE: { [Op.gte]: yesterday }
            }
        }).then(async(exercise) =>{
            if(!exercise){
                // console.log("patient didn't even exercise yesterday, no data value")
                const createAlert = {
                    PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                    LAST_NAME:ExercisePlans[i].patient.LAST_NAME,
                    FIRST_NAME:ExercisePlans[i].patient.FIRST_NAME,
                    ALERT_ID:ExercisePlans[i].CURRENT_EXERCISE_ID,
                    DATE_OF_ALERT:today,
                    ALERT_TYPE:`NO:EXERCISE RECORD : yesterday ${yesterday} patient did not do exercise, so we did not have record for patient doing exercise ${ExercisePlans[i].NAME}`
                }
                console.log(createAlert)
            }else{
                //patient did exercise, find if patient is doing the one
                await Patient_Exercise_Diary_Detail.findAll({
                    where:{
                        PATIENT_EXERCISE_DIARY_ID: exercise.PATIENT_EXERCISE_DIARY_ID,
                        QUESTION_NUM:1, 
                        EXERCISE_ID: ExercisePlans[i].EXERCISE_ID,
                    }
                }).then(async(record) =>{
                    if(!record || record.length <= 0){
                        const ExerciseRecordAlert = {
                            PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                            LAST_NAME:ExercisePlans[i].patient.LAST_NAME,
                            FIRST_NAME:ExercisePlans[i].patient.FIRST_NAME,
                            ALERT_ID:ExercisePlans[i].CURRENT_EXERCISE_ID,
                            DATE_OF_ALERT:today,
                            ALERT_TYPE:`yesterday ${yesterday} patient did not did ${ExercisePlans[i].NAME}`
                        }
                        
                        console.log(ExerciseRecordAlert)
                    }else{
                        // patient did this exercise today
                        //find the highest Repeat
                        var highestRepeat = 0
                        for(let j = 0 ; j < record.length; j++ ){
                            // console.log(record[i].PATIENT_ANSWER)
                            if(highestRepeat < record[j].PATIENT_ANSWER){
                                highestRepeat = record[j].PATIENT_ANSWER
                            }
                        }

                        console.log(record.length)
                        
                        if(ExercisePlans[i].REPS_THRESHOLD >  highestRepeat){
                            // console.log("the hightest value "+highestRepeat)
                            const RepeatRecordAlert = {
                                PATIENT_ID:ExercisePlans[i].PATIENT_ID,
                                LAST_NAME:ExercisePlans[i].patient.LAST_NAME,
                                FIRST_NAME:ExercisePlans[i].patient.FIRST_NAME,
                                ALERT_ID:ExercisePlans[i].CURRENT_EXERCISE_ID,
                                DATE_OF_ALERT:today,
                                ALERT_TYPE:`patient been request to do exercise : ${ExercisePlans[i].NAME}, and repeat ${ExercisePlans[i].REPS_THRESHOLD} times, but patient hightest repeat is ${highestRepeat}, see if patient need some help`
                            }
                            const alertSend = await setAlertToDatabase(RepeatRecordAlert)
                            console.log(alertSend)
                        }else{
                            console.log("did reach repeat")
                        }
                       
                    }
                })
            }
        })
 

    }
   
}



const ArmBikeExerciseAlert = async() =>{
    const AlertSetup = await HAT_Alert_Setup.findAll({where:{
        STC_MISSING_ARMBIKE_DAYS: {
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
    console.log(AlertSetup.length)
    for (let i = 0; i < AlertSetup.length; i++) {
        console.log("Patient Id : "+AlertSetup[i].PATIENT_ID)
        var lastExercise = await Arm_Bike_Exercise.findOne({
            where: { PATIENT_ID:AlertSetup[i].PATIENT_ID },
            order: [ [ 'datetime', 'DESC' ] ],
        })
        if(lastExercise != null){
            console.log(lastExercise.datetime)
            const today = new Date()
            const last_exercise_day = new Date(lastExercise.datetime);
            const diffTime =  parseInt((today - last_exercise_day) / (1000 * 60 * 60 * 24), 10);
            console.log(diffTime)
            if(AlertSetup[i].STC_MISSING_ARMBIKE_DAYS < diffTime) {
                const createAlert = {
                    PATIENT_ID:AlertSetup[i].PATIENT_ID,
                    LAST_NAME:AlertSetup[i].patient.LAST_NAME,
                    FIRST_NAME:AlertSetup[i].patient.FIRST_NAME,
                    ALERT_ID:AlertSetup[i].ALERT_SETUP_ID,
                    DATE_OF_ALERT:today,
                    ALERT_TYPE:`did not use ArmBike for ${diffTime} consecultive days, from ${last_exercise_day.toLocaleDateString()} to ${today.toLocaleDateString()}`
                }

                const alertSend = await setAlertToDatabase(createAlert)
                console.log(alertSend)
            }
        }
        
    }
}

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

const ExerciseWeeklyAlert = async() =>{
    const AlertSetup = await HAT_Alert_Setup.findAll({where:{
        STC_MISSING_DAYS_LAST_7: {
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
        //  console.log("clinican Request Date : " + AlertSetup[i].STC_MISSING_DAYS_LAST_7)
         const today = new Date().toLocaleDateString()
         const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()  
         var lastExercise = await Patient_Exercise_Diary.findAll({
            where: { 
                PATIENT_ID:AlertSetup[i].PATIENT_ID,
                END_DATE: {[Op.between] : [sevenDaysAgo , today ]}
            },
            order: [ [ 'END_DATE', 'DESC' ]],
        })
        if(lastExercise != null){
        // console.log(lastExercise.length)
            const needToWorkDays = 7 - parseInt(AlertSetup[i].STC_MISSING_DAYS_LAST_7)
            console.log("clinican Request work days" + needToWorkDays)
            if(lastExercise.length < needToWorkDays){
                const createAlert = {
                    PATIENT_ID:AlertSetup[i].PATIENT_ID,
                    LAST_NAME:AlertSetup[i].patient.LAST_NAME,
                    FIRST_NAME:AlertSetup[i].patient.FIRST_NAME,
                    ALERT_ID:AlertSetup[i].ALERT_SETUP_ID,
                    DATE_OF_ALERT:today,
                    ALERT_TYPE:`NO Enough Exercise, for last 7 days patient require to exercise for unless ${needToWorkDays}, from ${sevenDaysAgo} to ${today} but patient only exercise for ${lastExercise.length} day`
                }

                const alertSend = await setAlertToDatabase(createAlert)
                console.log(alertSend)
            }
        }
    }
}

const MissingConsecutiveByDay = async () =>{
    const AlertSetup = await HAT_Alert_Setup.findAll({where:{
        STC_MISSING_CONSEC_DAYS: {
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
        // console.log("Patient Id : "+AlertSetup[i].PATIENT_ID)
        // console.log(AlertSetup[i].patient.FIRST_NAME)
        // console.log(AlertSetup[i].patient.LAST_NAME)
        // console.log("clinican Request Date : " + AlertSetup[i].STC_MISSING_CONSEC_DAYS)
        var lastExercise = await Patient_Exercise_Diary.findOne({
            where: { PATIENT_ID:AlertSetup[i].PATIENT_ID },
            order: [ [ 'END_DATE', 'DESC' ]],
        })
       
        if(lastExercise != null || lastExercise != undefined){
            const today = new Date()
            const last_exercise_day = new Date(lastExercise.END_DATE);
            const diffTime =  parseInt((today - last_exercise_day) / (1000 * 60 * 60 * 24), 10);
            //check if we want to alert the clinic
            if(AlertSetup[i].STC_MISSING_CONSEC_DAYS < diffTime) {
                const createAlert = {
                    PATIENT_ID:AlertSetup[i].PATIENT_ID,
                    LAST_NAME:AlertSetup[i].patient.LAST_NAME,
                    FIRST_NAME:AlertSetup[i].patient.FIRST_NAME,
                    ALERT_ID:AlertSetup[i].ALERT_SETUP_ID,
                    DATE_OF_ALERT:today,
                    ALERT_TYPE:`NO Exercise for ${diffTime} consecultive day from ${last_exercise_day.toLocaleDateString()} to ${today.toLocaleDateString()}`
                }

                const alertSend = await setAlertToDatabase(createAlert)
                console.log(alertSend)
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
    ExcerciseDiaryAlert,
};
