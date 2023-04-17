const express = require('express');

const points = require('./points');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/points', points);

module.exports = router;
