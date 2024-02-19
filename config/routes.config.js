const router = require('express').Router();
const usersController = require("../controllers/users.controller")


router.post('/register', usersController.create);

module.exports = router;