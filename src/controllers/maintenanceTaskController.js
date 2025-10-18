const MaintenanceTask = require('../models/maintenance_task');
const Equipment = require('../models/equipment');
const Location = require('../models/location');

// Get all maintenance tasks
exports.getAllMaintenanceTasks = async (req, res) => {
  try {
    const tasks = await MaintenanceTask.findAll({
      include: {
        model: Equipment,
        include: Location
      },
      order: [['id', 'ASC']]
    });
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
    const { EquipmentId, task_type, interval_hours } = req.body;
    if (task_type === 'usage-based') {
      const equipment = await Equipment.findByPk(EquipmentId);
      if (equipment) {
        req.body.next_due_hours = equipment.running_hours + interval_hours;
      }
    }
    const newTask = await MaintenanceTask.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update maintenance task (e.g., to mark as complete)
exports.updateMaintenanceTask = async (req, res) => {
  try {
    const task = await MaintenanceTask.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);

      // If a usage-based task is marked as complete, set the next due hours
      if (req.body.completed && task.task_type === 'usage-based') {
        const equipment = await Equipment.findByPk(task.EquipmentId);
        if (equipment) {
          task.next_due_hours = equipment.running_hours + task.interval_hours;
          task.completed = false; // Reset for the next cycle
          await task.save();
        }
      }

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
