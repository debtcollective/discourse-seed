const sa = require('superagent').agent();
const { collectives } = require('../seed');

const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000' } = require('../secrets');

const noNulls = (exports.noNulls = obj => {
  Object.keys(obj).forEach(k => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k];
    }
  });
  return obj;
});

const getExistingCollectives = (exports.getExistingCollectives = () =>
  sa
    .get(api_url + '/categories.json')
    .query({ api_key, api_username })
    .then(({ body: { category_list: { categories } } }) => {
      const categoryNames = Object.keys(collectives).map(k => collectives[k].collective);
      return categories.filter(c => categoryNames.includes(c.name));
    }));
const getExistingCategories = getExistingCollectives;

const getExistingGroups = (exports.getExistingGroups = () =>
  sa
    .get(api_url + '/groups/search.json')
    .query({ api_key, api_username })
    .then(({ body: groups }) => groups));

const createCollective = (exports.createCollective = (name, text_color = 'black', color = 'red') =>
  sa
    .post(api_url + '/categories.json')
    .field({
      name,
      text_color,
      color,
      api_key,
      api_username,
    })
    .then(({ body: { category: collective } }) => collective)
    .catch(err => {}));

const createGroup = (exports.createGroup = name =>
  sa.post(api_url + '/admin/groups').field({
    'group[name]': name,
    api_key,
    api_username,
  }));

const updateCollective = (exports.updateCollective = collective =>
  sa
    .put(api_url + '/categories/' + collective.id)
    .field(noNulls(collective))
    .then(({ body: { category } }) => category));

const getCollectiveAboutTopic = (exports.getCollectiveAboutTopic = collective =>
  sa.get(api_url + '/t/' + collective.topic_url.split('/').slice(-1)[0] + '.json').then(({ body }) => body));
