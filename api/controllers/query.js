const debug = require('debug')('query:controller')
const httpStatus = require('http-status')

const Query = require('../models/query')
const { groupAggregater, sortAggregater } = require('./helpers')

module.exports = class QueryController {
	constructor(Model = Query, formatter) {
		this.Model = Model
		this.formatter = formatter
	}
	async _validateQuery({ group_by = 'id', sort_by = 'asc', limit = 5 }) {
		const sort = (() => {
			switch (sort_by) {
				case 'asc':
					return group_by
				case 'dsc':
					return '-'.concat(group_by)
				default:
					return group_by
			}
		})()
		const result = { sort_by: sort, limit }
		debug('_validateQuery: ', result)
		return result
	}
	async _handleSuccess(values, res, status) {
		const result = await this.formatter([], values, this.Model)
		res.status(status).json(result)
	}
	async _handleError(errors, res) {
		const result = await this.formatter(errors, [], this.Model)
		let status = httpStatus.INTERNAL_SERVER_ERROR
		if (errors.name === 'CastError') status = httpStatus.BAD_REQUEST
		res.status(status).json(result)
	}
	async _handleQuery(query) {
		const hasQuery = Object.keys(query).length !== 0
		const { limit, sort_by } = await this._validateQuery(query)
		try {
			return !hasQuery
				? await this.Model.find({})
						.sort(sort_by)
						.limit(limit)
				: await this.Model.aggregate([
						...groupAggregater(query),
						...sortAggregater(query)
					]).limit(limit)
		} catch (error) {
			throw error
		}
	}
	index() {
		return async (req, res) => {
			try {
				const queries = await this._handleQuery(req.query)
				this._handleSuccess(queries, res, httpStatus.OK)
			} catch (error) {
				this._handleError(error, res)
			}
		}
	}
	create() {
		return async (req, res) => {
			try {
				const query = await this.Model.create(req.body)
				this._handleSuccess(query, res, httpStatus.CREATED)
			} catch (error) {
				this._handleError(error, res)
			}
		}
	}
	read() {
		return async (req, res) => {
			try {
				const query = await this.Model.findById(req.params.id)
				this._handleSuccess(query, res, httpStatus.OK)
			} catch (error) {
				this._handleError(error, res)
			}
		}
	}
	update() {
		return async (req, res) => {
			try {
				const query = await this.Model.findByIdAndUpdate(
					req.params.id,
					req.body
				)
				this._handleSuccess(query, res, httpStatus.NO_CONTENT)
			} catch (error) {
				this._handleError(error, res)
			}
		}
	}
	delete() {
		return async (req, res) => {
			try {
				await this.Model.findByIdAndRemove(req.params.id)
				this._handleSuccess([], res, httpStatus.NO_CONTENT)
			} catch (error) {
				this._handleError(error, res)
			}
		}
	}
}
