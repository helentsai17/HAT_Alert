'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ViewPatientExercisePlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.HatPatient, { foreignKey: 'PATIENT_ID' , as: 'patient'})
    }
  }
  ViewPatientExercisePlan.init({
    CURRENT_EXERCISE_ID: {
      type:DataTypes.INTEGER,
      primaryKey:true
    },
    PATIENT_ID: {
      type:DataTypes.INTEGER
    },
    ACTION_PLAN_ID: {
      type:DataTypes.INTEGER
    },
    EXERCISE_ID: {
      type:DataTypes.INTEGER
    },
    SEQUENCE_NUM:{
      type:DataTypes.INTEGER
    },
    SECONDS: {
      type:DataTypes.INTEGER
    },
    TIMES: {
      type:DataTypes.INTEGER
    },
    SETS: {
      type:DataTypes.INTEGER
    },
    SESSIONS: {
      type:DataTypes.INTEGER
    },
    WEIGHTS: {
      type:DataTypes.FLOAT
    },
    REPS_THRESHOLD: {
      type:DataTypes.INTEGER
    },
    SETS_THRESHOLD: {
      type:DataTypes.INTEGER
    },
    BEGIN_DATE: {
      type:DataTypes.DATE
    },
    END_DATE: {
      type:DataTypes.DATE
    },
    NAME: {
      type:DataTypes.STRING
    },
    LastUpdatedBy: {
      type:DataTypes.STRING
    },
    Total_Reps_Threshold: {
      type:DataTypes.INTEGER
    },
    Total_Sets_Threshold: {
      type:DataTypes.INTEGER
    },
    INSTRUCTION: {
      type:DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'ViewPatientExercisePlan',
    tableName:'vwPatientExercisePlan',
    timestamps:false
  });
  return ViewPatientExercisePlan;
};