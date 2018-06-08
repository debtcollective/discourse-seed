const { _collectives } = require('./collectives');
const { enums: { visibility, trust, permission } } = require('discourse-node-api');
const { collectiveGroupDefaults, collectiveCategoryDefaults, subCategoryDefaults } = require('./defaults');
const { strings } = require('./constants');

const tagGroups = [
  {
    name: 'Campaigns',
    tag_names: ['medicare-for-all'],
    one_per_topic: false,
  },
];

const groups = [
  {
    name: 'dispute-admin',
    full_name: 'Dispute Administrator',
    mentionable_level: visibility.everyone,
    messageable_level: visibility.everyone,
    visibility_level: visibility.everyone,
    grant_trust_level: trust.platformAdmin,
    primary_group: true,
    public_admission: false,
    allow_membership_requests: false,
    default_notification_level: 3,
  },
];

// Each collective will have each of the following subcategories (events, actions)
// String 'COLLECTIVE' is replaced with the name of each collective
const _subCategories = [
  {
    correspondingGroupPermission: permission.create_reply_see,
    topic: { title: 'About COLLECTIVE Events' },
    post: { raw: strings.subCategories.events.post.raw },
    category: {
      name: 'COLLECTIVE Events',
      permissions: {
        admins: permission.create_reply_see,
      },
      topic_template: strings.subCategories.events.category.topic_template,
    },
  },
  {
    topic: { title: 'About COLLECTIVE Actions' },
    post: { raw: 'Some ways for everyone to take action!' },
    category: {
      name: 'COLLECTIVE Actions',
      permissions: {
        admins: permission.create_reply_see,
        everyone: permission.reply_see,
      },
    },
  },
];

// apply defaults
const subCategories = _subCategories.map(s => {
  s.category = Object.assign(subCategoryDefaults, s.category);
  return s;
});

const collectives = _collectives.map(collective => {
  collective.group = Object.assign(collectiveGroupDefaults, collective.group);
  collective.collective = Object.assign(collectiveCategoryDefaults, collective.collective);
  return collective;
});

module.exports = { collectives, tagGroups, groups, subCategories };
