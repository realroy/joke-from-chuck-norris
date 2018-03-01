import {
  postQueryStatistic,
  fetchJokeIDsRequest,
  fetchJokeIDsSuccess,
  fetchJokeIDsFailure,
  fetchRandomJokesRequest,
  fetchRandomJokesSuccess,
  fetchRandomJokesFailure,
  fetchNamesRequest,
  fetchNamesSuccess,
  fetchNamesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  fetchDatesRequest,
  fetchDatesSuccess,
  fetchDatesFailure,
} from '../statistics'

describe('Statistic Actions', () => {
  describe('post query statistic', () => {
    it('should create an action type equal to POST_QUERY_STATISTIC', () => {
      expect(postQueryStatistic()).toEqual({ type: 'POST_QUERY_STATISTIC' })
    })
  })
})