const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
// User model
let Images = require('../models/images');
router.post('/new', upload.single('profileImg'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const img = new Images({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        profileImg: url + '/public/' + req.file.filename
    });
    img.save().then(result => {
        res.status(201).json({
            message: "User registered successfully!",
            imageCreated: {
                _id: result._id,
                profileImg: result.profileImg
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})
router.get("/", (req, res, next) => {
    Images.find().then(data => {
        res.status(200).json({
            message: "User list retrieved successfully!",
            images: data
        });
    });
});
module.exports = router;