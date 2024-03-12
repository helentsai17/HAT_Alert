'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arm_Bike_Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Arm_Bike_Exercise.init({
    Timestamp:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    Speed: {
      type: DataTypes.INTEGER
    },
    Patient_ID: {
      type: DataTypes.INTEGER
    },
    Spo2: {
      type: DataTypes.INTEGER
    },
    HeartRate: {
      type: DataTypes.INTEGER
    },
    datetime: {
      type: DataTypes.DATE
    },
    Session_ID: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Arm_Bike_Exercise',
    tableName: 'Arm_Bike_Exercise',
    timestamps:false
  });
  return Arm_Bike_Exercise;
};