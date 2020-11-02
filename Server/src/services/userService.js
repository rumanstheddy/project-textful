const mongoose = require('mongoose');
const userModel = require('../models/user.model');

findUserByUserName = (username) => {
    return userModel.findOne({userName: username});
}

createUser = (userInfo) => {
    return userModel.create(userInfo);
}

findAllUsers = () => {
    return userModel.find();
}

findUserByCredentials = (userName, password) => {
    return userModel.find({userName: userName, password: password});
}

getUserByKeyword = (keyword) => {
    return userModel.find({userName: {$regex: ".*" + keyword + ".*"}})
}

updateUserDetails = (userName, userInfo) => {
    return userModel.updateOne({userName: userName}, {$set: {...userInfo}})
}

deleteUserById = (id) => {return userModel.deleteOne({_id: id})}

module.exports = {
    findUserByUserName, createUser, findAllUsers, findUserByCredentials, getUserByKeyword, deleteUserById, updateUserDetails
}
