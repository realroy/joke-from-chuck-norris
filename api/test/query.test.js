const expect = require('chai').expect
const request = require('supertest')
const httpStatus = require('http-status')

const app = require('../app')
const Query = require('../models/query')
const getDBConnection = require('../db')

describe('Query Service', () => {
	let db
	before(done => {
		db = getDBConnection()
			.on('error', err => done(err))
			.once('open', () => done())
	})
	beforeEach(async () => {
		await Query.find({})
		await Query.db.dropDatabase()
	})
	describe('GET /queries', () => {
		it('should return empty values array, empty errors array and status code = 200', done => {
			request(app)
				.get('/queries')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, { body }) => {
					expect(body).to.deep.equal({
						errors: [],
						values: [],
						total: 0
					})
					done(err)
				})
		})
		it('should return all of queries with status code = 200', async () => {
			try {
				await Query.create({})
				request(app)
					.get('/queries')
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, { body }) => {
						if (err) throw err
						expect(body.errors).to.be.empty
						expect(body.values[0]).to.include({
							name: 'Chuck Norris',
							jokeId: 1,
							category: 'all',
							num: 0
						})
						expect(body.total).to.equal(1)
					})
			} catch (error) {
				throw error
			}
		})
	})
	describe('POST /queries', () => {
		it('should create new query when given empty body and return status code 201', done => {
			request(app)
				.post('/queries')
				.expect(httpStatus.CREATED)
				.end((err, { body }) => {
					if (err) done(err)
					expect(body.errors).to.be.empty
					expect(body.values[0]).to.include({
						name: 'Chuck Norris',
						jokeId: 1,
						category: 'all',
						num: 0
					})
					expect(body.total).to.equal(1)
				})
			done()
		})
		it('should create new query when given valid body and return status code 201', done => {
			request(app)
				.post('/queries')
				.send({
					name: 'Prayuth Chandara',
					jokeId: 44,
					num: 0,
					category: 'general'
				})
				.expect(httpStatus.CREATED)
				.end((err, { body }) => {
					if (err) done(err)
					expect(body.errors).to.be.empty
					expect(body.values[0]).to.include({
						name: 'Prayuth Chandara',
						jokeId: 44,
						category: 'general',
						num: 0
					})
					expect(body.total).to.equal(1)
				})
			done()
		})
	})
	describe('GET /queries/:id', () => {
		it('should get query that exactly matches with given id', async () => {
			try {
				const query = await Query.create({ name: 'John Doe' })
				request(app)
					.get(`/queries/${query.id}`)
					.expect(httpStatus.OK)
					.end((err, { body }) => {
						if (err) throw err
						expect(body.errors).to.be.empty
						expect(body.values[0]).to.include({
							name: 'John Doe'
						})
						expect(body.total).to.equal(1)
					})
			} catch (err) {
				throw err
			}
		})
		it("should return status code 400 when can't find any queries that match with given id", done => {
			Query.create({})
			request(app)
				.get('/queries/something')
				.expect(httpStatus.BAD_REQUEST)
				.end((err, { body }) => {
					if (err) throw err
					expect(body.errors).to.not.be.empty
					expect(body.values).to.be.empty
					expect(body.total).to.equal(1)
				})
			done()
		})
	})
	describe('PUT /queries/:id', () => {
		it('should update query at given id and return status code 204', done => {
			Query.create({}).then(result => {
				request(app)
					.put(`/queries/${result.id}`)
					.send({ name: 'John Doe' })
					.expect(httpStatus.NO_CONTENT)
					.end((err, { body }) => {
						if (err) done(err)
						expect(body.errors).to.be.empty
						expect(body.values).to.be.empty
						expect(body.total).to.equal(1)
					})
			})
			done()
		})
		it('shouldn\'t update query when given id doesn\'t match with any queries and return status code 404', done => {
			request(app).put('/queries/something')
			.expect(httpStatus.BAD_REQUEST)
			.end((err, { body }) => {
				if (err) done(err)
				expect(body.errors).to.not.be.empty
				expect(body.values).to.be.empty
			})
			done()
		})
	})
	describe('DELETE /queries/:id', done => {
		it('should delete query at given id and return status code 204', done => {
			Query.create({})
				.then(query => {
					request(app)
					.delete(`/queries/${query.id}`)
					.expect(httpStatus.NO_CONTENT)
					.end((err, { body }) => {
						if (err) done(err)
						expect(body).to.be.empty
						done()
					})
				})
				.catch(err => done(err))
		})
	})
})
