// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Reply = require('../models/reply');
const Reviews = require('../models/reviews');

router.post('/message/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
     Message.findById(req.body.id)
     .then(msg => {
        console.log(msg)
        Reply.create({
            content: req.body.content
        })
        .then(reply => {
            msg.replies.push(reply);
            msg.save()
            res.redirect(`/messages/show/${msg.id}`);
        })
        .catch(err => {
            console.log(err);
        })
     })
});


router.post('/review/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    Reviews.findById(req.body.id)
    .then(msg => {
       console.log(msg)
       Reply.create({
           content: req.body.content
       })
       .then(reply => {
           msg.replies.push(reply);
           msg.save()
           res.redirect(`/`);
       })
       .catch(err => {
           console.log(err);
       })
    })
});


module.exports = router;