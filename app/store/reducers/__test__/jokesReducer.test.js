import {
  reducer,
  initialState,
  fetchJokesRequest,
  fetchJokesSuccess,
  fetchJokesFailure,
  updateOptions,
  nextJokeIndex,
  prevJokeIndex,
  fetchNumberOfJokesRequest,
  fetchNumberOfJokesSuccess,
  fetchNumberOfJokesFailure,
  goToJokeIndex,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../jokes';

describe('joke reducer', () => {
  it('should return initial state at the beginning', () => {
    const actual = reducer(undefined, {});
    const expected = initialState;
    expect(actual).toEqual(expected);
  });
  it('should handle FETCH_JOKES_REQUEST', () => {
    const action = fetchJokesRequest()
    const actual = reducer(undefined, action);
    expect(actual).toHaveProperty('isFetchingJokes', true);
  });
  it('should handle FETCH_JOKES_SUCCESS', () => {
    const jokes = ['A', 'B', 'C'];
    const action = fetchJokesSuccess(jokes);
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('isFetchingJokes', false);
    expect(actual).toHaveProperty('jokes', ['A', 'B', 'C']);
  });
  it('should handle FETCH_JOKES_FAILURE', () => {
    const action = fetchJokesFailure(new Error());
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('isFetchingJokes', false);
    expect(actual).toHaveProperty('fetchingJokesError', new Error());
  });
  it('should handle UPDATE_OPTIONS', () => {
    const action = updateOptions({ id: 1, num: 0, query: null });
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('options.id', 1);
    expect(actual).toHaveProperty('options.num', 0);
    expect(actual).toHaveProperty('options.query', {});
  });
  it('should not handle NEXT_JOKE_INDEX when jokeIndex === maxJokes', () => {
    const action = nextJokeIndex();
    const actual = reducer(undefined, action);
    expect(actual).toHaveProperty('jokeIndex', 0);
  });
  it('should handle NEXT_JOKE_INDEX when jokeIndex < maxJokes', () => {
    const action = nextJokeIndex();
    const mockedState = {
      jokes: new Array(20).fill('A', 0),
      jokeIndex: 0,
      maxJokes: 1,
    };
    const actual = reducer(mockedState, action);
    expect(actual).toHaveProperty('jokeIndex', 1);
  });
  it('should not handle PREV_JOKE_INDEX when jokeIndex === 1', () => {
    const action = prevJokeIndex();
    const mockedState = {
      jokeIndex: 1,
    };
    const actual = reducer(mockedState, action);
    expect(actual).toHaveProperty('jokeIndex', 0);
  });
  it('should handle PREV_JOKE_INDEX > 1', () => {
    const action = prevJokeIndex();
    const mockedState = {
      jokeIndex: 2,
      maxJokes: 2,
    };
    const actual = reducer(mockedState, action);
    expect(actual).toHaveProperty('jokeIndex', 1);
  });
  it('should handle FETCH_NUMBER_OF_JOKES_REQUEST', () => {
    const action = fetchNumberOfJokesRequest();
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('isFetchingNumberOfJokes', true);
  });
  it('should handle FETCH_NUMBER_OF_JOKE_SUCCESS', () => {
    const action = fetchNumberOfJokesSuccess(10);
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('isFetchingNumberOfJokes', false);
    expect(actual).toHaveProperty('fetchingNumberOfJokesError', null);
    expect(actual).toHaveProperty('maxJokes', 10);
  });
  it('should handle FETCH_NUMBER_OF_JOKE_FAILURE', () => {
    const action = fetchNumberOfJokesFailure(new Error());
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('isFetchingNumberOfJokes', false);
    expect(actual).toHaveProperty('fetchingNumberOfJokesError', new Error());
  });
  it('should handle GO_TO_JOKE_INDEX when the index >= 1 and < current jokes.length', () => {
    const action = goToJokeIndex(20);
    const mockedState = {
      jokes: new Array(20).fill(0, 0),
      jokeIndex: 1,
    };
    const actual = reducer(mockedState, action);
    expect(actual).toHaveProperty('jokeIndex', 20);
  });
  it('should not handle GO_TO_JOKE_INDEX when the index < 1 or > current jokes.length', () => {
    const action = goToJokeIndex(20);
    const mockedState = {
      jokes: ['A'],
      jokeIndex: 1,
    };
    const actual = reducer(mockedState, action);
    expect(actual).toHaveProperty('jokeIndex', 1);
  });
  it('should handle FETCH_CATEGORIES_REQUEST', () => {
    const action = fetchCategoriesRequest();
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('isFetchingCategories', true);
  });
  it('should handle FETCH_CATEGORIES_SUCCESS', () => {
    const action = fetchCategoriesSuccess(['explicit', 'nerdy'])
    // const action = fetchCategoriesSuccess(['explicit', 'nerdy']);
    const actual = reducer(undefined, action);
    expect(actual).toHaveProperty('isFetchingCategories', false);
    expect(actual).toHaveProperty('fetchingCategoriesError', false);
    expect(actual).toHaveProperty('categories', ['explicit', 'nerdy']);
  });
  it('should handle FETCH_CATEGORIES_FAILURE', () => {
    const action = fetchCategoriesFailure(new Error());
    const actual = reducer(null, action);
    expect(actual).toHaveProperty('isFetchingCategories', false);
    expect(actual).toHaveProperty('fetchingCategoriesError', new Error());
  });
});
