const express = require('express');

const points = require('./points');
const property = require('./property');
const propertyByValueSorted = require('./propertyByValueSorted');
const crimePercentByTime = require('./crimePercentByTime');
const crimePerYear = require('./crimePerYear');
const crimeByType = require('./crimeByType');
const crimeAggregated = require('./crimeAggregated');

const allCrimes = require('./allCrimes');

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
router.use('/crimePercentByTime', crimePercentByTime);
router.use('/crimePerYear', crimePerYear);
router.use('/crimeByType', crimeByType);
router.use('/crimeAggregated', crimeAggregated);

router.use('/allCrimes', allCrimes);

module.exports = router;
