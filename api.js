const sa = require('superagent').agent();
const { collectives } = require('./seed');

const {
  DISCOURSE_API_KEY: api_key = '',
  DISCOURSE_API_USERNAME: api_username = 'system',
  DISCOURSE_URL = 'http://localhost:3000',
} = process.env;

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
    .get(DISCOURSE_URL + '/categories.json')
    .query({ api_key, api_username })
    .then(({ body: { category_list: { categories } } }) => {
      const categoryNames = Object.keys(collectives).map(k => collectives[k].collective);
      return categories.filter(c => categoryNames.includes(c.name));
    }));

const getExistingGroups = (exports.getExistingGroups = () =>
  sa
    .get(DISCOURSE_URL + '/groups/search.json')
    .query({ api_key, api_username })
    .then(({ body: groups }) => groups));

const getExistingTagGroups = (exports.getExistingTagGroups = () =>
  sa
    .get(DISCOURSE_URL + '/tag_groups.json')
    .query({ api_key, api_username })
    .then(({ body: { tag_groups } }) => tag_groups));

const createCollective = (exports.createCollective = (name, text_color = 'black', color = 'red') =>
  sa
    .post(DISCOURSE_URL + '/categories.json')
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
  sa.post(DISCOURSE_URL + '/admin/groups').field({
    'group[name]': name,
    api_key,
    api_username,
  }));

const updateCollective = (exports.updateCollective = collective =>
  sa
    .put(DISCOURSE_URL + '/categories/' + collective.id)
    .field(noNulls(collective))
    .then(({ body: { category } }) => category));

const updatePost = (exports.updatePost = (id, raw) =>
  sa
    .put(DISCOURSE_URL + '/posts/' + id)
    .field({
      'post[raw]': raw,
      api_key,
      api_username,
    })
    .then(({ body }) => body));

const updateTopic = (exports.updateTopic = ({ slug, id }, title) =>
  sa
    .put(DISCOURSE_URL + '/t/' + slug + '/' + id + '.json')
    .field({
      title,
      api_key,
      api_username,
    })
    .then(({ body }) => body));

const updateTagGroup = (exports.updateTagGroup = ({ id, name, tag_names }) => {
  const req = sa.put(DISCOURSE_URL + '/tag_groups/' + id + '.json').field({ name, api_key, api_username });

  tag_names.forEach(tn => req.field('tag_names[]', tn));

  return req.then(({ body }) => body);
});

const createTagGroup = (exports.createTagGroup = ({ name, tag_names }) => {
  const req = sa.post(DISCOURSE_URL + '/tag_groups.json').field({ name, api_key, api_username });

  tag_names.forEach(tn => req.field('tag_names[]', tn));

  return req.then(({ body }) => {
    body;
    return body;
  });
});

const getPost = (exports.getPost = id => sa.get(DISCOURSE_URL + '/posts/' + id + '.json').then(({ body }) => body));

const getCollectiveTopicPost = (exports.getCollectiveTopicPost = collective =>
  getCollectiveAboutTopic(collective).then(getTopicFirstPost));

const getTopicFirstPost = (exports.getTopicFirstPost = ({ post_stream: { posts: [{ id }] } }) => getPost(id));

const getCollectiveAboutTopic = (exports.getCollectiveAboutTopic = collective =>
  sa.get(DISCOURSE_URL + '/t/' + collective.topic_url.split('/').slice(-1)[0] + '.json').then(({ body }) => body));
