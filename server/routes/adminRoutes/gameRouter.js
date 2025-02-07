const Router = require('express')
const router = new Router()
const gameController = require('../../controllers/gameController')
const validateRequest = require("../../middlewares/validateRequest");
const { gameCreateSchema, gamePutSchema } = require("../../schemas/gameCreateSchema");

router.delete('/:id', gameController.delete)
router.put('/:id', validateRequest(gamePutSchema), gameController.update)
router.get('/', gameController.getAllAdmin)
router.post('/', validateRequest(gameCreateSchema), gameController.create)

module.exports = router