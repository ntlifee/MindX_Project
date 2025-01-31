const Router = require('express')
const router = new Router()
const gameController = require('../../controllers/gameController')

router.delete('/:id', gameController.delete)
router.put('/:id', gameController.update)
router.get('/:id', gameController.getOne)
router.get('/', gameController.getAll)
router.post('/', gameController.create)

module.exports = router