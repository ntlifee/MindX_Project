const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/auth', userController.check)

module.exports = router