const sa = require('superagent').agent();
const { collectives } = require('../seed');

const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000' } = require('../secrets');

const getPost = (exports.getPost = id => sa.get(api_url + '/posts/' + id + '.json').then(({ body }) => body));

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

const getTopicFirstPost = (exports.getTopicFirstPost = ({ post_stream: { posts: [{ id }] } }) => getPost(id));
