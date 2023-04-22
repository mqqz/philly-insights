const express = require('express');

const points = require('./points');
const property = require('./property');
const propertyByValueSorted = require('./propertyByValueSorted');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hey this is our API endpoint - 👋🌎🌍🌏',
  });
});

// add your routes here so they go to /api/points
router.use('/points', points);
router.use('/property', property);
router.use('/propertyByValueSorted', propertyByValueSorted);

module.exports = router;
