const Router = require('express')
const router = new Router()
const roleController = require('../../controllers/roleController')
const validateRequest = require("../../middlewares/validateRequest")
const { roleArraySchema, roleSchema } = require("../../schemas/roleSchema")

router.delete('/:id', roleController.delete)
router.put('/:id', validateRequest(roleSchema), roleController.update)
router.get('/', roleController.getAll)
router.post('/', validateRequest(roleArraySchema), roleController.create)

module.exports = router