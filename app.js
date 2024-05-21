const express = require('express');
const categoryRoutes = require('./src/routes/categoryRoutes');
const categoryModel = require('./src/models/categoryModel');
const pool = require('./src/config/db');
const cors=require('cors')
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/', categoryRoutes);

// Initialize the database table
(async () => {
  await categoryModel.createCategoryTable();
})();

(async () => {
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
})();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });