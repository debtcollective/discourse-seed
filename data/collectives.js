const { strings } = require('./constants');
const { collectiveGroupDefaults, collectiveCategoryDefaults } = require('./defaults');

const _collectives = [
  {
    group: { name: 'for-profit-colleges', full_name: 'For Profit Colleges Collective' },
    topic: { title: 'About the For Profit Colleges Collective' },
    post: { raw: strings.collectives.forProfitCollective.post.raw },
    category: { name: 'For Profit Colleges Collective' },
  },
  {
    group: { name: 'student-debt', full_name: 'Student Debt Collective' },
    topic: { title: 'About the Student Debt Collective' },
    post: { raw: strings.collectives.studentDebtCollective.post.raw },
    category: { name: 'Student Debt Collective' },
  },
  {
    group: { name: 'credit-card-debt', full_name: 'Credit Card Debt Collective' },
    topic: { title: 'About the Credit Card Debt Collective' },
    post: { raw: strings.collectives.creditDebtCollective.post.raw },
    category: { name: 'Credit Card Debt Collective' },
  },
  {
    group: { name: 'housing-debt', full_name: 'Housing Debt Collective' },
    topic: { title: 'About the Housing Debt Collective' },
    post: { raw: strings.collectives.housingDebtCollective.post.raw },
    category: { name: 'Housing Debt Collective' },
  },
  {
    group: { name: 'payday-loans', full_name: 'Payday Loans Collective' },
    topic: { title: 'About the Payday Loans Collective' },
    post: { raw: strings.collectives.paydayLoansCollective.post.raw },
    category: { name: 'Payday Loans Collective' },
  },
  {
    group: { name: 'auto-loans', full_name: 'Auto Loans Collective' },
    topic: { title: 'About the Auto Loans Collective' },
    post: { raw: strings.collectives.autoLoansCollective.post.raw },
    category: { name: 'Auto Loans Collective' },
  },
  {
    category: { name: 'Court Fines and Fees Collective' },
    group: { name: 'court-fines-fees', full_name: 'Court Fines and Fees Collective' },
    topic: { title: 'About the Court Fines and Fees Collective' },
    post: { raw: strings.collectives.courtFinesCollective.post.raw },
  },
  {
    group: { name: 'medical-debt', full_name: 'Medical Debt Collective' },
    topic: { title: 'About the Medical Debt Collective' },
    post: { raw: strings.collectives.medicalDebtCollective.post.raw },
    category: { name: 'Medical Debt Collective' },
  },
  {
    group: { name: 'solidarity-bloc', full_name: 'Solidarity Bloc' },
    topic: { title: 'About the Solidarity Bloc' },
    post: { raw: strings.collectives.solidarityBloc.post.raw },
    category: { name: 'Solidarity Bloc' },
  },
];

const collectives = _collectives.map(collective => {
  collective.group = Object.assign({}, collectiveGroupDefaults, collective.group);
  collective.collective = Object.assign({}, collectiveCategoryDefaults, collective.collective);
  return collective;
});

module.exports = { collectives };
