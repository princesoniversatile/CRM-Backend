const express = require('express');
const categoryRoutes = require('./src/routes/categoryRoutes');
const offerRoutes = require('./src/routes/offerRoutes');
const productRoutes = require('./src/routes/productRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const complaintRoutes = require('./src/routes/complaintsRoutes');
const resolutionRoutes = require('./src/routes/resolutionRoutes'); // New import
const productModel = require('./src/models/productModel');
const offerController = require('./src/controllers/offerController');
const userController = require('./src/controllers/userController');
const categoryModel = require('./src/models/categoryModel');
const customerModel = require('./src/models/customerModel');
const complaintModel = require('./src/models/complaintsModels');
const resolutionModel = require('./src/models/resolutionModels');
const pool = require('./src/config/db');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to CRM Database API');
});

// Handle 404 for undefined routes

// Routes
app.use('/', authRoutes); // New route
app.use('/', categoryRoutes);
app.use('/', productRoutes);
app.use('/', customerRoutes);
app.use('/', offerRoutes);
app.use('/', complaintRoutes);
app.use('/', resolutionRoutes); // New route
app.use('/', userRoutes); // New route

// Initialize the database tables
const initializeTables = async () => {
  try {
    await categoryModel.createCategoryTable();
    await productModel.createProductTable();
    await offerController.createOfferTable();
    await customerModel.createCustomerTable();
    await complaintModel.createComplaintTable();
    await resolutionModel.createResolutionTable(); 
    await userController.createUserTable(); 
  } catch (err) {
    console.error('Error initializing tables:', err.message);
  }
};

app.use('*',(req, res) => {
  res.status(404).send('*');
});

const startServer = async () => {
  try {
    await pool.query('SELECT NOW()'); // Test query to check if connected
    console.log('Database connection successful');

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Database connection error: ', err.message);
    process.exit(1);
  }
};

// Start initialization and server
initializeTables().then(startServer);

