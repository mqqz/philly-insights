// create mysql connection pool
const mysql = require('mysql');

/*
  this is the connection pool to the database
  it will be used by all the routes
  basically its a list of connections to the database
  that are ready to be used because opening a connection is expensive
  see points.js for an example of how to use it
*/
const pool = mysql.createPool({
  connectionLimit: 25,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

/*
you may need add the environment variables to your .env file
create an .env file in the server directory
add the following lines to the .env file
DB_HOST=...
DB_USER=...
and so on...
It is not a good idea to leave that data freely available on github
*/

module.exports = pool;