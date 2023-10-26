#!/usr/bin/env node

// This Module contains:
//      - the Model of the Expenses.
//      - Validate function to validate the Expense object

// Import required dependcies
const mongoose = require('mongoose');
const Joi = require('joi');


// Creating the Expense Schema
const Schema = mongoose.Schema;

const expensesSchema = new Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business'
    },
    amount: {
        type: Number,
        required: true
    },
    typeOfExpense: {
        type: String,
        required: true
    },
    date_created: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    }
});

// Initializing a new Expense Class
const Expense = new mongoose.model('Expense', expensesSchema);

// A function to validate the Expense Object.
function validateExpense(expense) {
    const schema = {
      amount: Joi.number().required(),
      date_created: Joi.date(),
      typeOfExpense: Joi.string().required()
  
    };
  
    return Joi.validate(expense, schema);
  }
  
  
  // Exporting Model
module.exports.Expense = Expense;
module.exports.validateExpense = validateExpense;
  
