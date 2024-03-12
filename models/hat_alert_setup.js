'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HAT_Alert_Setup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.HatPatient, { foreignKey: 'PATIENT_ID' , as: 'patient'})
    }
  }
  HAT_Alert_Setup.init({
    ALERT_SETUP_ID: {
      type:DataTypes.INTEGER,
      primaryKey: true, 
    },
    PATIENT_ID: {
      type:DataTypes.INTEGER
    },
    STC_MISSING_CONSEC_DAYS: {
      type:DataTypes.INTEGER
    },
    STC_MISSING_DAYS_LAST_7: {
      type:DataTypes.INTEGER
    },
    STC_MISSING_DAYS_LAST_30: {
      type:DataTypes.INTEGER
    },
    PATIENT_MESSAGE: {
      type:DataTypes.BOOLEAN
    },
    MEDICATION_MESSAGE: {
      type:DataTypes.INTEGER
    },
    MODIFIED_DATE: {
      type:DataTypes.INTEGER
    },
    STC_MISSING_ARMBIKE_DAYS: {
      type:DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'HAT_Alert_Setup',
    tableName: 'HAT_ALERT_SETUP',
    timestamps:false
  });
  return HAT_Alert_Setup;
};