const mongoose = require('mongoose');
const message = require('./message.model')

const conversation = mongoose.Schema({
    message: [{type: mongoose.Types.ObjectId, ref: 'MessageModel'}],
    convoType: {
        type: String,
        enum: ["Group", "Individual"],
        default: "Individual"
    },
    privateChatId: {
        type: String,
        required: function() {
            return this.convoType === "Individual"
        }
    },
    groupId: {
        type: String,
        required: function() {
            return this.convoType === "Group"
        }
    }
}, {collection: 'conversation'})

module.exports = conversation