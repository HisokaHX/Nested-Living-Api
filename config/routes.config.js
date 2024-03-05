const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller");
const housesController = require("../controllers/houses.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const orderingController = require("../controllers/ordering.controller");
const likesController = require("../controllers/likes.controller");
const upload = require('./storage.config');

router.post('/login', authController.login);

router.post('/users', upload.single('avatar'), usersController.create);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get("/activate/:token", authController.activate);

//House
router.get('/houses', housesController.getHouse)
router.post('/houses',upload.array('images', 10),authMiddleware.isAuthenticated, housesController.createHouse);
router.get('/houses/me', authMiddleware.isAuthenticated, housesController.getMyHouses);
router.get('/houses/:id', authMiddleware.isAuthenticated, housesController.getHouseDetail);

//Order

router.post('/ordering', authMiddleware.isAuthenticated, orderingController.createOrdering);
router.get('/ordering', authMiddleware.isAuthenticated, orderingController.getAllOrderings);
router.get('/ordering/:id', authMiddleware.isAuthenticated, orderingController.getOrderingById);
router.put('/ordering/:id', authMiddleware.isAuthenticated, orderingController.updateOrdering);
router.delete('/ordering/:id', authMiddleware.isAuthenticated, orderingController.deleteOrdering);

//Like
router.post('/likes/:houseId', authMiddleware.isAuthenticated, likesController.toggleLike);

module.exports = router;