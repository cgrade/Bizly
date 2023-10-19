const mongoose = require('mongoose');
const Joi = require('joi');

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
    required: true
  },
  expenses: [String],

});
const Business = mongoose.model('Business', businessSchema);



function validateBusiness(business) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      typeOfBusiness: Joi.string().min(10).max(250).required(),
      incomePercentage: Joi.number().default(20),
      description: Joi.string().min(10),
      owner: Joi.string(),
  
    };
  
    return Joi.validate(business, schema);
  }
  
  // Exporting Model
  exports.validateBusiness = validateBusiness;
  exports.Business = Business;
  