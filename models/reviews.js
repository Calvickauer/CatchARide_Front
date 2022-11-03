const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewsSchema = new Schema({
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
       toUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    
   
})

const Reviews = mongoose.model('Reviews', reviewsSchema);

module.exports = Reviews;
