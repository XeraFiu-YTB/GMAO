const MaintenanceTask = require('../models/maintenance_task');
const Equipment = require('../models/equipment');

// Get all maintenance tasks
exports.getAllMaintenanceTasks = async (req, res) => {
  try {
    const tasks = await MaintenanceTask.findAll({ include: Equipment });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get maintenance task by ID
exports.getMaintenanceTaskById = async (req, res) => {
  try {
    const task = await MaintenanceTask.findByPk(req.params.id, { include: Equipment });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Maintenance task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new maintenance task
exports.createMaintenanceTask = async (req, res) => {
  try {
    const newTask = await MaintenanceTask.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update maintenance task
exports.updateMaintenanceTask = async (req, res) => {
  try {
    const task = await MaintenanceTask.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Maintenance task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete maintenance task
exports.deleteMaintenanceTask = async (req, res) => {
  try {
    const task = await MaintenanceTask.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Maintenance task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
