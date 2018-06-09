Module for seeding the Debt Syndicate's Discourse instances with Collectives, User Groups, Wikis and anything else we need to bend Discourse to our purposes.

## Guidance for contributors

If you need to make a new endpoint accessible in the discourse-node-api you may mask the request by using the `auth<METHOD>` functions exposed by the DiscourseApi instance until your PR in the [discourse-node-api](https://github.com/debtcollective/discourse-node-api) is merged and available for use.

Any unhandled error _will_ kill the script, so handle them early if you expect them.

Discourse API docs are [here](http://docs.discourse.org). The docs are kinda bad though, so the best thing to do is use Wireshark and sniff an API call after making it manually through the front-end and mimicking that through the Discourse API. Most endpoints work using the same exact route that the front-end uses. If it doesn't, try putting `.json` on the end of the route. More information about reverse-engineering the API [here](https://meta.discourse.org/t/how-to-reverse-engineer-the-discourse-api/20576). The main pain-point of the documentation is that almost _none_ of the interesting properties that are editable in a PUT or POST are documented, so the best thing to do really is to figure it out through reverse engineering and not waste your time with the documentation unless you're going to contribute to them (maybe once we have time we'll do that and make the Discourse API docs real nice to use).

Open a PR, get it reviewed and approved by a maintainer and once it is merged the CI will seed staging once a maintainer removes the CI hold. 🎊

## Secret Variables

This script requires a couple secrets to work.
Really only two of these is a secret but :woman_shrugging:.
These all have defaults in the script but you'll need to update the API key and the SSO secret.
See step 2, below.

## Steps for enabling in new Discourse environments

2.  Generate an API key for the system user (Admin Dashboard -> Users -> system -> generate API key)
3.  Copy `secrets.sample` to `secrets.<env>.js` and fill in the correct values.
4.  Upload the secrets file to tdc-secure S3 bucket ensuring public access is OFF. Only the CI policy will have access to this file.
5.  Create a job in the CI workflow for the environment, mirroring how the other environments have it. Note that `seed.sh` takes a single variable of the environment which should match the `<env>` part of the `secrets.<env>.js` from before
6.  Restrict that job to a specific branch.
7.  Push that branch and release the hold in Circle CI for that build.
8.  Success!
