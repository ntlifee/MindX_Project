const Router = require('express')
const router = new Router()
const roleController = require('../../controllers/roleController')
const validateRequest = require("../../middlewares/validateRequest")
const { arraySchema, schema } = require("../../schemas/roleAndThemeSchema")

router.delete('/:id', roleController.delete)
router.put('/:id', validateRequest(schema), roleController.update)
router.get('/', roleController.getAll)
router.post('/', validateRequest(arraySchema), roleController.create)

module.exports = router