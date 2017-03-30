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
        name: {type: String, default: ""},
        number: String,
    },
    backup: { type: [String], default: [] },
    createdAt: { type : Date, default: Date.now },
    dispatcher: {
        name: {type: String, default: "N/A"},
        email: String,
        number: String,
    },
    canceled_by: {
        name: {type: String, default: ""},
        email: String,
        number: String
    }
});


module.exports = mongoose.model('Call', CallSchema);