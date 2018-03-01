import { sendQueryStatistic, fetchResources } from '../../utils/resources';
import urlFactory from '../../utils/urlFactory';

const initialState = {
  resources: {
    ids: 'Top Jokes ID',
    nums: 'Top # Of Random Joke',
    names: 'Top Name',
    categories: 'Top Category',
    dates: 'Top Date',
    days: 'Top Days',
  },
  ids: [],
  nums: [],
  names: [],
  categories: [],
  dates: [],
  days: [],
  isFetching: {
    ids: false,
    names: false,
    nums: false,
    categories: false,
    dates: false,
    days: [],
  },
  isError: {
    ids: null,
    nums: null,
    names: null,
    categories: null,
    dates: null,
    days: [],
  },
};

export const postQueryStatistic = () => ({ type: 'POST_QUERY_STATISTIC' });

export const sendStatistic = async (options = initialState.options, dispatch) => {
  dispatch(postQueryStatistic());
  try {
    sendQueryStatistic(options);
  } catch (error) {
    throw error;
  }
};

export const getStatistics = async ({
  url, request, success, failure, dispatch,
}) => {
  try {
    dispatch(request());
    const data = await fetchResources(url);
    dispatch(success(data));
  } catch (error) {
    dispatch(failure(error));
  }
};

const getActionCreators = (name = '') => ({
  request: () => ({ type: `FETCH_${name.toUpperCase()}_STATS_REQUEST` }),
  success: data => ({ type: `FETCH_${name.toUpperCase()}_STATS_SUCCESS`, data }),
  failure: error => ({ type: `FETCH_${name.toUpperCase()}_STATS_FAILURE`, error }),
});

export const getIdStatistics = dispatch =>
  getStatistics({
    url: urlFactory.statistic.id,
    ...getActionCreators('id'),
    dispatch,
  });

export const getNumStatistics = dispatch =>
  getStatistics({
    url: urlFactory.statistic.num,
    ...getActionCreators('num'),
    dispatch,
  });

export const getNameStatistics = dispatch =>
  getStatistics({
    url: urlFactory.statistic.name,
    ...getActionCreators('name'),
    dispatch,
  });

export const getDatesStatistics = dispatch =>
  getStatistics({
    url: urlFactory.statistic.date,
    ...getActionCreators('date'),
    dispatch,
  });

export const getCategoryStatistics = dispatch =>
  getStatistics({
    url: urlFactory.statistic.category,
    ...getActionCreators('category'),
    dispatch,
  });

export const getDayStatistics = dispatch =>
  getStatistics({
    url: urlFactory.statistic.day,
    ...getActionCreators('day'),
    dispatch,
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ID_STATS_REQUEST':
      return { ...state, isFetching: { ...state.isFetching, id: true } };
    case 'FETCH_ID_STATS_SUCCESS':
      return {
        ...state,
        isFetching: { ...state.isFetching, ids: false },
        isError: { ...state.isError, ids: null },
        ids: action.data,
      };
    case 'FETCH_ID_STATS_FAILURE':
      return {
        ...state,
        isFetching: { ...state.isFetching, ids: false },
        isError: { ...state.isError, ids: action.error },
      };
    case 'FETCH_NUM_STATS_REQUEST':
      return { ...state, isFetching: { ...state.isFetching, nums: true } };
    case 'FETCH_NUM_STATS_SUCCESS':
      return {
        ...state,
        isFetching: { ...state.isFetching, nums: false },
        isError: { ...state.isError, nums: null },
        nums: action.data,
      };
    case 'FETCH_NUM_STATS_FAILURE':
      return {
        ...state,
        isFetching: { ...state.isFetching, nums: false },
        isError: { ...state.isError, nums: action.error },
      };
    case 'FETCH_NAME_STATS_REQUEST':
      return { ...state, isFetching: { ...state.isFetching, names: true } };
    case 'FETCH_NAME_STATS_SUCCESS':
      return {
        ...state,
        isFetching: { ...state.isFetching, names: false },
        isError: { ...state.isError, names: null },
        names: action.data,
      };
    case 'FETCH_NAME_STATS_FAILURE':
      return {
        ...state,
        isFetching: { ...state.isFetching, names: false },
        isError: { ...state.isError, names: action.error },
      };
    case 'FETCH_CATEGORY_STATS_REQUEST':
      return { ...state, isFetching: { ...state.isFetching, categories: true } };
    case 'FETCH_CATEGORY_STATS_SUCCESS':
      return {
        ...state,
        isFetching: { ...state.isFetching, categories: false },
        isError: { ...state.isError, categories: null },
        categories: action.data,
      };
    case 'FETCH_CATEGORY_STATS_FAILURE':
      return {
        ...state,
        isFetching: { ...state.isFetching, categories: false },
        isError: { ...state.isError, categories: action.error },
      };
    case 'FETCH_DATE_STATS_REQUEST':
      return { ...state, isFetching: { ...state.isFetching, dates: true } };
    case 'FETCH_DATE_STATS_SUCCESS':
      return {
        ...state,
        isFetching: { ...state.isFetching, dates: false },
        isError: { ...state.isError, dates: null },
        dates: action.data,
      };
    case 'FETCH_DATES_STATS_FAILURE':
      return {
        ...state,
        isFetching: { ...state.isFetching, dates: false },
        isError: { ...state.isError, dates: action.error },
      };
    case 'FETCH_DAY_STATS_REQUEST':
      return { ...state, isFetching: { ...state.isFetching, days: true } };
    case 'FETCH_DAY_STATS_SUCCESS':
      return {
        ...state,
        isFetching: { ...state.isFetching, days: false },
        isError: { ...state.isError, days: null },
        days: action.data,
      };
    case 'FETCH_DAY_STATS_FAILURE':
      return {
        ...state,
        isFetching: { ...state.isFetching, days: false },
        isError: { ...state.isError, days: action.error },
      };
    default:
      return state;
  }
};
