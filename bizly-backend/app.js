#!/usr/bin/env node 

// This Module is the Entry poing for this Web application, contains 
//    - Routers
//    - Middlewares
//    - Connecting to Database


// ---Requiring Library Dependencies
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routers
const authRouter = require('./routes/auth');
const businessRouter = require('./routes/business');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expense');
const reportRouter = require('./routes/report');
const home = require('./routes/home');


// Initialize the Express app.
const app = express();

if (!config.has('jwtPrivateKey')) {
  console.error('Fatal Error, jwtPrivatekey is not defined');
  process.exit(1); 
}

// -----------------------CONNECTING MONGOOSE (DATABASE)------------------
// Connect to MongoDB Database using Mongoose
mongoose.connect('mongodb://localhost/bizly_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// -----------------------------MIDDLEWARES------------------
// MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

// middlewares routing
app.use('/api/auth', authRouter);
app.use('/api/business', businessRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expense', expenseRouter);
app.use('/api/report/', reportRouter);
app.use('/api/report', reportRouter);
app.use('/', home);




// ---------------SERVER LISTENING TO PORT ---------------------
// Server Listening onto PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
