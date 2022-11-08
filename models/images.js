const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImagesSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileImg: {
        type: String
    }
}, {
    collection: 'images'
})

const Images = mongoose.model('Images', ImagesSchema);

module.exports = Images;