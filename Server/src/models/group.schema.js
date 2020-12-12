const mongoose = require('mongoose')

module.exports = mongoose.Schema({
    userList: [{type: String}],
    moderator: String,
    name: String
}, {collection: 'group'})