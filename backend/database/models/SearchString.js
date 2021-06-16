const mongoose = require('mongoose');

const SearchStringSchema = new mongoose.Schema({
    searchString : {
        type : String,
        required : true,
    },

    total : {
        type : Number,
        required : true,
    },
});

const SearchString = mongoose.model('SearchString',SearchStringSchema);

module.exports = SearchString;