#!/usr/bin/env node

// This module contains the API Routes for the Expense model

// Importing required dependencies
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const { Expense, validateExpense } = require('../models/Expense');
const _ = require('lodash');
const { Business } = require('../models/Business');

//POST Request for recording an expense.
router.post('/:businessId/record', async (req, res) => {

    const { error } = validateExpense(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business doesn\'t exist');

    const expense = new Expense({
        businessId:  req.params.businessId,
        amount: req.body.amount,
        typeOfExpense: req.body.typeOfExpense
        });

    expense.save();
    business.expenses.push(expense);
    business.save();
    res.send(expense);

});


// GET request for listing all expense for a particular business.
router.get('/:businessId/expenses', async (req, res) => {
    try {
        const business = await Business.findById(req.params.businessId);
        const expenses = business.expenses;
        if (!expenses) return response.status(400).send('No expense Found');
        res.send(expenses);
    }
    catch (err) {
        res.status(404).send('Bad REquest');
    }
});


// GET Requests (a Specific expense)
router.get('/:businessId/:expenseId/expense', async (req, res) => {
    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business Not found')
    const expense = business.expenses.find(element => element._id == req.params.expenseId);
    if (!expense) return res.status(400).send('No expense Found');
    res.send(expense);
});

// Put request (Update a expense)
router.put('/:businessId/:expenseId/update', async (req, res) => {
    const { error } = validateExpense(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business Not found')
    let expense = business.expenses.find(element => element._id == req.params.expenseId);
    if (!expense) return res.status(400).send('No Expense Found');

    expense =  await Expense.findByIdAndUpdate(expense._id, {
        amount: req.body.amount,
        typeOfExpense: req.body.typeOfExpense
    }, {new: true});

    business.save();
    res.send(expense);
});


// Delete Requesst (Removes an expense)
router.delete('/:businessId/:expenseId/delete', async (req, res) => {
    const business = await Business.findById(req.params.businessId);
    if (!business) return res.send('Business Not Found');
    const expense = business.expenses.find(element => element == req.params.expenseId);
    const del = await Expense.findByIdAndRemove(expense);
    if (!expense || !del) return res.status(400).send('No expense Found');
    business.expenses.pop(expense);
    business.save();
    res.send(del);
});

module.exports = router;
