const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');

router.get('/', (req, res) => {
  // We assume that if marketValue exists, it exists as a list of 2 values
  const { marketValue } = req.query;
  const { location } = req.query;
  const { buildingType } = req.query;

  let marketLimit = '';
  let locationLimit = '';
  let buildingTypeLimit = '';
  let query = '';

  let parsedMarketValue = [];
  if (marketValue) {
    parsedMarketValue = marketValue.split(',');
  }

  if (!parsedMarketValue[0] && !location && !buildingType) {
    query = 'SELECT * FROM Property LIMIT 1000';
  } else {
    marketLimit = (parsedMarketValue[0] !== 'undefined' && parsedMarketValue[0] !== undefined) ? ` market_value BETWEEN ${parsedMarketValue[0]} AND ${parsedMarketValue[1]} ` : '';
    locationLimit = location ? ` location LIKE '%${location}%' ` : '';
    buildingTypeLimit = buildingType ? ` building_code_description LIKE '%${buildingType}%' ` : '';
    const allLimits = [marketLimit, locationLimit, buildingTypeLimit].filter((x) => x !== '');
    query = `SELECT * FROM Property WHERE ${allLimits.join(' AND ')} LIMIT 1000`;
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, (err2, rows) => {
      connection.release(); // return the connection to pool
      if (err2) throw err2;
      // eslint-disable-next-line no-console
      console.log(rows.length);
      res.send(rows);
    });
  });
});

module.exports = router;
