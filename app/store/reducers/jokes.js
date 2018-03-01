import { fetchJokes, fetchNumberOfJokes, fetchCategories } from '../../utils/resources';
import { sendStatistic } from './statistics';

export const initialState = {
  fetchingJokesError: null,
  fetchingNumberOfJokesError: null,
  fetchingCategoriesError: null,
  jokes: [
    {
      id: 1,
      joke: 'Chuck Norris uses ribbed condoms inside out, so he gets the pleasure.',
      categories: ['explicit'],
    },
  ],
  categories: [],
  maxJokes: 0,
  isFetchingJokes: false,
  isFetchingNumberOfJokes: false,
  isFetchingCategories: false,
  jokeIndex: 0,
  options: {
    firstName: 'Chuck',
    lastName: 'Norris',
    num: 1,
    id: 0,
    category: 'all',
  },
};

export const fetchCategoriesRequest = () => ({ type: 'FETCH_CATEGORIES_REQUEST' });
export const fetchCategoriesSuccess = categories => ({
  type: 'FETCH_CATEGORIES_SUCCESS',
  categories,
});
export const fetchCategoriesFailure = error => ({ type: 'FETCH_CATEGORIES_FAILURE', error });

export const nextJokeIndex = () => ({ type: 'NEXT_JOKE_INDEX' });
export const prevJokeIndex = () => ({ type: 'PREV_JOKE_INDEX' });
export const goToJokeIndex = index => ({ type: 'GO_TO_JOKE_INDEX', index });

export const updateOptions = options => ({
  type: 'UPDATE_OPTIONS',
  options,
});
export const fetchNumberOfJokesRequest = () => ({ type: 'FETCH_NUMBER_OF_JOKES_REQUEST' });
export const fetchNumberOfJokesSuccess = maxJokes => ({
  type: 'FETCH_NUMBER_OF_JOKES_SUCCESS',
  maxJokes,
});
export const fetchNumberOfJokesFailure = error => ({
  type: 'FETCH_NUMBER_OF_JOKES_FAILURE',
  error,
});

export const fetchJokesRequest = () => ({ type: 'FETCH_JOKES_REQUEST' });
export const fetchJokesSuccess = jokes => ({ type: 'FETCH_JOKES_SUCCESS', jokes });
export const fetchJokesFailure = error => ({ type: 'FETCH_JOKES_FAILURE', error });

export const getJokes = async (dispatch, options, categories) => {
  dispatch(fetchJokesRequest());
  try {
    options.firstName = options.firstName || initialState.options.firstName;
    options.lastName = options.lastName || initialState.options.lastName;
    await sendStatistic(options, dispatch);
    const jokes = await fetchJokes(options, categories);
    dispatch(fetchJokesSuccess(jokes));
  } catch (error) {
    dispatch(fetchJokesFailure(error.message));
  }
};

export const getNumberOfJokes = (dispatch) => {
  dispatch(fetchNumberOfJokesRequest());
  fetchNumberOfJokes()
    .then(number => dispatch(fetchNumberOfJokesSuccess(number)))
    .catch(error => dispatch(fetchNumberOfJokesFailure(error)));
};

export const getCategories = (dispatch) => {
  dispatch(fetchCategoriesRequest());
  fetchCategories()
    .then(categories => dispatch(fetchCategoriesSuccess(categories)))
    .catch(error => dispatch(fetchCategoriesFailure(error)));
};

export const isInRange = (testValue, startingPoint, endingPoint) =>
  testValue <= endingPoint && testValue >= startingPoint;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_JOKES_REQUEST':
      return { ...state, isFetchingJokes: true };
    case 'FETCH_JOKES_SUCCESS':
      return {
        ...state,
        isFetchingJokes: false,
        jokes: action.jokes,
        fetchingJokesError: null,
      };
    case 'FETCH_JOKES_FAILURE':
      return { ...state, isFetchingJokes: false, fetchingJokesError: action.error };
    case 'UPDATE_OPTIONS':
      return {
        ...state,
        options: {
          ...state.options,
          ...action.options,
        },
      };
    case 'NEXT_JOKE_INDEX':
      return {
        ...state,
        jokeIndex: state.jokeIndex < state.jokes.length - 1 ? state.jokeIndex + 1 : state.jokeIndex,
      };
    case 'PREV_JOKE_INDEX':
      return {
        ...state,
        jokeIndex: state.jokeIndex >= 1 ? state.jokeIndex - 1 : state.jokeIndex,
      };
    case 'FETCH_NUMBER_OF_JOKES_REQUEST':
      return {
        ...state,
        isFetchingNumberOfJokes: true,
      };
    case 'FETCH_NUMBER_OF_JOKES_SUCCESS':
      return {
        ...state,
        isFetchingNumberOfJokes: false,
        fetchingNumberOfJokesError: null,
        maxJokes: action.maxJokes,
      };
    case 'FETCH_NUMBER_OF_JOKES_FAILURE':
      return {
        ...state,
        isFetchingNumberOfJokes: false,
        fetchingNumberOfJokesError: action.error,
      };
      /* eslint-disable no-case-declarations */
    case 'GO_TO_JOKE_INDEX':
      const jokeIndex = isInRange(action.index, 0, state.jokes.length - 1)
        ? action.index
        : state.jokeIndex;
      return {
        ...state,
        jokeIndex,
      };
    case 'FETCH_CATEGORIES_REQUEST':
      return {
        ...state,
        isFetchingCategories: true,
      };
    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        isFetchingCategories: false,
        fetchingCategoriesError: null,
        categories: ['all', 'general', ...action.categories],
      };
    case 'FETCH_CATEGORIES_FAILURE':
      return {
        ...state,
        isFetchingCategories: false,
        fetchingCategoriesError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
