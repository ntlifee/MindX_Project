const Router = require('express')
const router = new Router()
const themeController = require('../../controllers/themeController')
const validateRequest = require("../../middlewares/validateRequest")
const { arraySchema, schema } = require("../../schemas/roleAndThemeSchema")

router.delete('/:id', themeController.delete)
router.put('/:id', validateRequest(schema), themeController.update)
router.get('/', themeController.getAll)
router.post('/', validateRequest(arraySchema), themeController.create)

module.exports = router