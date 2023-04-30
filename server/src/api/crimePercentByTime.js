const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//THIS IS QUERY 1
router.get('/', (req, res) => {
  const { startTime } = req.query;
  const { endTime } = req.query; 
  let query = '';
  if (!startTime || !endTime) {
    query = `SELECT COUNT(*) / (SELECT COUNT(*) FROM Incidents) * 100 AS Percentage
    FROM Incidents WHERE dispatch_time >= '20:00:00' AND dispatch_time <= '23:59:59'`
  } 
  else {
    query = `SELECT COUNT(*) / (SELECT COUNT(*) FROM Incidents) * 100 AS Percentage
    FROM Incidents WHERE dispatch_time BETWEEN ${startTime} AND ${endTime}`;
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