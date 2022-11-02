// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Journey = require('../models/journey');

// Controllers


// GET route display all journeys (this may need to go on user controller for '/profile' route)
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Journey.find({driverUid: req.user.id})
        .then(journeys => {
            console.log('All journeys', journeys);
            res.json({journeys: journeys});
        })
        .catch(error => {
            console.log(error)
        });
});

// POST route add new journey
router.post('/new', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Create one example by adding body to DB, and return
    console.log('=====> Inside POST /journey');
    // console.log('=====> req.body', req.body); // object used for creating new example

    Journey.create({
        origin: req.body.origin,
        destination: req.body.destination,
        contribution: req.body.contribution,
        openSeats: req.body.openSeats,
        driverUid: req.user._id,
        passengerUids: []
    })
    .then(newJourney => {
        console.log('New journey created', newJourney);
        // res.send(newJourney._id);
        res.redirect(`/journeys/${newJourney._id}`)
    })
    .catch(err => {
        console.log('Error in example#create:', err);
        res.json({ message: 'Error occured... Please try again.'});
    })
});

// // POST route add passengers to journey
// router.post('/:id/passengers/add', passport.authenticate('jwt', { session: false }), (req, res) => {
//     Journey.findById(req.params.id)
//      .then(journey => {
//         console.log(journey);
//         journey.passengerUids.push(___); // unsure how to reference passender UID from message
//         journey.save();
//         res.redirect(`/journeys/${journey.id}`);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });


// GET route display one journey
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('testing GET id route');
    Journey.findById(req.params.id)
    .then(journey => {
        console.log(journey);
        res.json({journey: journey});
    })
    .catch(error => {
        console.log(error)
    });
});

// GET route edit one journey
router.get('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log('testing GET id route');
    Journey.findById(req.params.id)
    .then(journey => {
        console.log(journey);
        res.json({journey: journey});
    })
    .catch(error => {
        console.log(error)
    });
});

// PUT route edit one journey
router.put('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Journey.findById(req.params.id)
        .then(foundJourney => {
            console.log('journey found', foundJourney);
            Journey.findByIdAndUpdate(req.params.id,
                {
                    origin: req.body.origin ? req.body.origin : foundJourney.origin,
                    destination: req.body.destination ? req.body.destination : foundJourney.destination,
                    contribution: req.body.contribution ? req.body.contribution : foundJourney.contribution,
                    openSeats: req.body.openSeats ? req.body.openSeats : foundJourney.openSeats
                })
                .then(journey => {
                    console.log('Journey was updated', journey);
                    res.redirect(`/journeys/${req.params.id}`)
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

// DELETE route remove one journey (do we need to make it so that you cannot remove past journeys?)
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Journey.findByIdAndRemove(req.params.id)
    .then(journey => {
        console.log(journey._id, 'has been deleted');
        res.redirect('/users/profile'); 
    })
    .catch(error => {
        console.log(error)
    });
});

// DELETE route to remove one passenger
router.delete('/passengers/remove', passport.authenticate('jwt', { session: false }), (req, res) => {

});

// DELETE route for passenger to remove themselves

// Exports
module.exports = router;