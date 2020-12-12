const groupDao = require("../services/groupService")

module.exports = function(app, socket) {
    app.get("/conversations/group/:id", (req, res) => {
        groupDao.getGroupById(req.params.id)
        .then(groupInfo => res.json(groupInfo))
        .catch(() => res.status(404).send("Failed"))
    })

    app.post("/conversations/group/", (req, res) => {
        const groupObj = {
            moderator: req.body.moderator,
            userList: req.body.userList,
            name: req.body.name
        }
        groupDao.createGroup(groupObj)
        .then(groupInfo => res.json(groupInfo))
        .catch(() => res.status(404).send("Failed"))
    })

    app.put("/conversations/group/:id", (req, res) => {
        const groupObj = {
            _id: req.params.id,
            moderator: req.body.moderator,
            userList: req.body.userList,
            name: req.body.name
        }
        groupDao.updateGroup(groupObj)
        .then(groupInfo => res.json(groupInfo))
        .catch(() => res.status(404).send("Failed"))
    })
}