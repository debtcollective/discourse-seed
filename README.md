Module for seeding the Debt Syndicate's Discourse instances with Collectives, User Groups, Wikis and anything else we need to bend Discourse to our purposes.

## Guidance for contributors

There is currently a clear separation between the discourse API code and the code that actually does the seeding.
Each logical grouping of seeds should go in their own file in the `seeds` folder and export a single `async` function. This function should get called in `index.js` in the `main` function, like the existing seed modules are currently being called.

Require in the discourse API from the discourse folder. Do not use super agent to call the API directly. The API utilities automatically handle authentication and the various quirks of Discourse's REST API like making sure the models passed in do not result in a 400 request because you passed a JSON object to a POST's field or dealing with the odd request where you have to pass the properties as properties of some other entity (like `posts` or the permissions on a category). If you are adding to the Discourse API, note that you should continue to maintain that guarantee. If you find that making a request in a certain way will break the API, _prevent that from being done in the API method_. We've attempted to maintain a separation between Discourse's data model and our own. To maintain this, try not to reference Debt Syndicate specific stuff in the Discourse API. Eventually we can move the Discourse API to a publishable NPM module, but for now it's not comprehensive enough and would need a lot more documentation and testing before being released generally.

Always sleep before making an API call. Three quarters of a second is the default length of time and it seems strike the right balance between speed and infrequency to prevent Discourse's API from rate limiting you. This isn't built into the API because well, maybe you want to get rate limited, who knows. Just know that it's preventable by sleeping before making the call.

Any unhandled error _will_ kill the script, so handle them early if you expect them.

Discourse API docs are [here](http://docs.discourse.org). The docs are kinda bad though, so the best thing to do is use Wireshark and sniff an API call after making it manually through the front-end and mimicking that through the Discourse API. Most endpoints work using the same exact route that the front-end uses. If it doesn't, try putting `.json` on the end of the route. More information about reverse-engineering the API [here](https://meta.discourse.org/t/how-to-reverse-engineer-the-discourse-api/20576). The main pain-point of the documentation is that almost _none_ of the interesting properties that are editable in a PUT or POST are documented, so the best thing to do really is to figure it out through reverse engineering and not waste your time with the documentation unless you're going to contribute to them (maybe once we have time we'll do that and make the Discourse API docs real nice to use).

Open a PR, get it reviewed and approved by a maintainer and once it is merged the CI will seed staging once a maintainer removes the CI hold. 🎊

## Secret Variables

This script requires a couple secrets to work. Really only one of these is a secret but :woman_shrugging:. These all have defaults in the script but you'll need to update the API key.

If you start getting an access denied error during the `tag_group` creation, make sure your Discourse instance has tagging enabled otherwise it'll block you! [Evidence of that is here.](https://github.com/discourse/discourse/blob/a94dc0c7311f744bb8d5801787b0a1a5df0f036b/lib/guardian/tag_guardian.rb#L19).

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

## Steps for enabling in new Discourse environments

1.  Enable tagging in Discourse (Admin Dashboard -> Settings -> Tags -> enable topic tags)
2.  Generate an API key for the system user (Admin Dashboard -> Users -> system -> generate API key)
3.  Create a `secrets.<env>.js` as described above
4.  Upload the secrets file to tdc-secure S3 bucket ensuring public access is OFF. Only the CI policy will have access to this file.
5.  Create a job in the CI workflow for the environment, mirroring how the other environments have it. Note that `seed.sh` takes a single variable of the environment which should match the `<env>` part of the `secrets.<env>.js` from before
6.  Restrict that job to a specific branch.
7.  Push that branch and release the hold in Circle CI for that build.
8.  Success!
