import axios from 'axios';
import qs from 'qs';

import { initialState } from '../store/reducers/jokes';

export const API_ENDPOINT = 'https://api.icndb.com';

export const STATISTIC_API = 'http://0.0.0.0:3310/queries';

export const sendQueryStatistic = (options = initialState.options) => {
  try {
    const data = {
      jokeId: options.id,
      num: options.num,
      category: options.category,
      name: `${options.firstName} ${options.lastName}`,
    };
    axios.post(STATISTIC_API, data);
  } catch (err) {
    throw err;
  }
};

export const createJokesURL = (id, num) => {
  if (id) return `${API_ENDPOINT}/jokes/${id}`;
  else if (num) return `${API_ENDPOINT}/jokes/random/${num}`;
  return `${API_ENDPOINT}/jokes/random`;
};

export const fetchJokes = async ({
  id, num, category, ...rest
}, categories) => {
  try {
    const url = createJokesURL(id, num);
    let escapedFilters = { ...rest, escape: 'javascript' };
    if (category === 'general') {
      escapedFilters = { ...escapedFilters, exclude: categories };
    } else if (category !== 'all') {
      escapedFilters = { ...escapedFilters, limitTo: category };
    }
    const q = qs.stringify(escapedFilters, { addQueryPrefix: true });
    const res = await axios.get(url.concat(q));
    const { data } = await res;
    if (data.type !== 'success') {
      throw new Error(JSON.stringify(data.value));
    }
    return Array.isArray(data.value) ? data.value : [data.value];
  } catch (error) {
    throw error;
  }
};

export const fetchNumberOfJokes = async () => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/jokes/count`);
    const { data } = await res;
    if (data.type !== 'success') throw new Error(JSON.stringify(data));
    return data.value;
  } catch (error) {
    return error;
  }
};

export const fetchCategories = async () => {
  try {
    const res = await axios.get(`${API_ENDPOINT}/categories`);
    const { data } = await res;
    if (data.type !== 'success') throw new Error(JSON.stringify(data));
    return data.value;
  } catch (error) {
    return error;
  }
};

export const fetchResources = async (url) => {
  try {
    const res = await axios.get(url);
    const { data: { values } } = await res;
    return Array.isArray(values) ? values.map(({ _id }) => _id).filter(x => x !== null) : [];
  } catch (error) {
    throw error;
  }
};

export default fetchJokes;
