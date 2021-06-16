const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true,
    },

    topic : {
        type : String,
        required : true,
    },

    status : {
        type : String,
        required : true,
    },

    link : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },
});

const Resource = mongoose.model('Resource',ResourceSchema);

module.exports = Resource;