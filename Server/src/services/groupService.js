const mongoose = require('mongoose');
const groupModel = require('../models/group.model');

getGroupById = (id) => {return groupModel.findOne({_id: id})}

createGroup = (groupInfo) => {return groupModel.create(groupInfo)}

updateGroup = (groupInfo) => {return groupModel.update({_id: groupInfo._id}, {$set: {...groupInfo}})}

module.exports = {getGroupById, createGroup, updateGroup}