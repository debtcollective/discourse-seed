const { groups } = require('../seed');
const { splitByProp, sleepAsync } = require('./utils');

module.exports = async discourse => {
  const existing = await discourse.groups.get();

  const { toCreate, toUpdate } = splitByProp('name', groups, existing);

  for (const group of toCreate) {
    await sleepAsync();
    existing.push(await discourse.groups.create(group));
  }

  for (const group of toUpdate) {
    await sleepAsync();
    await discourse.groups.update(group);
  }
};
