const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.put('/:id', authMiddleware(), userController.update)
router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/auth', authMiddleware(), userController.check)

module.exports = router