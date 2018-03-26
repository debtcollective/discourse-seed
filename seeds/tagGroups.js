const { tagGroups } = require('../seed');
const { splitByProp, sleepAsync } = require('./utils');

module.exports = async discourse => {
  await sleepAsync();
  const existing = await discourse.tagGroups.getAll();

  const { toCreate, toUpdate } = splitByProp('name', tagGroups, existing, discourse.tagGroups.differ);

  for (const tg of toCreate) {
    await sleepAsync();
    existing.push(await discourse.tagGroups.create(tg));
  }

  for (const tg of toUpdate) {
    await sleepAsync();
    await discourse.tagGroups.update(tg);
  }
};
