const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');

// GET /api/blocks
router.get('/', (req, res) => {
  // build the query
  let pageSize = req.query.per_page || 10;
  let page = req.query.page || 1;
  const query = `SELECT location_block, count(*) as crime_count, AVG(market_value) as avg_value
  FROM Crime JOIN Property on location_block = location
  GROUP BY location_block
  LIMIT ${pageSize} OFFSET ${pageSize * page};`

  // get a connection from the pool and execute the query
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
