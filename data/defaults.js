const { enums: { visibility, permission, notification, trust } } = require('discourse-node-api');
const categoryDefaults = { color: 'FF4630', text_color: '2B2B2B' };
const subCategoryDefaults = {
  ...categoryDefaults,
  custom_fields: {
    location_enabled: true,
    location_topic_status: true,
    location_map_filter_closed: true,
    events_enabled: true,
    events_agenda_enabled: true,
    events_calendar_enabled: true,
    events_min_trust_to_create: trust.basic,
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
const groupDefaults = {
  mentionable_level: visibility.everyone,
  messageable_level: visibility.everyone,
  visibility_level: visibility.everyone,
  primary_group: true,
  public_admission: false,
  allow_membership_requests: false,
  default_notification_level: notification.watching,
};
const collectiveGroupDefaults = {
  ...groupDefaults,
  mentionable_level: visibility.membersModsAndAdmins,
  messageable_level: visibility.membersModsAndAdmins,
  visibility_level: visibility.membersModsAndAdmins,
};
module.exports = { collectiveGroupDefaults, collectiveCategoryDefaults, subCategoryDefaults, groupDefaults };
