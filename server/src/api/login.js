const crypto = require('crypto');
const express = require('express');

const router = express.Router();
const checkLogin = require('../mongodb.js');

function hashPassword(inputString) {
  const hash = crypto.createHash('sha256');
  hash.update(inputString, 'utf8');
  const hashedString = hash.digest('hex');
  return hashedString;
}

router.get('/', (req, res) => {
  const { username, password } = req.query;
  if (!password || !username) {
    res.status(400).send('Missing username or password');
  } else {
    const hashedPassword = hashPassword(password);
    try {
      checkLogin.checkLogin(username, hashedPassword).then((response) => {
        if (response.length > 0) {
          res.status(200).send('Login successful');
        } else {
          res.status(401).send('Invalid username or password');
        }
      });
    } catch (err) {
      res.status(500).send('Error logging in');
    }
  }
});

module.exports = router;
