const {getDatabase} = require('./mongo');
const {ObjectID} = require('mongodb');

//name of the database
const collectionName = 'users';

//adds user to the database
async function insertUser(userId) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(userId);
  return insertedId;
}


//pulls all of the users stored in the database
async function getUsers() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}



module.exports = {
  insertUser,
  getUsers,
  
};
