const collective = require('./collective');
const campaign = require('./campaign');
const topic = require('./topic');
const user = require('./user');

module.exports = Object.assign(collective, campaign, topic, user);
