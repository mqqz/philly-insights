

const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');

router.get('/', (req, res) => {
  const query = `SELECT EXTRACT(MONTH FROM dispatch_date) AS month, EXTRACT(YEAR FROM dispatch_date) AS year, COUNT(*) AS num_crimes
  FROM Incidents
  GROUP BY month, year
  ORDER BY month, year
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