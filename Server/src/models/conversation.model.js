const mongoose = require('mongoose');
const convSchema = require('./conversation.schema');

module.exports = mongoose.model('conversationModel', convSchema);