const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Location = require('./location');

const Equipment = sequelize.define('Equipment', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  manufacturer: {
    type: DataTypes.STRING
  },
  serial_number: {
    type: DataTypes.STRING
  },
  running_hours: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

Equipment.belongsTo(Location);

module.exports = Equipment;
