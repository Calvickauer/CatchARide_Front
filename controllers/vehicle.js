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
    });
    newVehicle.save()
    .then(createdVehicle => res.json({ vehicle: createdVehicle}))
        .catch(err => {
            console.log('error with creating new user', err);
            res.json({ message: 'Error occured... Please try again.'});
    });
    
});


module.exports = router;