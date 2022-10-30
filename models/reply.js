const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./user');

const replySchema = new Schema({
    content: {
        type: String,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
   
})

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;


