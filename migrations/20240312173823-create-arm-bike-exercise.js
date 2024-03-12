"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Arm_Bike_Exercises", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Time: {
        type: DataTypes.INTEGER,
      },
      Speed: {
        type: DataTypes.INTEGER,
      },
      Patient_ID: {
        type: DataTypes.INTEGER,
      },
      Spo2: {
        type: DataTypes.INTEGER,
      },
      HeartRate: {
        type: DataTypes.INTEGER,
      },
      datetime: {
        type: DataTypes.DATE,
      },
      Session_ID: {
        type: DataTypes.INTEGER,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("Arm_Bike_Exercises");
  },
};
