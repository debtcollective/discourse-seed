const { collectives } = require('./collectives.js');
const { campaigns } = require('./campaigns.js');
const { groupDefaults } = require('./defaults.js');
const { enums: { trust } } = require('discourse-node-api');

const miscGroups = [{ name: 'dispute-admin', full_name: 'Dispute Administrator', grant_trust_level: trust.leader }];

const makeCGroup = function makeCGroup(name, full_name) {
  // "C" stands for either "collective" or "campaign"
  if (name.length > 11) {
    // group names longer than 20 characters aren't allowed
    name = name
      .split('-')
      .map(word => word[0])
      .join('');
    console.assert(name.length <= 11);
  }
  return { name: name + '-moderator', full_name: full_name + ' Moderator', grant_trust_level: trust.leader };
};

// moderator groups for each collective
const collectiveModeratorGroups = collectives.map(({ group }) => makeCGroup(group.name, group.full_name));

// moderator groups for each campaign
const campaignModeratorGroups = campaigns.map(campaign => makeCGroup(campaign.name, campaign.full_name));

const _groups = [...miscGroups, ...collectiveModeratorGroups, ...campaignModeratorGroups];

// apply defaults
const groups = _groups.map(group => Object.assign({}, groupDefaults, group));

module.exports = { groups };
