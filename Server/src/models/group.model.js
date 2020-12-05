const mongoose = require('mongoose');
const groupSchema = require('./group.schema');

module.exports = mongoose.model('GroupModel', groupSchema);