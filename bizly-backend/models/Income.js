const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    unique: true
  },
  date: Date.now(),
  

});


// Creating a User Model from the Schema above
const User = mongoose.model('user', userSchema);


// Exporting Model
exports = User;