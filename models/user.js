const mongoose = require('mongoose');
const { Schema } = mongoose;
const Vehicle = require('./vehicle');

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
    driver: {
        type: Boolean
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    vehicle: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;