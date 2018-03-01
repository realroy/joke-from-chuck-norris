const router = require('express').Router()

const ControllerFactory = require('../controllers')
const q = new ControllerFactory().getController('query')

module.exports = router
	.get('/', q.index())
	.post('/', q.create())
	.get('/:id', q.read())
	.put('/:id', q.update())
	.delete('/:id', q.delete())