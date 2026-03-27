require('dotenv').config();

console.log("Your port is:", process.env.PORT);
const express = require('express');
const cors = require('cors'); // Essential for React to talk to Node
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // This tells the browser: "It's okay for my React app to talk to this API"
app.use(express.json()); // This lets your API "read" JSON data from React

// Your Test Route
app.get('/api/status', (req, res) => {
  res.json({ message: "HorizonExam Backend is Online! 🚀" });
});

app.get('/', (req, res) => {
  res.send('Welcome to the HorizonExam API! The server is running smoothly.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});