const express = require('express');

const router = express.Router();

// get the database connection pool
const pool = require('../db');

// GET /api/points(crime=...)
router.get('/', (req, res) => {
    // build the query
    query = `SELECT lng, lat FROM Incidents
    ${req.query.crime ? `WHERE text_general_code = '${req.query.crime}'` : ''}
    LIMIT 10`;

    // get a connection from the pool and execute the query
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, (err, rows) => {
            connection.release(); // return the connection to pool
            if (err) throw err;
            res.send(rows);
        });
    });
});


module.exports = router;