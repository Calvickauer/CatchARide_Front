const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    title: {
        title: String
    },
    
    content: {
        type: String,
        required: true
    },

        replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
       journey: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Journey'
    }]
    
   
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
