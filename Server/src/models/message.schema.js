const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    text: String,
    fromUser: String,
    time: Date,
    conversationId: {type: mongoose.Types.ObjectId, ref: "conversationModel"}
}, {collection: 'message'})