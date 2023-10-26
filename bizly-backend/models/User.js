#!/usr/bin/env node

// This Module contains:
//      - the Model of the User.
//      - Validate function to validate the User object


// Requireing Library dependcies
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');


// Creating the User Schema for the User model
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },

});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id }, config.get('jwtPrivateKey'));
  return token
}

// Creating a User Model from the Schema above
const User = mongoose.model('user', userSchema);
 

// Function to validate User object
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(250).required(),
    password: Joi.string().min(5).max(250).required(),
  };

  return Joi.validate(user, schema);
}

// Exporting Model
exports.validate = validateUser;
exports.User = User;
