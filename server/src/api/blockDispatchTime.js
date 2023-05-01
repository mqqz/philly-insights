const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//QUERY 9 MODIFIED TO GET AVG RESPONSE TIME FOR EACH CRIME TYPE PER BLOCK (not taking into account building type)
// GET /api/blockDispatchTime
router.get('/', (req, res) => {
  // build the query
  let pageSize = req.query.per_page || 10;
  let page = req.query.page || 1;
  const query = `SELECT DISTINCT cvt.location_block, cvt.text_general_code, cvt.avg_dispatch_time
  FROM (
    SELECT c.location_block, c.text_general_code, p.building_code_description, AVG(c.dispatch_time) AS avg_dispatch_time
    FROM Crime c JOIN Property p ON c.location_block = p.location WHERE EXTRACT(YEAR FROM c.dispatch_date) = 2015
    GROUP BY c.location_block, c.text_general_code, p.building_code_description
  ) cvt
  JOIN (
    SELECT text_general_code, building_code_description, MIN(avg_dispatch_time) AS min_time
    FROM (
      SELECT c.text_general_code, p.building_code_description, AVG(c.dispatch_time) AS avg_dispatch_time
      FROM Crime c JOIN Property p ON c.location_block = p.location WHERE EXTRACT(YEAR FROM c.dispatch_date) = 2015
      GROUP BY c.location_block, c.text_general_code, p.building_code_description
    ) t
    GROUP BY text_general_code
  ) m ON cvt.text_general_code = m.text_general_code WHERE NOT avg_dispatch_time = 0
  ORDER BY avg_dispatch_time DESC`

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