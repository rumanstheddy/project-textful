const mongoose = require('mongoose');
const convModel = require('../models/conversation.model');

findConvBtwTwoUsers = (fromname, toname) => {
    return convModel.find({fromUser: fromname, toUser: toname})
}

findAllConvByUserName = (fromname) => {
    return convModel.find({$or: [{fromUser: fromname}, {toUser: fromname}]})
}

createConvBtwTwoUsers = (convInfo) => {
    return convModel.create(convInfo)
}

findConvById = (id) => {
    return convModel.find({_id: id})
}

updateMessageListInConversation = (convId, msgId) => {
    return convModel.updateOne({_id: convId}, {$push: {message: msgId}})
}

findAllConversations = () => {
    return convModel.find();
}

updateConversation = (conversationInfo) => {
    return convModel.update({_id: conversationInfo._id}, {$set:{message: conversationInfo.message, fromUser: conversationInfo.fromUser, toUser: conversationInfo.toUser, convoType: conversationInfo.convoType}})
}

deleteConversationById = (convId) => {return convModel.deleteOne({_id: convId})}

module.exports = {findConvBtwTwoUsers, findAllConvByUserName, createConvBtwTwoUsers, findConvById, updateMessageListInConversation, findAllConversations, updateConversation, deleteConversationById}
