
const {MongoMemoryServer} = require('mongodb-memory-server');
const {MongoClient} = require('mongodb');

let database = null;

//Starts the database in-memory database
async function startDatabase() {
    const mongo = await MongoMemoryServer.create();
    // const mongoDBURL = 'mongodb://localhost:27017';
     const mongoDBURL = mongo.getUri();
    const connection = await MongoClient.connect(mongoDBURL, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase() {
  if (!database) await startDatabase();
  return database;
}

module.exports = {
  getDatabase,
  startDatabase,
};
