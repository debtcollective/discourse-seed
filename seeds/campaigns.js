const { campaigns } = require('../data');

/**
 * Seeds the campaign tags (just `medicare-for-all` right now)
 * @param {discourseApi.DiscourseApi} discourse Discourse API instance
 */
module.exports = async discourse => {
  // campaigns are tags
  const existing = (await discourse.tags.getAll()).map(({ id }) => id);

  const toCreate = campaigns.filter(({ name }) => !existing.includes(name)).map(({ name }) => name);

  if (toCreate.length > 0) {
    // the only way to create a tag is to publish a topic that has that tag
    await discourse.posts.create({
      raw: 'the only way to create a tag is to publish or update a topic that has that tag',
      title: 'A Dummy Topic That Is Only Used For Creating Tag(s): ' + toCreate,
      unlist_topic: true, // makes it inaccessible except by a direct link
      tags: toCreate,
    });
  }
};
