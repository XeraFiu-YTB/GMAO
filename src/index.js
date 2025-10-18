const express = require('express');
const path = require('path');
const sequelize = require('./database');

// Routes
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const maintenanceTaskRoutes = require('./routes/maintenanceTaskRoutes');
const locationRoutes = require('./routes/locationRoutes');

// Middleware
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

app.use(express.json());

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

// Public routes
app.get('/', (req, res) => res.redirect('/login.html'));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/register.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));

// Auth routes
app.use('/auth', authRoutes);

// Protected routes
app.use('/equipment', authMiddleware, equipmentRoutes);
app.use('/maintenance-tasks', authMiddleware, maintenanceTaskRoutes);
app.use('/locations', authMiddleware, locationRoutes);

// Protected HTML pages
app.get('/equipment.html', authMiddleware, (req, res) => res.sendFile(path.join(__dirname, 'views', 'equipment.html')));
app.get('/maintenance.html', authMiddleware, (req, res) => res.sendFile(path.join(__dirname, 'views', 'maintenance.html')));


sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
