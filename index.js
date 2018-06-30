const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000', ssoSecret } = require('./secrets');

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
  if (api_key === '') {
    throw Error('No API key specified. See README.');
  }

  await discourse.admin.settings.enableTags(true);
  await discourse.admin.settings.enableSsoProvider(true);
  await discourse.admin.settings.setSsoSecret(ssoSecret);

  await require('./seeds/collectives')(discourse);
  await require('./seeds/campaigns')(discourse); // must be before tagGroups
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
