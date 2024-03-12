'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Patient_Exercise_Diaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      PATIENT_EXERCISE_DIARY_ID: {
        type:DataTypes.INTEGER
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Patient_Exercise_Diaries');
  }
};