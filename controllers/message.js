// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Message = require('../models/message');
const Reply = require('../models/reply');


    router.get('/', (req, res) => {
        Message.find({}).populate('replies').exec()
        .then(msg => {
            res.json({ message: msg });
        })
        .catch(error => { 
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
    });




router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const newMsg = new Message({
        title: req.body.title,
        content: req.body.content,
        journeyId: req.body.email,
        userId: req.body.dateOfBirth
    });
    newMsg.save().then(createdMsg => {
        
        res.json({ message: createdMsg});
    }).catch(err => {
        console.log(err);
    });
    res.redirect(`/`);

    
});



module.exports = router;