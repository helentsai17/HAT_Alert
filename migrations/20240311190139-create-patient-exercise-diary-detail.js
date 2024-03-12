'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Patient_Exercise_Diary_Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Patient_Exercise_Diary_Details');
  }
};