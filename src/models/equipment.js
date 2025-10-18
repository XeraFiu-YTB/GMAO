const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Equipment = sequelize.define('Equipment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  manufacturer: {
    type: DataTypes.STRING
  },
  serial_number: {
    type: DataTypes.STRING
  }
});

module.exports = Equipment;
