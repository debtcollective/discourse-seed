const Promise = require('bluebird');
const { collectives, groups, tagGroups } = require('./seed');
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
} = require('./api');

async function main() {
  const existingCollectives = await getExistingCollectives();
  const existingGroups = await getExistingGroups();
  const existingTagGroups = await getExistingTagGroups();

  const collectivesToCreate = colArr.filter(({ collective }) => !existingCollectives.find(c => c.name === collective));
  const groupsToCreate = [...colArr.map(({ group }) => group), ...groups].filter(
    group => !existingGroups.find(g => g.name === group),
  );
  const tagGroupsToCreate = tagGroups.filter(({ name }) => !existingTagGroups.find(tg => tg.name === name));
  const tagGroupsToUpdate = tagGroups
    .filter(
      ({ name, tag_names }) =>
        !existingTagGroups.find(tg => tg.name === name && tag_names.every(n => tg.tag_names.includes(n))),
    )
    .map(tg => Object.assign(tg, { id: existingTagGroups.find(e => e.name === tg.name).id }));

  await Promise.all([
    Promise.all(
      collectivesToCreate.map(async ({ collective }) => {
        existingCollectives.push(await createCollective(collective));
      }),
    ),
    Promise.all(
      groupsToCreate.map(async group => {
        existingGroups.push(await createGroup(group));
      }),
    ),
    Promise.all(
      tagGroupsToCreate.map(async tg => {
        existingTagGroups.push(await createTagGroup(tg));
      }),
    ),
    Promise.all(
      tagGroupsToUpdate.map(async tg => {
        const updated = await updateTagGroup(tg);
        Object.assign(existingTagGroups.find(({ name }) => tg.name === name), tg);
      }),
    ),
  ]);

  const re = await Promise.all(
    existingCollectives.map(async c => {
      const { tag, description, collective: name } = colArr.find(({ collective }) => collective === c.name);
      const full = `${tag}  \n\n${description}`;
      const aboutTopic = await getCollectiveAboutTopic(c);
      const idealTitle = `About the ${name}`;
      if (aboutTopic.title !== idealTitle) {
        await updateTopic(aboutTopic, idealTitle);
      }
      const topicPost = await getTopicFirstPost(aboutTopic);
      return topicPost.raw !== full ? updatePost(topicPost.id, full) : Promise.resolve();
    }),
  );
  console.log(
    '✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨  DONE ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨',
  );
}

main().catch((...args) => {
  console.error(...args);
  process.exit(1);
});
