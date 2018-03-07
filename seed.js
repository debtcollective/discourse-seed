const tagGroups = [
  {
    name: 'Campaigns',
    tag_names: ['medicare-for-all'],
    once_per_topic: false,
  },
];
const groups = ['dispute-admin'];

const collectives = {
  forProfitCollective: {
    group: 'for-profit-colleges',
    collective: 'For Profit Colleges Collective',
    tag: 'For anyone who is in debt after attending a for-profit college.',
    description: `### We are former for-profit college students who have joined with others in our situation to fight back against predatory creditors and the federal government.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  studentDebtCollective: {
    group: 'student-debt',
    collective: 'Student Debt Collective',
    tag: 'For anyone who has student loans.',
    description: `### We are student debtors who have joined with others in our situation to fight back against predatory creditors and the federal government.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  creditDebtCollective: {
    group: 'credit-card-debt',
    collective: 'Credit Card Debt Collective',
    tag: 'For anyone who has credit card debt.',
    description: `### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  housingDebtCollective: {
    group: 'housing-debt',
    collective: 'Housing Debt Collective',
    tag: 'For anyone who went into debt for a place to live.',
    description: `### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  paydayLoansCollective: {
    group: 'payday-loans',
    collective: 'Payday Loans Collective',
    tag: 'For anybody in debt to a payday lender or check casher.',
    description: `### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  autoLoansCollective: {
    group: 'auto-loans',
    collective: 'Auto Loans Collective',
    tag: 'For anyone who went into debt to buy a car.',
    description: `### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  courtFinesCollective: {
    group: 'court-fines-fees',
    collective: 'Court Fines and Fees Collective',
    tag: 'For anyone who is in debt to a local court system or probation company.',
    description: `### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  medicalDebtCollective: {
    group: 'medical-debt',
    collective: 'Medical Debt Collective',
    tag: 'For anyone who went into debt for health care.',
    description: `### We are working together to plan actions, to develop debt resistance campaigns and to launch coordinated strikes.

We fight because it is wrong that 40 percent of people in debt use credit cards to cover basic living costs including rent, food, and utilities. It is wrong that 62 percent of personal bankruptcies in the U.S. are linked to medical debt. It is wrong that students are leaving college owing an average of $35,000, and millions are in default. It is wrong that payday lenders earn high profits from poverty. And it is wrong that local court systems target poor people, disproportionately black and brown, and load them up with debt.

We are different in many ways. Some of us are old, and some are young; we are from different parts of the country; we are diverse in race, ethnicity and religious background. A common belief unites us: everyone should have access to the goods and services they need to live without going broke or going into debt.

Debt has isolated us and made us feel alone and ashamed. We have come out of the shadows to fight back as individuals and as a collective. We are here because we are organizing to win debt relief and a better economic system for all.`,
  },
  solidarityBloc: {
    group: 'solidarity-bloc',
    collective: 'Solidarity Bloc',
    tag: 'For anyone organizing in solidarity with people in debt.',
    description: `We organize in solidarity with those who are struggling under the weight of indebtedness for simply trying to access basic needs like healthcare, education and housing.

We are committed to direct action, mutual aid and campaign support.`,
  },
};

const customUserFields = [
  {
    name: 'Debt Amount',
    description: 'A number greater than 0',
    field_type: 'text', // discourse's custom user fields doesn't have a "decimal" or "integer" option
  },
  {
    name: 'How Can You Help?',
    description: 'What can you do to help?',
    field_type: 'text',
  },
  {
    name: 'Employment',
    description: 'Give us an idea of where you work',
    field_type: 'text',
  },
  {
    name: 'Skills And Competencies',
    description: 'What are you good at?',
    field_type: 'text',
  },
  { name: 'Phone Number', description: '9 or 10 digits', field_type: 'text' },
];

module.exports = { collectives, tagGroups, groups, customUserFields };
