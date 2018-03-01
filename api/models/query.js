const mongoose = require('mongoose')

const schema = mongoose.Schema({
	category: {
		type: String,
		default: 'all',
		enum: ['all', 'general', 'explicit', 'nerdy']
	},
	jokeId: { type: Number, min: 0, default: 1 },
	name: { type: String, default: 'Chuck Norris' },
	num: { type: Number, min: 0, default: 0 },
	createAt: { type: Date, default: Date.now() },
	date: { type: Number },
	day: { type: Number },
	month: { type: Number },
	year: { type: Number },
})

schema.plugin((schema) => {
	schema.pre('save', function (next) {
		const date = new Date(this.createAt)
		this.date = date.getDate()
		this.day = date.getDay()
		this.month = date.getMonth()
		this.year = date.getFullYear()
		next()
	})
})

module.exports = mongoose.model('Query', schema)
