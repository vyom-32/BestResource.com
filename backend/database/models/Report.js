const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    user_id : {
        type : String,
        required : true,
    },

    resource_id : {
        type : String,
        required : true,
    },

    reason : {
        type : String,
        required : true,
    },
});

const Report = mongoose.model('Report',ReportSchema);

module.exports = Report;