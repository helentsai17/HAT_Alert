"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HatPatient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.HAT_Alert_Setup, { foreignKey: 'Patient_ID', as:'HAT_alert_setup' })
    }
  }
  HatPatient.init(
    {
      Patient_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, 
        autoIncrement:true
      },
      LAST_NAME: {
        type: DataTypes.STRING,
      },
      FIRST_NAME: {
        type: DataTypes.STRING,
      },
      EMAIL:{
        type: DataTypes.STRING,
      },
      RACE: {
        type: DataTypes.INTEGER,
      },
      GENDER:{
        type: DataTypes.STRING,
      },
      DATE_OF_BIRTH: {
        type: DataTypes.DATE,
      },
      USER_NAME: {
        type: DataTypes.STRING,
      },
      PASSWORD: {
        type: DataTypes.STRING,
      },
      SALT: {
        type: DataTypes.STRING,
      },
      CreatedBy: {
        type: DataTypes.STRING,
      },
      LastUpdatedBy: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      modelName: "HatPatient",
      tableName:"HAT_PATIENTS",
      timestamps: false,
    }
  );
  return HatPatient;
};
