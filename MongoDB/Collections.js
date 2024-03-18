const { getCollection } = require('./mongoConnection.js');

// collection ==> candidate
const candidateCollection = getCollection('candidates');

//collection ===> jobs

const jobCollection = getCollection('jobs');

module.exports = {
    candidateCollection,
    jobCollection
};