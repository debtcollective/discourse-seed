const sa = require('superagent').agent();

const { api_key = '', api_username = 'system', api_url = 'http://localhost:3000' } = require('../secrets');

const specialUsernames = ['discobot', 'system'];

// get a user that's not discobot or somesuch
const getArbitraryUser = (exports.getArbitraryUser = () =>
  sa
    .get('http://localhost:3000/admin/users/list/active.json')
    .query({ api_key, api_username })
    .then(({ body }) => {
      const users = body.filter(user => !specialUsernames.includes(user.username));
      return users[0];
    }));

const getCustomUserFields = (exports.getCustomUserFields = () =>
  sa
    .get('http://localhost:3000/admin/customize/user_fields.json')
    .query({ api_key, api_username })
    .then(({ body: { user_fields } }) => user_fields));

const createCustomUserField = (exports.createCustomUserField = async user_field => {
  console.assert(['text', 'confirm', 'dropdown'].includes(user_field.field_type));

  let optionsString;
  if (user_field.field_type === 'dropdown') {
    // sending lists via http is finicky, so we'll do it in a second API call
    const httpify = (cumulative, option) => cumulative + '&user_field[options][]=' + option;
    optionsString = user_field.options.reduce(httpify, '') + '&api_key=' + api_key + '&api_username=' + api_username;
    optionsString = optionsString.slice(1); // get rid of the ampersand at the beginning
    delete user_field.options; // if we don't delete it, the first api call won't work
  }

  await sa
    .post('http://localhost:3000/admin/customize/user_fields')
    .type('form')
    .send({ api_key, api_username, user_field })
    .then(({ body }) => body);

  // if it isn't a dropdown, we're done! If it is ...
  if (user_field.field_type === 'dropdown') {
    const existingFields = await getCustomUserFields();
    // assumption: all user fields will have unique names
    const matchingFields = existingFields.filter(field => field.name === user_field.name);
    console.assert(
      matchingFields.length === 1,
      'There are ' + matchingFields.length + ' custom user fields with name ' + user_field.name,
    );

    // update the custom user field with the options
    await sa
      .put('http://localhost:3000/admin/customize/user_fields/' + matchingFields[0].id)
      .type('form')
      .send(optionsString);
  }
});
