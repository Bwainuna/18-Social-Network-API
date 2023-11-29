require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const db = require('./config/connection'); // Import the database connection

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes); 
// Use the central routes file

// Start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
