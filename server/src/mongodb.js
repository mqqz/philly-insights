const { getCollection } = require('./logindb.js');

async function checkLogin(username, pass) {
  const usersCollection = await getCollection('users');
  const search = await usersCollection.find({ _id: username, password: pass }).toArray();
  return search;
}

module.exports = {
  checkLogin,
};
