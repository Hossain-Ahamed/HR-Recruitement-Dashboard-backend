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

// async function getCollectionNames() {
//     try {
//         const db = client.db(process.env.DB_NAME);
//         const collections = await db.listCollections().toArray();
//         const collectionNames = collections.map((collection) => collection.name);
//         return collectionNames;
//     } catch (error) {
//         console.error('Error fetching collection names from MongoDB:', error);
//         return [];
//     }
// }

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
