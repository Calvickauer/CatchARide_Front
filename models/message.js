const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    title: {
        title: String
    },
    journeyId: {
        journeyId: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },

        replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
   
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;