const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    text: String,
    fromUser: String,
    time: Date
}, {collection: 'message'})