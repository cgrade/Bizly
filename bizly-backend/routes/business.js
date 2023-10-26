#!/usr/bin/env node

// this modules contains
// the business route for the api


const express = require('express');
const router = express.Router();
const { Business, validateBusiness } = require('../models/Business');
const _ = require('lodash');

// POST REQUEST to create a new business
router.post('/create',  async (req, res) => {
    const { error } = validateBusiness(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let business = await Business.findOne({ name: req.body.name });
    if (business) return res.status(400).send('User already registered');

    business = new Business({
        name: req.body.name,
        description: req.body.description,
        typeOfBusiness: req.body.typeOfBusiness
    });
    await business.save();
    res.send(business);
});

// GET Request to get all the business
router.get('/businesses',  async (req, res) => {
    const businesses = await Business.find();
    if (!businesses) return response.status(400).send('No Business Found');
    res.send(businesses);
});

// Get Requests (A particular Business)
router.get('/:businessId',  async (req, res) => {
    try {
        const business = await Business.findById(req.params.businessId);
        if (!business) return response.status(400).send('No Business Found');
        res.send(business);
    }
    catch (err) {
        res.status(404).send('Bad REquest');
    }
});


// Put request (Update a business)
router.put('/:businessId/update',  async (req, res) => {
    const { error } = validateBusiness(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const business = await Business.findByIdAndUpdate(req.params.businessId, {
        name: req.body.name,
        typeOfBusiness: req.body.typeOfBusiness,
        incomePercentage: req.body.incomePercentage,
        description: req.body.description
    }, {new: true});
    if (!business) return response.status(400).send('No Business Found');
    res.send(business);
});


// Delete Requesst (Removes a Business)
router.delete('/:businessId/delete',  async (req, res) => {
    try {
        const business = await Business.findByIdAndDelete(req.params.businessId);
        if (!business) return response.status(400).send('No Business Found');
        res.send(business);
    }
    catch (err) {
        res.status(404).send('Bad REquest');
    }
});

module.exports = router;
