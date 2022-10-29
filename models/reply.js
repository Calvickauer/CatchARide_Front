const mongoose = require('mongoose');
const { Schema } = mongoose;

const replySchema = new Schema({
    content: {
        type: String,
    },
   
})

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;


