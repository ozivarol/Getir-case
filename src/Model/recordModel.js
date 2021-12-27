const Mongoose = require("mongoose");

//creates a record schema.

const recordSchema = Mongoose.Schema({
    key: String,
    value: String,
    createdAt: Date,
    counts: [Number],

})

//The schema is exported.

module.exports = Mongoose.model('record', recordSchema);