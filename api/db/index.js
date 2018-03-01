const mongoose = require('mongoose')
const debug = require('debug')('db:index')
require('dotenv').config()

const defaultEnv = {
	NODE_ENV: 'development',
	DB_DEV_URL: 'mongodb://172.19.0.2:27017/development'
}

const getDbURL = (env = defaultEnv) => {
	switch (env.NODE_ENV) {
	case 'production':
		return env.DB_PROD_URL
	case 'development':
		return env.DB_DEV_URL
	case 'test':
		return env.DB_TEST_URL
	default:
		return ''
	}
}

module.exports = () => {
	const url = getDbURL(process.env) || defaultEnv.DB_DEV_URL
	console.log(url)
	mongoose.Promise = global.Promise
	mongoose.connect(url)
	return mongoose.connection
}
