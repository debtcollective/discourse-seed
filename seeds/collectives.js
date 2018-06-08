const { collectives, subCategories } = require('../data');
const { splitByProp } = require('./utils');

const collectiveGroups = collectives.map(c => c.group);

/**
 * Seeds the collectives
 * @param {discourseApi.DiscourseApi} discourse Discourse API instance
 */
module.exports = async discourse => {
  const existingCategories = await discourse.categories.getTopLevel();

  const existingGroups = await discourse.groups.get();

  const { toCreate: groupsToCreate, toUpdate: groupsToUpdate } = splitByProp('name', collectiveGroups, existingGroups);

  for (const group of groupsToCreate) {
    existingGroups.push(await discourse.groups.create(group));
  }

  for (const group of groupsToUpdate) {
    // https://github.com/debtcollective/parent/issues/142
    //    await discourse.groups.update(group);
  }

  for (const seedCollective of collectives) {
    existingCategory = await createOrUpdateCategory(
      seedCollective,
      existingCategories,
      seedCollective.group.name,
      discourse,
    );

    const existingSubCategories = [];
    // find out which subcategories already exist
    if (existingCategory.has_children) {
      for (const subCategoryId of existingCategory.subcategory_ids) {
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
  existingCategory = existingCategories.find(cat => cat.name === seed.category.name);
  if (existingCategory === undefined) {
    // there is no matching existing category
    existingCategory = await discourse.categories.create(seed.category);
  } else {
    // ideally we would check to see if any of the properties need to be changed first, but the
    // discourse api has too many bugs to do it well

    await discourse.categories.update(Object.assign(existingCategory, seed.category));
  }

  const aboutTopic = await discourse.categories.getAboutTopic(existingCategory);
  if (aboutTopic.title !== seed.topic.title) {
    await discourse.topics.update(Object.assign(aboutTopic, seed.topic));
  }

  const topicPost = await discourse.posts.get(discourse.topics.getPostId(aboutTopic));
  if (topicPost.raw !== seed.post.raw) {
    await discourse.posts.update(Object.assign(topicPost, seed.post));
  }

  return existingCategory;
};

const actualizeSubCategory = function(subCategory, superCategory) {
  // some of the values in the subcategories depend on the supercategory
  const replaceCollective = string => {
    console.assert(string !== undefined, 'undefined string in ' + subCategory.category.name);
    return string.replace('COLLECTIVE', superCategory.name);
  };

  const seedSubCategory = JSON.parse(JSON.stringify(subCategory)); // deepcopy

  seedSubCategory.category.parent_category_id = superCategory.id;

  seedSubCategory.topic.title = replaceCollective(seedSubCategory.topic.title);
  seedSubCategory.post.raw = replaceCollective(seedSubCategory.post.raw);
  seedSubCategory.category.name = replaceCollective(seedSubCategory.category.name);
  return seedSubCategory;
};
