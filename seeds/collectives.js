const { collectives, subCategories } = require('../seed');
const { splitByProp, sleepAsync } = require('./utils');

const colArr = Object.keys(collectives).map(k => collectives[k]);
const collectiveGroups = colArr.map(c => c.group);

/**
 * Seeds the collectives
 * @param {discourseApi.DiscourseApi} discourse Discourse API instance
 */
module.exports = async discourse => {
  await sleepAsync();
  let existingCategories;
  existingCategories = await discourse.categories.getTopLevel();

  await sleepAsync();
  const existingGroups = await discourse.groups.get();

  const { toCreate: groupsToCreate, toUpdate: groupsToUpdate } = splitByProp('name', collectiveGroups, existingGroups);

  for (const group of groupsToCreate) {
    await sleepAsync();
    existingGroups.push(await discourse.groups.create(group));
  }

  for (const group of groupsToUpdate) {
    await sleepAsync();
    await discourse.groups.update(group);
  }

  for (const seedCollective of colArr) {
    await sleepAsync();
    await createOrUpdateCategory(seedCollective, existingCategories, seedCollective.group.name, discourse);
  }

  for (const seedCollective of colArr) {
    const existingCategory = existingCategories.find(cat => cat.name === seedCollective.category.name);

    const existingSubCategories = [];
    // find out which subcategories already exist
    if (existingCategory.has_children) {
      for (const subCategoryId of existingCategory.subcategory_ids) {
        await sleepAsync();
        existingSubCategories.push(await discourse.categories.get(subCategoryId));
      }
    }

    for (const subCategoryId of Object.keys(subCategories)) {
      const seedSubCategory = actualizeSubCategory(subCategories[subCategoryId], existingCategory);
      await createOrUpdateCategory(seedSubCategory, existingSubCategories, seedCollective.group.name, discourse);
    }
  }
};

const createOrUpdateCategory = async function(seed, existingCategories, groupName, discourse) {
  // if no category with that name exists, create it; otherwise, update it

  // give the corresponding group permissions, if necessary
  if (seed.correspondingGroupPermission !== undefined) {
    seed.category.permissions[groupName] = seed.correspondingGroupPermission;
  }
  delete seed.category.addCorrespondingGroupPermission;

  // names of categories at the top level or with the same parent are unique
  let existingCategory;
  existingCategory = existingCategories.find(existingCategory => existingCategory.name === seed.category.name);
  if (existingCategory === undefined) {
    // there is no matching existing category
    await sleepAsync();
    existingCategory = await discourse.categories.create(seed.category);
    existingCategories.push(existingCategory);
  } else {
    // this should be in seed? TODO
    const seedCustomFields = ['location_enabled', 'location_topic_status', 'location_map_filter_closed'];

    // ideally we would check to see if any of the properties need to be changed first, but the
    // discourse api has too many bugs to do it well
    // does this erase properties though?? TODO
    await sleepAsync();
    await discourse.categories.update(Object.assign(existingCategory, seed.category));
  }

  sleepAsync();
  const aboutTopic = await discourse.categories.getAboutTopic(existingCategory);
  if (aboutTopic.title !== seed.topic.title) {
    await sleepAsync();
    await discourse.topics.update(Object.assign(aboutTopic, seed.topic));
  }

  sleepAsync(2);
  const topicPost = await discourse.posts.get(discourse.topics.getPostId(aboutTopic));
  if (topicPost.raw !== seed.post.raw) {
    await sleepAsync();
    await discourse.posts.update(Object.assign(topicPost, seed.post));
  }

  return existingCategory.id;
};

const actualizeSubCategory = function(subCategory, superCategory) {
  // some of the values in the subcategories depend on the supercategory
  const replaceCollective = string => string.replace('COLLECTIVE', superCategory.name);

  const seedSubCategory = JSON.parse(JSON.stringify(subCategory)); // deepcopy

  seedSubCategory.category.parent_category_id = superCategory.id;
  seedSubCategory.topic.title = replaceCollective(seedSubCategory.topic.title);
  seedSubCategory.post.raw = replaceCollective(seedSubCategory.post.raw);
  seedSubCategory.category.name = replaceCollective(seedSubCategory.category.name);
  return seedSubCategory;
};
