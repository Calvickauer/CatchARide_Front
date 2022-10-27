const mongoose = require('mongoose');
const { Schema } = mongoose;

const vehicleSchema = new Schema({
    make: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    }
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;