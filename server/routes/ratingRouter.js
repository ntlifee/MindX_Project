const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')

router.get('/:id', ratingController.getOne.bind(ratingController))

module.exports = router