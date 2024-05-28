const express = require('express')
const categoryRoutes = require('./src/routes/categoryRoutes')
const offerRoutes = require('./src/routes/offerRoutes')
const productRoutes = require('./src/routes/productRoutes')
const customerRoutes = require('./src/routes/customerRoutes')
const productModel = require('./src/models/productModel')
const offerController = require('./src/controllers/offerController')
const categoryModel = require('./src/models/categoryModel')
const customerModel = require('./src/models/customerModel')
const pool = require('./src/config/db')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(express.json())
app.use(cors())

// Routes
app.use('/', categoryRoutes)
app.use('/', productRoutes)
app.use('/', customerRoutes)
app.use('/', offerRoutes)

// Initialize the database table
;(async () => {
  await categoryModel.createCategoryTable()
})()
;(async () => {
  await productModel.createProductTable()
})()
;(async () => {
  await offerController.createOfferTable()
})()

// Create customer table if not exists
;(async () => {
  try {
    await customerModel.createCustomerTable()
  } catch (err) {
    console.error('Error creating customer table:', err.message)
  }
})()

;(async () => {
  try {
    await pool.query('SELECT NOW()') // Test query to check if connected
    console.log('Database connection successful')

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Database connection error: ', err.message)
    process.exit(1)
  }
})()
