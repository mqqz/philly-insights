const { MongoClient } = require('mongodb');

const password = process.ENV.mongopassword;

const uri = `mongodb+srv://lumich:${password}@randomcluster.5ni2aah.mongodb.net/finalproject`;
const client = new MongoClient(uri);

let db;

async function connect() {
  await client.connect();
  db = client.db('finalproject');
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
}

async function getCollection(collectionName) {
  if (!db) {
    throw new Error('Database connection not established');
  }
  return db.collection(collectionName);
}

module.exports = {
  connect,
  getCollection,
};
