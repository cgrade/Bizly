#!/usr/bin/env node

/*
    This Module defines the User authentication for the Bizly 
    Web application (Backend)
*/

// Importing and defining dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { User, validate }  = require('../models/User');
const Joi = require('joi');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');


// User registration route
router.post('/register', async (request, response) => {
  const { error } = validate(request.body);
  if (error) return response.status(400).send(error.details[0].message);
 
  let user = await User.findOne({ email: request.body.email });
  if (user) return response.status(400).send('User already registered');

  user = new User (_.pick(request.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
 
  await user.save();
  const token = user.generateAuthToken();
  response.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  
});


// User Login
router.post('/login', async (request, response) => {
  const { error } = validateU(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: request.body.email });
  if (!user) return response.status(400).send('Invalid Email or password');
  
  const validPassword  = await bcrypt.compare(request.body.password, user.password);
  if (!validPassword) return response.status(400).send('Invalid Email or password');

  const token = user.generateAuthToken();
  response.send(token);

});







function validateU(user) {
  const schema = {
    email: Joi.string().min(5).max(250).required(),
    password: Joi.string().min(5).max(250).required(),
  };

  return Joi.validate(user, schema);
}

// Export the router
module.exports = router;