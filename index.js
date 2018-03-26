const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000' } = require('./secrets');

const discourse = require('discourse-node-api')({ api_key, api_username, api_url });

async function main() {
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
