const mongoose = require('mongoose');
const { Schema } = mongoose;
const Vehicle = require('./vehicle');
const Message = require('./message');
const Reply = require('./reply');
const Journey = require('./journey');


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
        default: true
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
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;