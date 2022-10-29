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
        type: String
    },
    passengerUids: {
        type: Array
    }
})

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;