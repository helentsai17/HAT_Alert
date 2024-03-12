'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('PatientAlerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      PATIENT_ID: {
        type:DataTypes.INTEGER
      },
      LAST_NAME: {
        type:DataTypes.STRING
      },
      FIRST_NAME: {
        type:DataTypes.STRING
      },
      ALERT_ID: {
        type:DataTypes.INTEGER
      },
      DATE_OF_ALERT: {
        type:DataTypes.INTEGER
      },
      ALERT_TYPE: {
        type:DataTypes.INTEGER
      },
      COLOR: {
        type:DataTypes.INTEGER
      },
      DATE_OF_ACTION: {
        type:DataTypes.INTEGER
      },
      ACTION: {
        type:DataTypes.INTEGER
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('PatientAlerts');
  }
};