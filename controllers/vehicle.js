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
const User = require('../models/user');

// Controllers
router.get('/test', (req, res) => {
    res.json({ message: 'Vehicle endpoint OK! ✅' });
});

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    //console.log('===> Inside of /vehicle');
    //console.log('===> /register -> req.body',req.body);
    User.findById(req.body.id)
    .then(theUser => {
        console.log(theUser);
        Vehicle.create({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            seats: req.body.seats
        }) 
        .then(theVehicle => {
            theUser.vehicle.push(theVehicle);
            theUser.save();
            res.redirect(`/vehicles/${theVehicle.id}`);
        })  
    })
    .catch(err => {
        console.log('Could not find user', err);
    })
    
});

router.get('/vehicle', (req, res) => {
    Vehicle.findById(req.body.id)
    .then(vehicle => {
        console.log(vehicle);
        res.json({vehicle: vehicle});
    })
    .catch(error => {
        console.log(error)
    });
});



router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => {
            console.log('journey found', vehicle);
            Vehicle.findByIdAndUpdate(req.params.id,
                {
                    make: req.body.make ? req.body.make : vehicle.make,
                    model: req.body.model ? req.body.model : vehicle.model,
                    year: req.body.year ? req.body.year : vehicle.year,
                    seats: req.body.seats ? req.body.seats : vehicle.seats
                })
                .then(vehicle => {
                    console.log('vehicle was updated', vehicle);
                    res.redirect(`/vehicles/${req.params.id}`)
                })
                .catch(error => {
                    console.log('error', error)
                    res.json({ message: "Error ocurred, please try again" })
                })
        })
        .catch(error => {
            console.log('error', error)
            res.json({ message: "Error ocurred, please try again" })
        })
});



module.exports = router;