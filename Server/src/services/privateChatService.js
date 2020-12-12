const mongoose = require('mongoose');
const privateChatModel = require('../models/privateChat.model');

getPrivateChatById = (id) => {return privateChatModel.findOne({_id: id})}

createPrivateChat = (privateChatInfo) => {return privateChatModel.create(privateChatInfo)}

updatePrivateChat = (privateChatInfo) => {return privateChatModel.update({_id: privateChatInfo._id}, {$set: {...privateChatInfo}})}

module.exports = {getPrivateChatById, createPrivateChat, updatePrivateChat}
