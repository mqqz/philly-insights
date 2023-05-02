const crypto = require('crypto');
const express = require('express');

const router = express.Router();
const dbcalls = require('../mongodb.js');

function hashPassword(inputString) {
  const hash = crypto.createHash('sha256');
  hash.update(inputString, 'utf8');
  const hashedString = hash.digest('hex');
  return hashedString;
}

router.post('/', (req, res) => {
  const { username, password } = req.query;
  if (!password || !username) {
    res.status(400).send('Missing username or password');
  } else {
    const hashedPassword = hashPassword(password);
    try {
      dbcalls.checkUserExist(username).then((response) => {
        if (!response) {
          dbcalls.addUser(username, hashedPassword).then(() => {
            res.status(200).send('User registered successful');
          }).catch(() => { res.status(500).send('Error registering user'); });
        } else {
          res.status(401).send('Username taken');
        }
      });
    } catch (err) {
      res.status(500).send('Error logging in');
    }
  }
});

module.exports = router;
