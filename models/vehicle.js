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
    seats: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: false
    }
})

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;