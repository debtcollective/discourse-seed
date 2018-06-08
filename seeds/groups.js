const { groups } = require('../data');
const { splitByProp } = require('./utils');

/**
 * Seeds the groups
 * @param {discourseApi.DiscourseApi} discourse Discourse API instance
 */
module.exports = async discourse => {
  const existing = await discourse.groups.get();

  const { toCreate, toUpdate } = splitByProp('name', groups, existing);

  for (const group of toCreate) {
    existing.push(await discourse.groups.create(group));
  }

  for (const group of toUpdate) {
    // https://github.com/debtcollective/parent/issues/142
    //    await discourse.groups.update(group);
  }
};
