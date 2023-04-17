const express = require('express');

const router = express.Router();

const pool = require('../db');

router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    connection.query('SELECT lng, lat FROM Incidents LIMIT 10', (err, rows) => {
      connection.release(); // return the connection to pool
      if (err) throw err;
      res.send(rows);
    });
  });
});


module.exports = router;