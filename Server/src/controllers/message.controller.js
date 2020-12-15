const messageDao = require("../services/messageService")
const conversationDao = require("../services/conversationService")

module.exports = function(app, socket) {
    app.get("/messages/:id", (req, res) => {
        messageDao.getMessageById(req.params.id)
        .then((msg) => res.json(msg))
        .catch(() => res.status(400).send("Failed"))
    })

    app.put("/messages/:id", (req, res) => {
        const messageInfo = {
            _id: req.params.id,
            fromUser: req.body.fromUser,
            content: req.body.content,
            conversationId: req.body.conversationId,
            time: req.body.time
        }
        messageDao.editMessage(messageInfo._id, messageInfo)
        .then(() => res.send("Message updated successfully"))
        .catch(() => res.status(400).send("Failed to edit the message"))
    })

    app.delete("/messages/:id", (req, res) => {
        messageDao.deleteMessage(req.params.id)
        .then(() => conversationDao.findConvById(req.headers.conversationid))
        .then((conv) => {
            let i = conv.message.indexOf(req.params.id)
            conv.message.splice(i, 1)
            conversationDao.updateConversation(conv)
            .then(() => res.send("success"))
            .catch(() => res.status(400).send("Failed to delete the message from conversation"))
        })
        .catch(() => res.status(400).send("Failed to delete the message")) 
    })
}