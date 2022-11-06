const mongoose = require('mongoose');
const { Schema } = mongoose;
const Vehicle = require('./vehicle');
const Message = require('./message');
const Reply = require('./reply');
const Journey = require('./journey');
const Reviews = require('./reviews');


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    date: {
        type: Date,
        default: Date.now()
    },
    birthdate: {
        type: String,
        required: true
    },
    driver: {
        type: Boolean,
        default: false
    },
    vehicle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    journey: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;