'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientAlerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PatientAlerts.init({
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
      type:DataTypes.DATE
    },
    ALERT_TYPE: {
      type:DataTypes.INTEGER
    },
    COLOR: {
      type:DataTypes.STRING
    },
    DATE_OF_ACTION: {
      type:DataTypes.DATE,
      primaryKey: true
    },
    ACTION: {
      type:DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'PatientAlerts',
    tableName: 'PatientAlerts',
    timestamps: false
  });
  return PatientAlerts;
};