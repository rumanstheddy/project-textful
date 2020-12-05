const mongoose = require('mongoose')

module.exports = new Schema({
    text: String,
    fromUser: String,
    time: Date
}, {collection: 'message'})