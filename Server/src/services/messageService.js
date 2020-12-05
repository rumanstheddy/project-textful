const mongoose = require('mongoose');
const msgModel = require('../models/message.model');

createMessage = (messageInfo) => {
    return msgModel.create(messageInfo);
}

getMessageById = (id) => {return msgModel.findOne({_id: id})}

editMessage = (msgId, msgInfo) => {
    return msgModel.updateOne({_id: msgId}, {$set: {...msgInfo}})
}

deleteMessage = (id) => {return msgModel.deleteOne({_id: id})}

getMessageByConversationId = (convId) => msgModel.find({conversationId: convId})

module.exports = {getMessageById, editMessage, deleteMessage, createMessage, getMessageByConversationId}