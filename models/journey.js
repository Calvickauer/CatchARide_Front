const mongoose = require('mongoose');
const { Schema } = mongoose;

const journeySchema = new Schema({
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    contribution: {
        type: Number,
        required: true
    },
    openSeats: {
        type: Number,
        required: true
    },
    driverUid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    passengerUids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], 
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;