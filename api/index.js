const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API Routes


// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}