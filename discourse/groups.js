const { authGet, authPost, authPut, authDelete } = require('./api');

module.exports = {
  get: authGet('/groups/search.json'),
  create: g => authPost('/admin/groups')({ ...g, asPropOf: 'group' }),
  update: g => authPut(`/admin/groups/${g.id}`)({ ...g, asPropOf: 'group' }),
};
