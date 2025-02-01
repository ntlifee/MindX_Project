const Router = require('express')
const router = new Router()
const userController = require('../../controllers/userController')
const validateRequest = require("../../middlewares/validateRequest");
const { userSchemaForAdmin } = require("../../schemas/userSchema");

router.delete('/:id', userController.delete)
router.put('/:id', validateRequest(userSchemaForAdmin), userController.updateUser)
router.get('/', userController.getAll)
router.post('/', validateRequest(userSchemaForAdmin), userController.createUser)

module.exports = router