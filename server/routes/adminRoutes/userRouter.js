const Router = require('express')
const router = new Router()
const userController = require('../../controllers/userController')

router.delete('/:id', userController.delete)
router.put('/:id', userController.update)
router.get('/', userController.getAll)
router.post('/', userController.signup)

module.exports = router