const messageDao = require('../services/messageService');

module.exports = function(app) {
    app.get("/messages/:id", (req, res) => {
        messageDao.getMessageById(req.params.id)
        .then((message) => res.json(message))
        .catch(() => res.status(400).send("Failed to retreive the message"))
    })

    app.get("/messages", (res) => {
        messageDao.getAllMessages
        .then((messages) => res.json(messages))
        .catch(() => res.status(400).send("Failed to retrieve all messages"))})

    app.put("/message/:id", (req, res) => {
        const msgInfo = {
        _id: req.params.id,
        fromUser: req.body.fromUser,
        content: req.body.content,
        time: req.body.time
        }
        messageDao.editMessage(msgInfo._id, msgInfo)
        .then((message) => res.json(message))
        .catch(() => res.status(400).send("Failed to edit message"))
    })

    app.delete("/message/:id", (req, res) => {
        messageDao.deleteMessage(req.params.id)
               .then(() => conversationDao.findConvById(req.headers.conversationId))
               .then((conv) => {
                   let i = conv.message.indexOf(msgId)
                   conv.message.splice(i, 1)
                   conversationDao.updateConversation(conv)
                   .then(() => res.send("success"))
                   .catch(() => res.status(400).send("Failed to delete the message from conversation"))
               })
               .catch(() => res.status(400).send("Failed to delete the message"))
        })
}