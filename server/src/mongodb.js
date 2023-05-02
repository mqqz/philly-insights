const { getCollection } = require('./logindb.js');

async function checkLogin(username, pass) {
  const usersCollection = await getCollection('users');
  const search = await usersCollection.find({ _id: username, password: pass }).toArray();
  return search;
}

async function checkUserExist(username) {
  const usersCollection = await getCollection('users');
  const search = await usersCollection.find({ _id: username }).toArray();
  if (search.length >= 1) {
    return true;
  }
  return false;
}

async function addUser(username, pass) {
  const usersCollection = await getCollection('users');
  const newUserObject = {
    _id: username,
    password: pass,
  };
  const insert = await usersCollection.insertOne(newUserObject);
  return insert;
}

module.exports = {
  checkLogin,
  checkUserExist,
  addUser,
};
