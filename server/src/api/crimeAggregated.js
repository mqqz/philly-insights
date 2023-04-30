const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//THIS IS QUERY 6
router.get('/', (req, res) => {
  const query = `SELECT EXTRACT(MONTH FROM dispatch_date) AS month, EXTRACT(YEAR FROM dispatch_date) AS year, c.location_block, c.text_general_code, COUNT(*) AS num_crimes
  FROM Crime c
  JOIN Property p
  ON c.location_block = p.location
  GROUP BY month, year, c.location_block, c.text_general_code
  ORDER BY month ASC, year ASC, c.location_block ASC, c.text_general_code ASC;
  
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