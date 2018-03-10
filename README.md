This is a simple script. Let's keep it that way. Put API calls in `api.js` and require them into the main `index.js` script. Seed data should go in `seed.js` and be organized in a logical manner.

Something to keep in mind when adding anything here is that you should always check to make sure the resource you're creating doesn't already exist, otherwise we'll end up with a tangled mess to untie in the first environment we deploy the new version against. You can see this strategy already happening by calling to get all the categories first, then filtering the collectives that are already created.

Discourse API docs are [here](http://docs.discourse.org).

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

