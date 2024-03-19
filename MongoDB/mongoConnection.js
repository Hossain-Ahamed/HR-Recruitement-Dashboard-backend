// mongoConnect.js

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@trial01.9ddajtx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

// Get the  collection
function getCollection(collectionName) {
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(collectionName);
    return collection;
}


module.exports = {
    connectToMongoDB,
    client,
    // getCollectionNames,
    getCollection, 
};
