const privateChatDao = require("../daos/privateChatDao")

module.exports = function(app, socket) {
    app.get("/conversations/individual/:id", (req, res) => {
        privateChatDao.getPrivateChatById(req.params.id)
        .then(privateChatInfo => res.json(privateChatInfo))
        .catch(() => res.status(404).send("Failed"))
    })

    app.post("/conversations/individual", (req, res) => {
        const privateChatObj = {
            fromUser: req.body.fromUser,
            toUser: req.body.toUser
        }
        privateChatDao.createPrivateChat(privateChatObj)
        .then(privateChatInfo => res.json(privateChatInfo))
        .catch(() => res.status(404).send("Failed"))
    })

    app.put("/conversations/individual/:id", (req, res) => {
        const privateChatObj = {
            _id: req.params.id,
            fromUser: req.body.fromUser,
            toUser: req.body.toUser
        }
        privateChatDao.updatePrivateChat(privateChatObj)
        .then(privateChatInfo => res.json(privateChatInfo))
        .catch(() => res.status(404).send("Failed"))
    })
}