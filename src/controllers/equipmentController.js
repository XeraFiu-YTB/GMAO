const Equipment = require('../models/equipment');

// Get all equipment
exports.getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findAll();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get equipment by ID
exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ error: 'Equipment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new equipment
exports.createEquipment = async (req, res) => {
  try {
    const newEquipment = await Equipment.create(req.body);
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update equipment
exports.updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      await equipment.update(req.body);
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ error: 'Equipment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete equipment
exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      await equipment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Equipment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
