This is a simple script. Let's keep it that way. Put API calls in `api.js` and require them into the main `index.js` script. Seed data should go in `seed.js` and be organized in a logical manner.

Something to keep in mind when adding anything here is that you should always check to make sure the resource you're creating doesn't already exist, otherwise we'll end up with a tangled mess to untie in the first environment we deploy the new version against. You can see this strategy already happening by calling to get all the categories first, then filtering the collectives that are already created.

Discourse API docs are [here](docs.discourse.org).

## Environment Variables

This script requires a couple environment variables to work. These all have defaults in the script but they'll only work locally, and even then you'll need to update the API key and user at least.

* `DISCOURSE_API_KEY`:
  This key is generated in the Admin dashboard. The key in there is a bogus one so it won't work anywhere.
* `DISCOURSE_API_USERNAME`:
  Discourse username of the person who owns the key. If you make a topic or post or anything like that, it's going to say that the person with this username made it.
* `DISCOURSE_URL`:
  The URL of the Discourse instance. Defaults to the default local URL, localhost:3000
