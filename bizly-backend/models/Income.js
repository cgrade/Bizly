#!/usr/bin/env node 

// This module contains:
//    - the Model for Income
//    - Function to validate the Income object


// importing the required libraries
const mongoose = require('mongoose');
const Joi = require('joi');


// Creating a new Schema
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  amount: {
    type: Number,
    required: true,
    unique: true
  },
  date_created: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  source: {
    type: String,
    required: true,
  }

});


// Creating an Income Class from the Schema above
const Income = mongoose.model('Income', incomeSchema);


// Function to Validate the Income Object
function validateIncome(income) {
  const schema = {
    amount: Joi.number().required(),
    date_created: Joi.date(),
    source: Joi.string().required()

  };

  return Joi.validate(income, schema);
}


// Exporting Model
module.exports.Income = Income;
module.exports.validateIncome = validateIncome;
