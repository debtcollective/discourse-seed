const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000' } = require('./secrets');

/**
 * @type {discourseApi.DiscourseApi}
 */
const discourse = require('discourse-node-api')({
  api_key,
  api_username,
  api_url,
  useRateLimiter: true,
  sleepSeconds: 1,
});

async function main() {
  await discourse.admin.settings.enableTags(true);

  await require('./seeds/collectives')(discourse);
  await require('./seeds/tagGroups')(discourse);
  await require('./seeds/groups')(discourse);

  console.log(
    '✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨  DONE ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨ ✨',
  );
}

main().catch((...args) => {
  console.error(...args);
  process.exit(1);
});
