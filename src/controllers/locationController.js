const Location = require('../models/location');

// Get all locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get location by ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (location) {
      res.status(200).json(location);
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new location
exports.createLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update location
exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (location) {
      await location.update(req.body);
      res.status(200).json(location);
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete location
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (location) {
      await location.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
