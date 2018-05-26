const { enums: { visibility, trust } } = require('discourse-node-api');

// Discourse permissions constants
CREATE_REPLY_SEE = 1;
REPLY_SEE = 2;
SEE = 3;

const collectiveGroup = {
  mentionable_level: visibility.membersModsAndAdmins,
  messageable_level: visibility.membersModsAndAdmins,
  visbility_level: visibility.membersModsAndAdmins,
  primary_group: true,
  public_admission: false,
  allow_membership_requests: false,
  default_notification_level: 3,
};

const categoryDefaults = {
  color: 'FF4630',
  text_color: '2B2B2B',
};
const collectiveDefaults = {
  ...categoryDefaults,
  correspondingGroupPermission: CREATE_REPLY_SEE,
  permissions: {
    admins: CREATE_REPLY_SEE,
    trust_level_3: CREATE_REPLY_SEE,
    trust_level_4: CREATE_REPLY_SEE,
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
    visbility_level: visibility.everyone,
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
const subCategories = {
  events: {
    correspondingGroupPermission: CREATE_REPLY_SEE,
    topic: { title: 'About COLLECTIVE Events' },
    post: { raw: 'Events created for and by members of the COLLECTIVE' },
    category: {
      ...categoryDefaults,
      name: 'COLLECTIVE Events',
      permissions: {
        admins: CREATE_REPLY_SEE,
      },
      custom_fields: eventsActionsCustomFields,
    },
  },
  actions: {
    topic: { title: 'About COLLECTIVE Actions' },
    post: { raw: 'Some ways for everyone to take action!' },
    category: {
      ...categoryDefaults,
      name: 'COLLECTIVE Actions',
      permissions: {
        admins: CREATE_REPLY_SEE,
        everyone: REPLY_SEE,
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
      ...collectiveGroup,
    },
    topic: {
      title: 'About the For Profit Colleges Collective',
    },
    post: {
      raw: `For anyone who is in debt after attending a for-profit college.
    
### We are former for-profit college students who have joined with others in our situation to fight back against predatory creditors and the federal government.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
    category: {
      name: 'For Profit Colleges Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
  },
  studentDebtCollective: {
    group: {
      name: 'student-debt',
      full_name: 'Student Debt Collective',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Student Debt Collective',
    },
    post: {
      raw: `For anyone who has student loans.
    
### We are student debtors who have joined with others in our situation to fight back against predatory creditors and the federal government.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
    category: {
      name: 'Student Debt Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
  },
  creditDebtCollective: {
    group: {
      name: 'credit-card-debt',
      full_name: 'Credit Card Debt Collective',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Credit Card Debt Collective',
    },
    post: {
      raw: `For anyone who has credit card debt.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
    category: {
      name: 'Credit Card Debt Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
  },
  housingDebtCollective: {
    group: {
      name: 'housing-debt',
      full_name: 'Housing Debt Collective',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Housing Debt Collective',
    },
    post: {
      raw: `For anyone who went into debt for a place to live.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
    category: {
      name: 'Housing Debt Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
  },
  paydayLoansCollective: {
    group: {
      name: 'payday-loans',
      full_name: 'Payday Loans Collective',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Payday Loans Collective',
    },
    post: {
      raw: `For anybody in debt to a payday lender or check casher.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
    category: {
      name: 'Payday Loans Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
  },
  autoLoansCollective: {
    group: {
      name: 'auto-loans',
      full_name: 'Auto Loans Collective',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Auto Loans Collective',
    },
    post: {
      raw: `For anyone who went into debt to buy a car.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.
  
We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
    category: {
      name: 'Auto Loans Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
  },
  courtFinesCollective: {
    category: {
      name: 'Court Fines and Fees Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
    group: {
      name: 'court-fines-fees',
      full_name: 'Court Fines and Fees Collective',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Court Fines and Fees Collective',
    },
    post: {
      raw: `For anyone who is in debt to a local court system or probation company.
    
### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
  },
  medicalDebtCollective: {
    group: {
      name: 'medical-debt',
      full_name: 'Medical Debt Collective',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Medical Debt Collective',
    },
    post: {
      raw: `For anyone who went into debt for health care.

### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
    },
    category: {
      name: 'Medical Debt Collective',
      text_color: '',
      color: '',
      ...collectiveDefaults,
    },
  },
  solidarityBloc: {
    group: {
      name: 'solidarity-bloc',
      full_name: 'Solidarity Bloc',
      ...collectiveGroup,
    },
    topic: {
      title: 'About the Solidarity Bloc',
    },
    post: {
      raw: `For anyone organizing in solidarity with people in debt.

We organize in solidarity with those who are struggling under the weight of indebtedness for simply trying to access basic needs like healthcare, education and housing.

We are committed to direct action, mutual aid and campaign support.`,
    },
    category: {
      text_color: '',
      color: '',
      name: 'Solidarity Bloc',
      ...collectiveDefaults,
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
