const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//THIS IS JUST A HELPFUL QUERY TO HAVE 
router.get('/', (req, res) => {
  const query = `SELECT * FROM Crime LIMIT 10`;

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