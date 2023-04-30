const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//THIS IS QUERY 3
router.get('/', (req, res) => {
  const query = `SELECT EXTRACT(YEAR FROM dispatch_date) AS year, COUNT(*) AS crime_count
  FROM Crime
  GROUP BY year
  ORDER BY year DESC
  `;

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