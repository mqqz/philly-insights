const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//THIS IS QUERY 8
// GET /api/points(crime=...)
router.get('/', (req, res) => {
  let pageSize = req.query.per_page || 10;
  let page = req.query.page || 1;
  // build the query
  const query = `SELECT cvc.location_block, cvc.text_general_code, cvc.crime_count, cvc.avg_value, cvc.crime_value_ratio
  FROM (
    SELECT c.location_block, c.text_general_code, COUNT(c.dc_key) AS crime_count, AVG(p.market_value) AS avg_value,
    (COUNT(c.dc_key) / AVG(p.market_value)) AS crime_value_ratio
    FROM Crime c INNER JOIN Property p ON c.location_block = p.location WHERE EXTRACT(YEAR FROM c.dispatch_date) = 2015
    GROUP BY c.location_block, c.text_general_code
  ) cvc
  INNER JOIN (
    SELECT text_general_code, MAX(crime_value_ratio) AS max_ratio
    FROM (
      SELECT c.text_general_code, (COUNT(c.dc_key) / AVG(p.market_value)) AS crime_value_ratio
      FROM Crime c INNER JOIN Property p ON c.location_block = p.location WHERE EXTRACT(YEAR FROM c.dispatch_date) = 2015
      GROUP BY c.location_block, c.text_general_code
    ) t
    GROUP BY text_general_code
  ) m ON cvc.text_general_code = m.text_general_code AND cvc.crime_value_ratio = m.max_ratio ORDER BY cvc.crime_value_ratio DESC
  LIMIT ${pageSize} OFFSET ${pageSize * page}`

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