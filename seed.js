const { enums: { visibility, trust, permission } } = require('discourse-node-api');
const { strings } = require('./constants');

const collectiveGroupDefaults = {
  mentionable_level: visibility.membersModsAndAdmins,
  messageable_level: visibility.membersModsAndAdmins,
  visibility_level: visibility.membersModsAndAdmins,
  primary_group: true,
  public_admission: false,
  allow_membership_requests: false,
  default_notification_level: 3,
};

const categoryDefaults = {
  color: 'FF4630',
  text_color: '2B2B2B',
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

const eventsActionsCustomFields = {
  location_enabled: true,
  location_topic_status: true,
  location_map_filter_closed: true,
  events_enabled: true,
  events_agenda_enabled: true,
  events_calendar_enabled: true,
  events_min_trust_to_create: 1,
};

// Each collective will have each of the following subcategories (events, actions)
// String 'COLLECTIVE' is replaced with the name of each collective
const subCategories = {
  events: {
    correspondingGroupPermission: permission.create_reply_see,
    topic: { title: 'About COLLECTIVE Events' },
    post: { raw: strings.subCategories.events.post.raw },
    category: {
      ...categoryDefaults,
      name: 'COLLECTIVE Events',
      permissions: {
        admins: permission.create_reply_see,
      },
      custom_fields: eventsActionsCustomFields,
      topic_template: strings.subCategories.events.category.topic_template,
    },
  },
  actions: {
    topic: { title: 'About COLLECTIVE Actions' },
    post: { raw: 'Some ways for everyone to take action!' },
    category: {
      ...categoryDefaults,
      name: 'COLLECTIVE Actions',
      permissions: {
        admins: permission.create_reply_see,
        everyone: permission.reply_see,
      },
      custom_fields: eventsActionsCustomFields,
    },
  },
};

const collectives = {
  forProfitCollective: {
    group: {
      name: 'for-profit-colleges',
      full_name: 'For Profit Colleges Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the For Profit Colleges Collective',
    },
    post: { raw: strings.collectives.forProfitCollective.post.raw },
    category: {
      name: 'For Profit Colleges Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
  },
  studentDebtCollective: {
    group: {
      name: 'student-debt',
      full_name: 'Student Debt Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Student Debt Collective',
    },
    post: {
      raw: strings.collectives.studentDebtCollective.post.raw,
    },
    category: {
      name: 'Student Debt Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
  },
  creditDebtCollective: {
    group: {
      name: 'credit-card-debt',
      full_name: 'Credit Card Debt Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Credit Card Debt Collective',
    },
    post: {
      raw: strings.collectives.creditDebtCollective.post.raw,
    },
    category: {
      name: 'Credit Card Debt Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
  },
  housingDebtCollective: {
    group: {
      name: 'housing-debt',
      full_name: 'Housing Debt Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Housing Debt Collective',
    },
    post: {
      raw: strings.collectives.housingDebtCollective.post.raw,
    },
    category: {
      name: 'Housing Debt Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
  },
  paydayLoansCollective: {
    group: {
      name: 'payday-loans',
      full_name: 'Payday Loans Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Payday Loans Collective',
    },
    post: {
      raw: strings.collectives.paydayLoansCollective.post.raw,
    },
    category: {
      name: 'Payday Loans Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
  },
  autoLoansCollective: {
    group: {
      name: 'auto-loans',
      full_name: 'Auto Loans Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Auto Loans Collective',
    },
    post: {
      raw: strings.collectives.autoLoansCollective.post.raw,
    },
    category: {
      name: 'Auto Loans Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
  },
  courtFinesCollective: {
    category: {
      name: 'Court Fines and Fees Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
    group: {
      name: 'court-fines-fees',
      full_name: 'Court Fines and Fees Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Court Fines and Fees Collective',
    },
    post: {
      raw: strings.collectives.courtFinesCollective.post.raw,
    },
  },
  medicalDebtCollective: {
    group: {
      name: 'medical-debt',
      full_name: 'Medical Debt Collective',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Medical Debt Collective',
    },
    post: {
      raw: strings.collectives.medicalDebtCollective.post.raw,
    },
    category: {
      name: 'Medical Debt Collective',
      text_color: '',
      color: '',
      ...collectiveCategoryDefaults,
    },
  },
  solidarityBloc: {
    group: {
      name: 'solidarity-bloc',
      full_name: 'Solidarity Bloc',
      ...collectiveGroupDefaults,
    },
    topic: {
      title: 'About the Solidarity Bloc',
    },
    post: {
      raw: strings.collectives.solidarityBloc.post.raw,
    },
    category: {
      text_color: '',
      color: '',
      name: 'Solidarity Bloc',
      ...collectiveCategoryDefaults,
    },
  },
};

const customFieldPerCollective = Object.keys(collectives).map(key => {
  return {
    name: collectives[key].category.name,
    description: collectives[key].category.name,
    field_type: 'confirm',
    editable: true,
  };
});

module.exports = { collectives, tagGroups, groups, subCategories };
