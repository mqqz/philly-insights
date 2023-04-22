const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');

router.get('/property', (req, res) => {
  // We assume that if marketValue exists, it exists as a list of 2 values
  const { marketValue } = req.body;
  const { location } = req.body;
  const { buildingType } = req.body;

  let marketLimit = '';
  let locationLimit = '';
  let buildingTypeLimit = '';
  let query = '';

  if (!marketValue && !location && !buildingType) {
    query = 'SELECT * FROM Property';
  } else {
    marketLimit = marketValue ? ` market_value BETWEEN ${marketValue[0]} AND ${marketValue[1]} ` : '';
    locationLimit = location ? ` location = '${location}' ` : '';
    buildingTypeLimit = buildingType ? ` building_code_description = '${buildingType}' ` : '';
    const allLimits = [marketLimit, locationLimit, buildingTypeLimit].filter((x) => x !== '');
    query = `SELECT * FROM Property WHERE ${allLimits.join(' AND ')}`;
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, (err2, rows) => {
      connection.release(); // return the connection to pool
      if (err2) throw err2;
      res.send(rows);
    });
  });
});

module.exports = router;
