import {
  nextJokeIndex,
  prevJokeIndex,
  goToJokeIndex,
  updateOptions,
  fetchJokesRequest,
  fetchJokesSuccess,
  fetchJokesFailure,
  fetchNumberOfJokesRequest,
  fetchNumberOfJokesSuccess,
  fetchNumberOfJokesFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '../jokes';

describe('nextJokeIndex', () => {
  it("should create an action to increase joke's index", () => {
    expect(nextJokeIndex()).toEqual({ type: 'NEXT_JOKE_INDEX' });
  });
});
describe('prevJokeIndex', () => {
  it("should create an action to decrease joke's index", () => {
    expect(prevJokeIndex()).toEqual({ type: 'PREV_JOKE_INDEX' });
  });
});
describe('goToJokeIndex', () => {
  it("should create an action to go to specific joke's index", () => {
    expect(goToJokeIndex(1)).toEqual({ type: 'GO_TO_JOKE_INDEX', index: 1 });
  });
});
describe('updateOptions', () => {
  it('should create an action to update jokes fetching options', () => {
    const actual = updateOptions({ id: 1, num: 0, query: null });
    const expected = {
      type: 'UPDATE_OPTIONS',
      options: {
        id: 1,
        num: 0,
        query: null,
      },
    };
    expect(actual).toEqual(expected);
  });
});
describe('fetchJokesRequest', () => {
  it('should create an action to active jokes fetching status', () => {
    const actual = fetchJokesRequest();
    const expected = {
      type: 'FETCH_JOKES_REQUEST',
    };
    expect(actual).toEqual(expected);
  });
});
describe('fetchJokesSuccess', () => {
  it('should create an action to add an empty joke array', () => {
    const jokes = [];
    const actual = fetchJokesSuccess(jokes);
    const expected = { type: 'FETCH_JOKES_SUCCESS', jokes: [] };
    expect(actual).toEqual(expected);
  });
  it('should create an action to add joke array', () => {
    const jokes = ['A', 'B'];
    const actual = fetchJokesSuccess(jokes);
    const expected = { type: 'FETCH_JOKES_SUCCESS', jokes: ['A', 'B'] };
    expect(actual).toEqual(expected);
  });
});
describe('fetchJokesFailure', () => {
  it('should create an action to add error when it occur', () => {
    const error = new Error();
    const actual = fetchJokesFailure(error);
    const expected = { type: 'FETCH_JOKES_FAILURE', error: new Error() };
    expect(actual).toEqual(expected);
  });
});
describe('fetchNumberOfJokersRequest', () => {
  it('should create an action to active number of jokes fetching status', () => {
    const actual = fetchNumberOfJokesRequest();
    const expected = { type: 'FETCH_NUMBER_OF_JOKES_REQUEST' };
    expect(actual).toEqual(expected);
  });
});
describe('fetchNumberOfJokersSuccess', () => {
  it('should create an actions to add number of jokes', () => {
    const actual = fetchNumberOfJokesSuccess(69);
    const expected = { type: 'FETCH_NUMBER_OF_JOKES_SUCCESS', maxJokes: 69 };
    expect(actual).toEqual(expected);
  });
});
describe('fetchNumberOfJokersFailure', () => {
  it('should create an actions to add error when fetching number of jokes failed', () => {
    const actual = fetchNumberOfJokesFailure(new Error());
    const expected = { type: 'FETCH_NUMBER_OF_JOKES_FAILURE', error: new Error() };
    expect(actual).toEqual(expected);
  });
});
describe('fetchCategoriesRequest', () => {
  it('should create an action to active categories fetching status', () => {
    const actual = fetchCategoriesRequest();
    const expected = { type: 'FETCH_CATEGORIES_REQUEST' };
    expect(actual).toEqual(expected);
  });
});
describe('fetchCategoriesSuccess', () => {
  it('should create an action to add categories to jokes', () => {
    const actual = fetchCategoriesSuccess(['explicit', 'nerdy']);
    const expected = { type: 'FETCH_CATEGORIES_SUCCESS', categories: ['explicit', 'nerdy'] };
    expect(actual).toEqual(expected);
  });
});
describe('fetchCategoriesFailure', () => {
  it('should create an action to add error when fetching categories failed', () => {
    const actual = fetchCategoriesFailure(new Error());
    const expected = { type: 'FETCH_CATEGORIES_FAILURE', error: new Error() };
    expect(actual).toEqual(expected);
  });
});
