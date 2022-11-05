// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');



// DB Models
const Reviews = require('../models/reviews');
const User = require('../models/user');


router.get('/', (req, res) => {
    res.json({ message: 'Messages endpoint OK! ✅' });
});

// show all messages from all users, for test only

router.get('/test', (req, res) => {
    Reviews.find({}).populate('replies').exec()
        .then(msg => {
            res.json({ reviews: msg });
        })
        .catch(error => {
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
});



// return route from delete ===> for now

router.get('/return', (req, res) => {
    res.json({ deleted: 'Deleted' });
});




// get 1 message by it's Id coming as params

router.get('/show/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    Reviews.findById(req.params.id).populate('replies').populate('user').exec()
        .then(msg => {
            res.json({ message: msg });
        })
        .catch(error => {
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
});


// create a new message

router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log('body', req.body);
    console.log('user', req.user);
    User.findById(req.params.id)
        .then(user => {
            User.findById(req.user.id)
                .then(user2 => {
                    Reviews.create({
                        title: req.body.title,
                        content: req.body.content
                    })
                })
                .then(review => {
                    review.user.push(user2);
                    review.toUser.push(user);
                    user.review.push(message);
                    res.redirect(`/reviews/show/${review.id}`);
                    review.save();
                    user.save();
                })

        }).catch(err => {
            console.log(err);
        });
});

//edit one message find by id

router.put('/edit/:id', (req, res) => {
    console.log('route is being on PUT')
    Reviews.findById(req.params.id)
        .then(foundReview => {
            console.log('Message found', foundReview);
            Reviews.findByIdAndUpdate(req.params.id, {
                title: req.body.title ? req.body.title : foundMsg.title,
                content: req.body.content ? req.body.content : foundMsg.content,
            }, {
                upsert: true
            })
                .then(review => {
                    console.log('Post was updated', post);
                    res.redirect(`/reviews/show/${review.id}`);
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



router.delete('/delete/:id', (req, res) => {
    Reviews.findByIdAndRemove(req.params.id)
        .then(response => {
            res.redirect(`/return`);
        })
        .catch(err => {
            console.log('Error in vehicle delete:', err);
            res.json({ message: 'Error occured... Please try again.' });
        });
});

module.exports = router;

//