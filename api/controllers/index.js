const { formatJSON } = require('./helpers')

class ControllerFactory {
	constructor() {
		this.list = {
			query: {
				Controller: require('./query'),
				Model: require('../models/query'),
				Formatter: formatJSON
			}
		}
	}
	getController(name = 'query') {
		if (this.list[name]) {
			const { Controller, Model, Formatter } = this.list[name]
			return new Controller(Model, Formatter)
		} else return null
	}
}

module.exports = ControllerFactory
