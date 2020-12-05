const mongoose = require('mongoose');
const messageSchema = require('./message.schema');

module.exports = mongoose.model('MessageModel', messageSchema);