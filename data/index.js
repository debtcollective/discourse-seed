const { enums: { visibility, trust, permission, notification } } = require('discourse-node-api');
const { subCategoryDefaults } = require('./defaults');
const { strings } = require('./constants');
const { campaigns } = require('./campaigns');

const tagGroups = [{ name: 'Campaigns', tag_names: campaigns.map(c => c.name), one_per_topic: false }];

// Each collective will have each of the following subcategories (events, actions)
// String 'COLLECTIVE' is replaced with the name of each collective
const _subCategories = [
  {
    correspondingGroupPermission: permission.create_reply_see,
    topic: { title: 'About COLLECTIVE Events' },
    post: { raw: strings.subCategories.events.post.raw },
    category: {
      name: 'COLLECTIVE Events',
      permissions: { admins: permission.create_reply_see },
      topic_template: strings.subCategories.events.category.topic_template,
    },
  },
  {
    topic: { title: 'About COLLECTIVE Actions' },
    post: { raw: 'Some ways for everyone to take action!' },
    category: {
      name: 'COLLECTIVE Actions',
      permissions: { admins: permission.create_reply_see, everyone: permission.reply_see },
    },
  },
];

// apply defaults
const subCategories = _subCategories.map(s => {
  s.category = Object.assign({}, subCategoryDefaults, s.category);
  return s;
});

module.exports = { ...require('./groups'), ...require('./collectives'), tagGroups, subCategories, campaigns };
