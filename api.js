const sa = require('superagent').agent();
const { collectives } = require('./seed');

const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000' } = require('./secrets');

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

const getExistingGroups = (exports.getExistingGroups = () =>
  sa
    .get(api_url + '/groups/search.json')
    .query({ api_key, api_username })
    .then(({ body: groups }) => groups));

const getExistingTagGroups = (exports.getExistingTagGroups = () =>
  sa
    .get(api_url + '/tag_groups.json')
    .query({ api_key, api_username })
    .then(({ body: { tag_groups } }) => tag_groups));

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

const updatePost = (exports.updatePost = (id, raw) =>
  sa
    .put(api_url + '/posts/' + id)
    .field({
      'post[raw]': raw,
      api_key,
      api_username,
    })
    .then(({ body }) => body));

const updateTopic = (exports.updateTopic = ({ slug, id }, title) =>
  sa
    .put(api_url + '/t/' + slug + '/' + id + '.json')
    .field({
      title,
      api_key,
      api_username,
    })
    .then(({ body }) => body));

const updateTagGroup = (exports.updateTagGroup = ({ id, name, tag_names, once_per_topic }) => {
  const req = sa.put(api_url + '/tag_groups/' + id + '.json').field({ name, api_key, api_username, once_per_topic });

  tag_names.forEach(tn => req.field('tag_names[]', tn));

  return req.then(({ body }) => body);
});

const createTagGroup = (exports.createTagGroup = ({ name, tag_names, once_per_topic }) => {
  const req = sa.post(api_url + '/tag_groups').field({ name, api_key, api_username, once_per_topic });

  tag_names.forEach(tn => req.field('tag_names[]', tn));

  return req.then(({ body }) => {
    body;
    return body;
  });
});

const getPost = (exports.getPost = id => sa.get(api_url + '/posts/' + id + '.json').then(({ body }) => body));

const getCollectiveTopicPost = (exports.getCollectiveTopicPost = collective =>
  getCollectiveAboutTopic(collective).then(getTopicFirstPost));

const getTopicFirstPost = (exports.getTopicFirstPost = ({ post_stream: { posts: [{ id }] } }) => getPost(id));

const getCollectiveAboutTopic = (exports.getCollectiveAboutTopic = collective =>
  sa.get(api_url + '/t/' + collective.topic_url.split('/').slice(-1)[0] + '.json').then(({ body }) => body));
