const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Location = sequelize.define('Location', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Location;
