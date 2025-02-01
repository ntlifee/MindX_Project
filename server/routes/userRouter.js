const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const validateRequest = require("../middlewares/validateRequest");
const { userSchema } = require("../schemas/userSchema");

router.put('/:id', authMiddleware(), validateRequest(userSchema), userController.update)
router.post('/signup', validateRequest(userSchema), userController.signup)
router.post('/signin', userController.signin)
router.get('/auth', authMiddleware(), userController.check)

module.exports = router