const mongoose = require('mongoose');

const RattingSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true,
    },

    resource_id : {
        type : String,
        required : true,
    },

    ratting : {
        type : Number,
        required : true,
    },
});

const Ratting = mongoose.model('Ratting',RattingSchema);

module.exports = Ratting;