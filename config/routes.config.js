const router = require('express').Router();
const usersController = require("../controllers/users.controller")
const authController = require("../controllers/auth.controller");
const housesController = require("../controllers/houses.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const orderingController = require("../controllers/ordering.controller");
const likesController = require("../controllers/likes.controller");
const adminController = require("../controllers/admin.controller");
const commentController = require("../controllers/comment.controler")
const messageController = require("../controllers/message.controller");
const chatController = require("../controllers/chat.controller");


const upload = require('./storage.config');

router.post('/login', authController.login);

router.post('/users', upload.single('avatar'), usersController.create);
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser);
router.get('/users', authMiddleware.isAuthenticated, usersController.getAllUsers);
router.delete('/users/:id', authMiddleware.isAuthenticated, usersController.deleteUser);
router.get("/activate/:token", authController.activate);
router.get('/admin/dashboard', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.dashboard);
router.get('/admin/dashboard/users', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.getUsers);

//House
router.get('/houses', housesController.getHouse)
router.post('/houses',upload.array('images', 10),authMiddleware.isAuthenticated, housesController.createHouse);
router.get('/houses/me', authMiddleware.isAuthenticated, housesController.getMyHouses);
router.get('/houses/:id', authMiddleware.isAuthenticated, housesController.getHouseDetail);
router.put('/houses/:id', authMiddleware.isAuthenticated, housesController.editHouse);
router.delete('/houses/:id', authMiddleware.isAuthenticated, housesController.deleteHouse);
router.post('/houses/checkout/:id', authMiddleware.isAuthenticated, housesController.createCheckoutSession);
router.post('/checkout/:id/success', authMiddleware.isAuthenticated, housesController.handlePaymentSuccess);
//Order

router.post('/ordering', authMiddleware.isAuthenticated, orderingController.createOrdering);
router.get('/ordering', authMiddleware.isAuthenticated, orderingController.getAllOrderings);
router.get('/ordering/:id', authMiddleware.isAuthenticated, orderingController.getOrderingById);
router.put('/ordering/:id', authMiddleware.isAuthenticated, orderingController.updateOrdering);
router.delete('/ordering/:id', authMiddleware.isAuthenticated, orderingController.deleteOrdering);


//COMMENTS
router.get('/comment/:houseId', authMiddleware.isAuthenticated, commentController.getComment)
router.post('/comment/:houseId', authMiddleware.isAuthenticated, commentController.createComment)
router.delete('/comment/:commentId', authMiddleware.isAuthenticated, commentController.deleteComment)

//Message
router.post('/message/:chatId', authMiddleware.isAuthenticated, messageController.create);
router.get('/message', authMiddleware.isAuthenticated, messageController.getCurrentUserMessageById)
//CHAT
router.get('/chats', authMiddleware.isAuthenticated, chatController.allChats)
router.get('/chats/:chatId', authMiddleware.isAuthenticated, chatController.getChat)
router.post('/chats/:userId', authMiddleware.isAuthenticated, chatController.createChat)


//Like
router.post('/likes/:houseId', authMiddleware.isAuthenticated, likesController.toggleLike);
router.get('/likes', authMiddleware.isAuthenticated, likesController.getMyLikes);

module.exports = router;