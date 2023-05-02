const app = require('./App');
const { connect } = require('./logindb');
// Start the server and establish the database connection

async function startServer() {
  try {
    await connect();
    // Start the server after the database connection is established
    // Replace the port number and the callback function with your own
    const port = process.env.PORT;
    app.listen(port, () => {
      /* eslint-disable no-console */
      console.log(`Listening: http://localhost:${port}`);
      /* eslint-enable no-console */
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

startServer();
