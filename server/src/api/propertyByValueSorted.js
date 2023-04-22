const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');

router.get('/propertyByValueSorted', (req, res) => {
  let { ascending } = req.body;
  const { buildingType } = req.body;
  let { count } = req.body;

  if (ascending === undefined) {
    ascending = false;
  }

  if (count === undefined) {
    count = 10;
  }

  let buildingTypeLimit = '';
  if (buildingType) {
    buildingTypeLimit = ` WHERE building_code_description = ${buildingType} `;
  }

  const query = `SELECT * FROM Property ${buildingTypeLimit} ORDER BY market_value ${ascending ? 'ASC' : 'DESC'} LIMIT ${count}`;

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
