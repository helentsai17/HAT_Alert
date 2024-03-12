'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient_Exercise_Diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patient_Exercise_Diary.init({
    PATIENT_EXERCISE_DIARY_ID: {
      type:DataTypes.INTEGER,
      primaryKey: true,
    },
    PATIENT_ID: {
      type:DataTypes.INTEGER
    }, 
    START_DATE:{
      type:DataTypes.DATE
    },
    END_DATE:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Patient_Exercise_Diary',
    tableName: 'PATIENT_EXERCISE_DIARY',
    timestamps:false,
    createdAt: false,
    updatedAt: false,
  });
  return Patient_Exercise_Diary;
};