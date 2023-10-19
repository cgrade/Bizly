const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//Routes
const auth = require('./routes/auth')
const businessRouter = require('./routes/business')


// Initialize the Express app.
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('Fatal Error, jwtPrivatekey is not defined');
  process.exit(1); 
}

// Connect to MongoDB Database using Mongoose
mongoose.connect('mongodb://localhost/bizly_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

// ROUTES
// authRoutes
app.use('/api/auth', auth);
app.use('/api/business', businessRouter)

// Server Listening onto PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
