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
const User = require('../models/user');


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

    router.get('/id/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
        Message.findById(req.params.id).populate('replies').exec()
        .then(msg => {
            res.json({ message: msg });
        })
        .catch(error => { 
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
    });

    router.get('/journey/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
        Message.findOne({journeyId: req.params.id}).populate('replies').exec()
        .then(msg => {
            res.json({ message: msg });
        })
        .catch(error => { 
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
    });


    router.get('/user/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
        Message.findOne({userId: req.params.id}).populate('replies').exec()
        .then(msg => {
            res.json({ message: msg });
        })
        .catch(error => { 
            console.log('error', error);
            res.json({ message: "Error ocurred, please try again" });
        });
    });




router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    console.log('body', req.body);
    console.log('user', req.user);
    User.findById(req.user._id)
    .then(user => {
        Message.create({
            title: req.body.title,
            content: req.body.content
    }).then(message => {
        user.messages.push(message);
        res.redirect(`/messages`);
        user.save();
    })

    }).catch(err => {
        console.log(err);
    }); 
});


router.put('/edit/:id', (req, res) => {
    console.log('route is being on PUT')
    Message.findById(req.params.id)
    .then(foundMsg => {
        console.log('Message found', foundMsg);
        Message.findByIdAndUpdate(req.params.id, { 
                title: req.body.title ? req.body.title : foundMsg.title,
                content: req.body.content ? req.body.content : foundMsg.content,
        }, { 
            upsert: true 
        })
        .then(post => {
            console.log('Post was updated', post);
            res.redirect(`/messages`);
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