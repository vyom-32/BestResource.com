const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true,
    },

    resource_id : {
        type : String,
        required : true,
    },

    reply_to : {
        type : String,
        required : true,
    },

    is_primary : {
        type : String,
        required : true,
    },

    comment : {
        type : String,
        required : true
    },
});

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;