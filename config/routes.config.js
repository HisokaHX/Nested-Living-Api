const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller");
const housesController = require("../controllers/houses.controller");

router.post('/login', authController.login);

router.post('/register', usersController.create);

//House
router.post('/houses', housesController.createHouse);

module.exports = router;