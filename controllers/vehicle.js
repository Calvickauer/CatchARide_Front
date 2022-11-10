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
router.get('/', (req, res) => {
    res.json({ message: 'Vehicle endpoint OK! ✅' });
});

router.get('/vehicle/:id', (req, res) => {
    Vehicle.findById(req.params.id)
    .then(vehicle => {
        console.log(vehicle);
        res.json({vehicle: vehicle});
    })
    .catch(error => {
        console.log(error)
    });
});

router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user.id)
    .then(theUser => {
        console.log(theUser);
        Vehicle.create({
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            seats: req.body.seats,
            url: req.body.url
        }) 
        .then(theVehicle => {
            theUser.vehicle.push(theVehicle);
            theUser.save();
            res.redirect(`/vehicles/show/${theVehicle.id}`);
        })  
    })
    .catch(err => {
        console.log('Could not find user', err);
    })
    
});

router.get('/show/:id', (req, res) => {
    Vehicle.findById(req.params.id)
    .then(vehicle => {
        console.log(vehicle);
        res.json({vehicle: vehicle});
    })
    .catch(error => {
        console.log(error)
    });
});



router.put('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Vehicle.findById(req.params.id)
        .then(vehicle => {
            console.log('vehicle found', vehicle);
            Vehicle.findByIdAndUpdate(req.params.id,
                {
                    make: req.body.make ? req.body.make : vehicle.make,
                    model: req.body.model ? req.body.model : vehicle.model,
                    year: req.body.year ? req.body.year : vehicle.year,
                    seats: req.body.seats ? req.body.seats : vehicle.seats
                })
                .then(vehicle => {
                    console.log('vehicle was updated', vehicle);
                    res.send('temp');
                    //res.redirect(`/vehicles/vehicle/${req.params.id}`)
                })
                .catch(error => {
                    console.log('error', error)
                    res.send('eror res send')
                })
        })
        .catch(error => {
            console.log('error', error)
            res.send('error')
        })
});

router.delete('/delete/:id', (req, res) => {
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside DELETE /vehicles/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding example by id
    
    Vehicle.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log(`Vehicle ${req.params.id} was deleted`, response);
        res.redirect(`/return`);
    })
    .catch(err => {
        console.log('Error in vehicle delete:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

router.delete('/:vId/remove', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.user.id)
    .then(user => {
        let array = user.vehicle;
        let target = array.indexOf(req.params.vId);
        if (target > -1) {
            array.splice(target, 1);
        };
        user.save();
        res.send(user);
    })
    .catch(error => {
        console.log('error', error)
        res.json({ message: "Error ocurred, passenger not deleted" })
    });
});


module.exports = router;