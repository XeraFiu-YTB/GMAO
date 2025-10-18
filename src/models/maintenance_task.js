const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Equipment = require('./equipment');

const MaintenanceTask = sequelize.define('MaintenanceTask', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  task_type: {
    type: DataTypes.ENUM('date-based', 'usage-based'),
    allowNull: false,
    defaultValue: 'date-based'
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  interval_hours: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  next_due_hours: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

MaintenanceTask.belongsTo(Equipment);

module.exports = MaintenanceTask;
