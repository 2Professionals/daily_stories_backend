require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Routes = require('./routes/routes.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the Node.js backend!');
});

app.use('/api', Routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
