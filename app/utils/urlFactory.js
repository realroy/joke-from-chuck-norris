export const STATISTIC_API = 'http://0.0.0.0:3310/queries';

const createURL = resource => `${STATISTIC_API}?group_by=${resource}&sort_by=dsc`

export default {
  statistic: {
    id: createURL('jokeId'),
    name: createURL('name'),
    category: createURL('category'),
    date: createURL('date'),
    day: createURL('day'),
    num: createURL('num'),
  },
}
