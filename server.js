require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = process.env.PORT || 3000;

const Routes = require('./routes/routes.js');

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

// Use your routes
app.use('/api', Routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});