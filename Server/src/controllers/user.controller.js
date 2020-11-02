const userDao = require('../services/userService');

module.exports = function(app) {
    app.get("/login", (req, res) => {
        userDao.findUserByCredentials(req.headers.username, req.headers.password)
        .then((user) => res.json(user))
        .catch(() => res.status(400).send("Failed to login"))
    })

    app.get("/users", (req, res) => {
        userDao.findAllUsers()
        .then((users) => res.json(users))
        .catch(() => res.status(400).send("Failed"))
    })

    app.post("/users", (req, res) => {
		console.log("hey there");
        const userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
        };
    
        if (typeof req.body["password"] !== 'undefined')
            userInfo["password"] = req.body.password
    
        if (typeof req.body["userType"] !== 'undefined')
            userInfo["userType"] = req.body.userType
    
        userDao.findUserByUserName(userInfo.userName)
        .then(user => {
			console.log("userdb log");
            if (user !== null) {
                console.log(user)
                res.status(400).send("Failed to create user")
            }
            else {
                userDao.createUser(userInfo)
                .then((user) => res.json(user))
                .catch(() => res.status(400).send("Failed"))
            }
                
        })
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/users/:userName", (req, res) => {
        userDao.findUserByUserName(req.params.userName)
        .then((user) => res.json(user))
        .catch(() => res.status(400).send("Failed"))
    })

    app.put("/users/:userName", (req, res) => {
        userDao.updateUserDetails(req.params.userName, req.body)
        .then(user => res.json(user))
        .catch(() => res.status(400).send("Failed to update"))
    })

    app.get("/search/:keyword", (req, res) => {
        userDao.getUserByKeyword(req.params.keyword.toLocaleLowerCase())
        .then(users => {
            const userNames = users.map(user => user.userName)
            res.json(userNames)
        })
        .catch(() => res.status(400).send("Failed to find users"))
    })

    app.delete("/users/:id", (req, res) => {
        userDao.deleteUserById(req.params.id)
        .then(() => res.send("Success"))
        .catch(() => res.status(400).send("Failed to delete user"))
    })
}