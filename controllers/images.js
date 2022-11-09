const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const DIR = './public/';
const Images = require('../models/images');
const passport = require('passport');
const User = require('../models/user');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(' ').join('-');
//         cb(null, uuidv4() + '-' + fileName)
//     }
// });
// var upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//         }
//     }
// });
// routes
router.get("/", (req, res, next) => {
    Images.find({}).then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            images: data
        });
    });
});

router.post('/new', upload.single('file'), passport.authenticate('jwt', { session: false }), async (req, res) => {
    Images.create({
        profileImg: new Buffer(req.body.file.split(',')[1], 'base64')
    })
    .then(res => {
        console.log (res)
        User.findById(req.user.id)
        .then(userFound => {
            userFound.photos.push(res);
            userFound.save();
        })
       
        console.log('Created Image', res)
    }).catch(err => {
        console.log(err);
    })
    console.log('request from front end', req.body);
})


router.get('/show/:id',  async (req, res) => {
    Images.findById(req.params.id)
    .then(img => {
        res.send({ image: img.profileImg });
    })
    .catch(error => { 
        console.log('error', error);
        res.json({ message: "Error ocurred, please try again" });
    });
});

module.exports = router;