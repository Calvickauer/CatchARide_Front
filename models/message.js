const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
   
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;