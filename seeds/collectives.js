const { collectives } = require('../seed');
const { propsDiffer, splitByProp, sleepAsync } = require('./utils');

const colArr = Object.keys(collectives).map(k => collectives[k]);
const collectiveGroups = colArr.map(c => c.group);

/**
 * Seeds the collectives
 * @param {discourseApi.DiscourseApi} discourse Discourse API instance
 */
module.exports = async discourse => {
  await sleepAsync();
  const existingCollectives = await discourse.categories.getAll();
  await sleepAsync();
  const existingGroups = await discourse.groups.get();

  const collectivesToCreate = colArr
    .filter(({ category: c }) => !existingCollectives.find(e => e.name === c.name))
    .map(({ category }) => category);

  const { toCreate: groupsToCreate, toUpdate: groupsToUpdate } = splitByProp('name', collectiveGroups, existingGroups);

  for (const group of groupsToCreate) {
    await sleepAsync();
    existingGroups.push(await discourse.groups.create(group));
  }

  for (const group of groupsToUpdate) {
    await sleepAsync();
    await discourse.groups.update(group);
  }

  for (const collective of collectivesToCreate) {
    await sleepAsync();
    existingCollectives.push(await discourse.categories.create(collective));
  }

  for (const existing of existingCollectives.filter(e => colArr.find(({ category }) => category.name === e.name))) {
    await sleepAsync();
    const fullExisting = await discourse.categories.get(existing.id);

    Object.assign(
      existing,
      fullExisting.group_permissions.reduce(
        (permissions, { permission_type, group_name }) => ({
          ...permissions,
          [`permissions[${group_name}]`]: permission_type,
        }),
        {},
      ),
    );

    const seed = colArr.find(c => c.category.name === existing.name);

    const flatCategory = discourse.utils.flattenObj(seed.category);

    const customFieldsToMap = ['location_enabled', 'location_topic_status', 'location_map_filter_closed'];
    const flatExisting = discourse.utils.mapObjKeys(k => (customFieldsToMap.includes(k) ? `custom_fields[${k}]` : k))(
      existing,
    );

    if (propsDiffer(flatCategory, flatExisting) || !discourse.categories.permissionsMatch(flatCategory, flatExisting)) {
      await sleepAsync();
      await discourse.categories.update(
        Object.assign(discourse.categories.stripPermissions(flatExisting), flatCategory),
      );
    }

    const aboutTopic = await discourse.categories.getAboutTopic(existing);
    if (aboutTopic.title !== seed.topic.title) {
      await sleepAsync();
      await discourse.topics.update(Object.assign(aboutTopic, seed.topic));
    }

    const topicPost = await discourse.posts.get(discourse.topics.getPostId(aboutTopic));
    if (topicPost.raw !== seed.post.raw) {
      await sleepAsync();
      await discourse.posts.update(Object.assign(topicPost, seed.post));
    }
  }
};
