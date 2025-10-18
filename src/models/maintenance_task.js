const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Equipment = require('./equipment');

const MaintenanceTask = sequelize.define('MaintenanceTask', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  due_date: {
    type: DataTypes.DATE
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

MaintenanceTask.belongsTo(Equipment);

module.exports = MaintenanceTask;
