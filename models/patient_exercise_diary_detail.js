'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient_Exercise_Diary_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient_Exercise_Diary_Detail.init({
    PATIENT_EXERCISE_DIARY_DETAIL_ID: {
      type:DataTypes.INTEGER
    },
    PATIENT_EXERCISE_DIARY_ID: {
      type:DataTypes.INTEGER
    }, 
    EXERCISE_ID:{
      type:DataTypes.INTEGER
    },
    EX_START_TIME:{
      type:DataTypes.DATE
    },
    EX_END_TIME:{
      type:DataTypes.DATE
    }, 
    QUESTION_NUM:{
      type:DataTypes.INTEGER
    }, 
    PATIENT_ANSWER:{
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName:'Patient_Exercise_Diary_Detail',
    tableName:'PATIENT_EXERCISE_DIARY_DETAIL',
    timestamps:false
  });
  return Patient_Exercise_Diary_Detail;
};