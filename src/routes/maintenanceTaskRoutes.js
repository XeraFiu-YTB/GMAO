const express = require('express');
const router = express.Router();
const maintenanceTaskController = require('../controllers/maintenanceTaskController');

// Routes for maintenance tasks
router.get('/', maintenanceTaskController.getAllMaintenanceTasks);
router.get('/:id', maintenanceTaskController.getMaintenanceTaskById);
router.post('/', maintenanceTaskController.createMaintenanceTask);
router.put('/:id', maintenanceTaskController.updateMaintenanceTask);
router.delete('/:id', maintenanceTaskController.deleteMaintenanceTask);

module.exports = router;
