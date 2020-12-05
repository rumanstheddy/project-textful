const mongoose = require('mongoose');
const privateSchema = require('./privateChat.schema');

module.exports = mongoose.model('PrivateChatModel', privateSchema);