const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImagesSchema = new Schema({
    profileImg: Buffer,
    mimetype: String
    
});

const Images = mongoose.model('Images', ImagesSchema);

module.exports = Images;