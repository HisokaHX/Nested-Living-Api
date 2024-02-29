const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller");
const housesController = require("../controllers/houses.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const orderingController = require("../controllers/ordering.controller");
const upload = require('./storage.config');

router.post('/login', authController.login);

router.post('/users', usersController.create);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);

//House
router.get('/houses', housesController.getHouse)
router.post('/houses',upload.array('images', 10),authMiddleware.isAuthenticated, housesController.createHouse);

//Order

router.post('/ordering', authMiddleware.isAuthenticated, orderingController.createOrdering);
router.get('/ordering', authMiddleware.isAuthenticated, orderingController.getAllOrderings);
router.get('/ordering/:id', authMiddleware.isAuthenticated, orderingController.getOrderingById);
router.put('/ordering/:id', authMiddleware.isAuthenticated, orderingController.updateOrdering);
router.delete('/ordering/:id', authMiddleware.isAuthenticated, orderingController.deleteOrdering);

module.exports = router;