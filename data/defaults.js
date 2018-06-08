const { enums: { visibility, permission } } = require('discourse-node-api');

const categoryDefaults = {
  color: 'FF4630',
  text_color: '2B2B2B',
};

const subCategoryDefaults = {
  ...categoryDefaults,
  custom_fields: {
    location_enabled: true,
    location_topic_status: true,
    location_map_filter_closed: true,
    events_enabled: true,
    events_agenda_enabled: true,
    events_calendar_enabled: true,
    events_min_trust_to_create: 1,
  },
};

const collectiveCategoryDefaults = {
  ...categoryDefaults,
  correspondingGroupPermission: permission.create_reply_see,
  permissions: {
    admins: permission.create_reply_see,
    trust_level_3: permission.create_reply_see,
    trust_level_4: permission.create_reply_see,
  },
};

const collectiveGroupDefaults = {
  mentionable_level: visibility.membersModsAndAdmins,
  messageable_level: visibility.membersModsAndAdmins,
  visibility_level: visibility.membersModsAndAdmins,
  primary_group: true,
  public_admission: false,
  allow_membership_requests: false,
  default_notification_level: 3,
};

module.exports = { collectiveGroupDefaults, collectiveCategoryDefaults, subCategoryDefaults };
