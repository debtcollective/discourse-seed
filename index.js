const Promise = require('bluebird');
const { collectives, groups, tagGroups, customUserFields } = require('./seed');
const colArr = Object.keys(collectives).map(k => collectives[k]);
const {
  noNulls,
  getCollectiveAboutTopic,
  getCollectiveTopicPost,
  getExistingCollectives,
  getExistingGroups,
  getExistingTagGroups,
  getPost,
  getTopicFirstPost,
  createCollective,
  createGroup,
  createTagGroup,
  updateCollective,
  updatePost,
  updateTagGroup,
  updateTopic,
  getArbitraryUser,
  getCustomUserFields,
  createCustomUserField,
} = require('./api');

async function main() {
  const existingCollectives = await getExistingCollectives();
  const existingGroups = await getExistingGroups();
  const existingTagGroups = await getExistingTagGroups();
  const existingCustomUserFields = await getCustomUserFields();

  const collectivesToCreate = colArr.filter(({ collective }) => !existingCollectives.find(c => c.name === collective));
  const groupsToCreate = [...colArr.map(({ group }) => group), ...groups].filter(
    group => !existingGroups.find(g => g.name === group),
  );
  const tagGroupsToCreate = tagGroups.filter(({ name }) => !existingTagGroups.find(tg => tg.name === name));
  const tagGroupsToUpdate = tagGroups
    .filter(({ name }) => !tagGroupsToCreate.find(tg => tg.name === name))
    .reduce((acc, tg) => {
      const match = existingTagGroups.find(e => e.name === tg.name);
      if (tg.tag_names.every(n => match.tag_names.includes(n)) || tg.once_per_topic !== match.once_per_topic) {
        return [...acc, Object.assign(tg, { id: match.id })];
      } else {
        return acc;
      }
    }, []);
  const customUserFieldsToCreate = customUserFields.filter(
    ({ name }) => !existingCustomUserFields.map(field => field.name).includes(name),
  );

  for (const { collective } of collectivesToCreate) {
    existingCollectives.push(await createCollective(collective));
  }

  for (const group of groupsToCreate) {
    existingGroups.push(await createGroup(group));
  }

  for (const tg of tagGroupsToCreate) {
    existingTagGroups.push(await createTagGroup(tg));
  }

  for (const tg of tagGroupsToUpdate) {
    const updated = await updateTagGroup(tg);
    Object.assign(existingTagGroups.find(({ name }) => tg.name === name), tg);
  }

  for (const customUserField of customUserFieldsToCreate) {
    existingCustomUserFields.push(await createCustomUserField(customUserField));
  }

  for (const c of existingCollectives) {
    const { tag, description, collective: name } = colArr.find(({ collective }) => collective === c.name);
    const full = `${tag}  \n\n${description}`;
    const aboutTopic = await getCollectiveAboutTopic(c);
    const idealTitle = `About the ${name}`;
    if (aboutTopic.title !== idealTitle) {
      await updateTopic(aboutTopic, idealTitle);
    }
    const topicPost = await getTopicFirstPost(aboutTopic);
    if (topicPost.raw !== full) {
      await updatePost(topicPost.id, full);
    }
  }

  console.log(
    '✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨  DONE ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨',
  );
}

main().catch((...args) => {
  console.error(...args);
  process.exit(1);
});
