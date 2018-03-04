const sa = require('superagent').agent();
const Promise = require('bluebird');
const { collectives, groups, tagGroups } = require('./seed');
const colArr = Object.keys(collectives).map(k => collectives[k]);

const {
  DISCOURSE_API_KEY: api_key = 'f6efc2b524eaeffa347d66444c0dd97ef1749703a97ad3b45913f52467fd683a',
  DISCOURSE_API_USERNAME: api_username = 'asdf',
  DISCOURSE_URL = 'http://localhost:3000',
} = process.env;

const noNulls = obj => {
  Object.keys(obj).forEach(k => {
    if (obj[k] === null || obj[k] === undefined) {
      delete obj[k];
    }
  });
  return obj;
};

const getExistingCollectives = () =>
  sa
    .get(DISCOURSE_URL + '/categories.json')
    .query({ api_key, api_username })
    .then(({ body: { category_list: { categories } } }) => {
      const categoryNames = Object.keys(collectives).map(k => collectives[k].collective);
      return categories.filter(c => categoryNames.includes(c.name));
    });

const getExistingGroups = () =>
  sa
    .get(DISCOURSE_URL + '/groups/search.json')
    .query({ api_key, api_username })
    .then(({ body: groups }) => groups);

const getExistingTagGroups = () =>
  sa
    .get(DISCOURSE_URL + '/tag_groups.json')
    .query({ api_key, api_username })
    .then(({ body: { tag_groups } }) => tag_groups);

const createCollective = (name, text_color = 'black', color = 'red') =>
  sa
    .post(DISCOURSE_URL + '/categories.json')
    .field({
      name,
      text_color,
      color,
      api_key,
      api_username,
    })
    .then(({ body: { category: collective } }) => collective)
    .catch(err => {});

const createGroup = name =>
  sa.post(DISCOURSE_URL + '/admin/groups').field({
    'group[name]': name,
    api_key,
    api_username,
  });

const updateCollective = collective =>
  sa
    .put(DISCOURSE_URL + '/categories/' + collective.id)
    .field(noNulls(collective))
    .then(({ body: { category } }) => category);

const updatePost = (id, raw) =>
  sa
    .put(DISCOURSE_URL + '/posts/' + id)
    .field({
      'post[raw]': raw,
      api_key,
      api_username,
    })
    .then(({ body }) => body);

const updateTopic = ({ slug, id }, title) =>
  sa
    .put(DISCOURSE_URL + '/t/' + slug + '/' + id + '.json')
    .field({
      title,
      api_key,
      api_username,
    })
    .then(({ body }) => body);

const updateTagGroup = ({ id, name, tag_names }) =>
  sa
    .put(DISCOURSE_URL + '/tag_groups/' + id + '.json')
    .field({ name, tag_names: JSON.stringify(tag_names), api_key, api_username });

const createTagGroup = ({ name, tag_names }) =>
  sa
    .post(DISCOURSE_URL + '/tag_groups.json')
    .field({ name, tag_names: JSON.stringify(tag_names), api_key, api_username })
    .then(({ body }) => {
      body;
      return body;
    });

const getPost = id => sa.get(DISCOURSE_URL + '/posts/' + id + '.json').then(({ body }) => body);
const getCollectiveTopicPost = collective => getCollectiveAboutTopic(collective).then(getTopicFirstPost);
const getTopicFirstPost = ({ post_stream: { posts: [{ id }] } }) => getPost(id);

const getCollectiveAboutTopic = collective =>
  sa.get(DISCOURSE_URL + '/t/' + collective.topic_url.split('/').slice(-1)[0] + '.json').then(({ body }) => body);

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

main().catch(console.error);
