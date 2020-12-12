const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    fromUser: String,
    toUser: String
}, {collection: 'private'})