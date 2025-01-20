require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Import the API routes
const Routes = require('./routes/users.routes.js');

// Middleware to parse JSON bodies
app.use(express.json()); // Ensure Express can parse JSON bodies

// Basic root route
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

// Register the API routes
app.use('/api', Routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
