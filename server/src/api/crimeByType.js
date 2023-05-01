const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');
//THIS IS QUERY 5
router.get('/', (req, res) => {
  const query = `SELECT text_general_code AS crime_type, COUNT(*) AS crime_count
  FROM Crime
  WHERE text_general_code = 'Thefts' OR text_general_code = 'Embezzlement' OR        
         text_general_code = 'Fraud' OR text_general_code = 'Vandalism' OR text_general_code = 'DRIVING UNDER THE INFLUENCE'
  GROUP BY text_general_code
  ORDER BY COUNT(*) DESC

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