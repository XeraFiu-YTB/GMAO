const express = require('express');
const path = require('path');
const sequelize = require('./database');
const equipmentRoutes = require('./routes/equipmentRoutes');
const maintenanceTaskRoutes = require('./routes/maintenanceTaskRoutes');

const app = express();
const port = 3000;

app.use(express.json());

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'equipment.html'));
});

app.use('/equipment', equipmentRoutes);
app.use('/maintenance-tasks', maintenanceTaskRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
