#!/usr/bin/env node

// This module contains the Business 
//    - Model (Class)
//    - Schema
//    - Function to Validate the Business object


// importing necessary libraries 
const mongoose = require('mongoose');
const Joi = require('joi');


// Creating the Business Schema
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  description: {
    type: String,
  },
  typeOfBusiness: {
    type: String,
    required: true,
    minlength: 10
  },
  incomePercentage: {
    type: Number,
    default: 25,
  
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

  },
  expenses: {
    type: Array,
  },
  income: {
    type: Array,
  },
  date_created: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
}

});

// Initializing the Business Class
const Business = mongoose.model('Business', businessSchema);


// Function to Validate the Business object
function validateBusiness(business) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      typeOfBusiness: Joi.string().min(10).max(250).required(),
      incomePercentage: Joi.number().default(20),
      description: Joi.string().min(10),
      date_created: Joi.date(),
  
    };
  
    return Joi.validate(business, schema);
  }
  
  // Exporting Model
module.exports.validateBusiness = validateBusiness;
module.exports.Business = Business;
