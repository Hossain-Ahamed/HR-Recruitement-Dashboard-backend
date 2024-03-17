const { getCollection } = require('./mongoConnection.js');

// collection ==> candidate
const candidateCollection = getCollection('candidates');

module.exports = {
    candidateCollection,
};