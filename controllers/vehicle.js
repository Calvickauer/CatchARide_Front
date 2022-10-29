// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Vehicle = require('../models/vehicle');

// Controllers
router.get('/test', (req, res) => {
    res.json({ message: 'Vehicle endpoint OK! ✅' });
});

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('===> Inside of /vehicle');
    //console.log('===> /register -> req.body',req.body);
    Vehicle.create({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        seats: req.body.seats
    })
    .then(newVehicle => {
        console.log('New vehicle created', newVehicle);
        res.redirect(`/vehicles/${newVehicle.id}`);
    })
    .catch(err => {
        console.log('Error in example#create:', err);
        res.json({ message: 'Error occured... Please try again.'});
    })
    
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Vehicle.findById(req.params.id)
    .then(vehicle => {
        console.log(vehicle);
        res.json({vehicle: vehicle});
    })
    .catch(error => {
        console.log(error)
    });
});


module.exports = router;