This is a simple script. Let's keep it that way. Put API calls in `api.js` and require them into the main `index.js` script. Seed data should go in `seed.js` and be organized in a logical manner.

Something to keep in mind when adding anything here is that you should always check to make sure the resource you're creating doesn't already exist, otherwise we'll end up with a tangled mess to untie in the first environment we deploy the new version against. You can see this strategy already happening by calling to get all the categories first, then filtering the collectives that are already created.

Discourse API docs are [here](docs.discourse.org).

## Secret Variables

This script requires a couple secrets to work. Really only one of these is a secret but :woman-shrugging:. These all have defaults in the script but you'll need to update the API key.

Create a `secrets.js` file that looks like this:

```javascript
module.exports = {
  // This key is generated in the Discourse admin dashboard under the API tab
  api_key: '',
  // System is a default hidden user that's useful for stuff like this that we
  // don't necessarily want to attribute to any specific user
  api_username: 'system',
  // Discourse's location
  api_url: 'http://localhost:3000',
};
```
