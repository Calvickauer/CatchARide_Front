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
const Message = require('../models/message');

router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
     Message.findById(req.body.id)
     .then(msg => {
        console.log(msg)
        Reply.create({
            content: req.body.content
        })
        .then(reply => {
            msg.replies.push(reply);
            msg.save()
            res.redirect(`/messages`);
        })
        .catch(err => {
            console.log(err);
        })
     })
})

module.exports = router;