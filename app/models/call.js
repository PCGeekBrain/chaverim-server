var mongoose = require("mongoose")
var Schema = mongoose.Schema;

// Call Schema
var CallSchema = new Schema({
    title: String,
    details: String,
    taken: {type: Boolean, default: false},
    canceled: {type: Boolean, default: false},
    finished: {type: Boolean, index: true, default: false},
    caller: {
        location: String,
        name: {type: String, default: ""},
        number: String,
    },
    responderId: {type: String, default: ""},
    responder: {
        name: String,
        number: String,
    },
    backupId: {type: String, default: ""},
    backup: {
        name: String,
        number: String,
    },
    createdAt: { type : Date, default: Date.now },
});


module.exports = mongoose.model('Call', CallSchema);