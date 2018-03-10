const sa = require('superagent').agent();

const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000' } = require('../secrets');

const getExistingTagGroups = (exports.getExistingTagGroups = () =>
  sa
    .get(api_url + '/tag_groups.json')
    .query({ api_key, api_username })
    .then(({ body: { tag_groups } }) => tag_groups));

const updateTagGroup = (exports.updateTagGroup = ({ id, name, tag_names, once_per_topic }) => {
  const req = sa.put(api_url + '/tag_groups/' + id + '.json').field({ name, api_key, api_username, once_per_topic });

  tag_names.forEach(tn => req.field('tag_names[]', tn));

  return req.then(({ body }) => body);
});

const createTagGroup = (exports.createTagGroup = ({ name, tag_names, once_per_topic }) => {
  const req = sa.post(api_url + '/tag_groups.json').field({ name, api_key, api_username, once_per_topic });

  tag_names.forEach(tn => req.field('tag_names[]', tn));

  return req.then(({ body }) => {
    body;
    return body;
  });
});

const getExistingCampaigns = getExistingTagGroups;
const updateCampaign = updateTagGroup;
const createCampaign = createTagGroup;
