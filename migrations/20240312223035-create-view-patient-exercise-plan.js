'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ViewPatientExercisePlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      CURRENT_EXERCISE_ID: {
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
      PATIENT_ID: {
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ViewPatientExercisePlans');
  }
};