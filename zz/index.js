// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('./routes/route.js');

// // Express app
// const app = express();

// // Body parsing middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB connection
// const mongoURI = 'YOUR_MONGODB_URI_HERE'; // Replace with your MongoDB URI
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Routes
// app.use('/api', routes); 

// // Server setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
