#!/usr/bin/env node

// This module contains the API Routes for the Income model

// Importing required dependencies
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Income, validateIncome } = require('../models/Income');
const _ = require('lodash');
const { Business } = require('../models/Business');

//POST Request for recording an income.
router.post('/:businessId/record/', async (req, res) => {

    const { error } = validateIncome(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business doesn\'t exist');

    const income = new Income({
        businessId:  req.params.businessId,
        amount: req.body.amount,
        source: req.body.source
        });

    income.save();
    business.income.push(income);
    business.save()

    res.send(income);
});


// GET request for listing all income.
router.get('/:businessId/incomes', async (req, res) => {
    try {
        const business = await Business.findById(req.params.businessId);
        const incomes = business.income;
        if (!incomes) return response.status(400).send('No income Found');
        res.send(incomes);
    }
    catch (err) {
        res.status(404).send('Bad REquest');
    }
});


// GET Requests (a Specific Income)
router.get('/:businessId/:incomeId/income', async (req, res) => {
    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business Not found')
    const income = business.income.find(element => element == req.params.incomeId);
    if (!income) return res.status(400).send('No income Found');
    res.send(income);
});

// Put request (Update a income)
router.put('/:businessId/:incomeId/update', async (req, res) => {
    const {error} = validateIncome(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business Not found')
    let income = business.income.find(element => element == req.params.incomeId);
    if (!income) return res.status(400).send('No Income Found');

    income = await Income.findByIdAndUpdate(income._id, {
        amount: req.body.amount,
        source: req.body.source
    }, {new: true});

    business.save();
    res.send(income)
    
});


// Delete Requesst (Removes a Income)
router.delete('/:businessId/:incomeId/delete', async (req, res) => {

    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business Not Found');
    const income = business.income.find(element => element == req.params.incomeId);
    const del = await Income.findByIdAndRemove(income);
    if (!income || !del) return res.status(400).send('No income Found');
    business.income.pop(income);
    business.save();
    res.send(del);
});

module.exports = router;
