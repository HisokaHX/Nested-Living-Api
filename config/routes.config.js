const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller");
const housesController = require("../controllers/houses.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/login', authController.login);

router.post('/users', usersController.create);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);

//House
router.post('/houses', housesController.createHouse);

module.exports = router;