const { collectives, groups, tagGroups, customUserFields } = require('./seed');
const colArr = Object.keys(collectives).map(k => collectives[k]);
const { collective, campaign, topic } = require('./api');

async function main() {
  console.log('Beginning seed');
  const existingCollectives = await collective.getExistingCollectives();
  const existingGroups = await collective.getExistingGroups();
  const existingTagGroups = await campaign.getExistingTagGroups();

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

  for (const { collective } of collectivesToCreate) {
    existingCollectives.push(await collective.createCollective(collective));
  }

  for (const group of groupsToCreate) {
    existingGroups.push(await collective.createGroup(group));
  }

  for (const tg of tagGroupsToCreate) {
    existingTagGroups.push(await campaign.createTagGroup(tg));
  }

  for (const tg of tagGroupsToUpdate) {
    const updated = await campaign.updateTagGroup(tg);
    Object.assign(existingTagGroups.find(({ name }) => tg.name === name), tg);
  }

  for (const c of existingCollectives) {
    const { tag, description, collective: name } = colArr.find(({ collective }) => collective === c.name);
    const full = `${tag}  \n\n${description}`;
    const aboutTopic = await collective.getCollectiveAboutTopic(c);
    const idealTitle = `About the ${name}`;
    if (aboutTopic.title !== idealTitle) {
      await campaign.updateTopic(aboutTopic, idealTitle);
    }
    const topicPost = await topic.getTopicFirstPost(aboutTopic);
    if (topicPost.raw !== full) {
      await topic.updatePost(topicPost.id, full);
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
