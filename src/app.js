const express = require('express');
const app = express();
const coursesRouter = require('./routes/courseRoutes.js');

app.use(express.json());

// Routes
app.use('/api/courses', coursesRouter);

// Basic root endpoint
app.get('/api', (req, res) => res.send('CodeCraftHub API'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CodeCraftHub API listening on port ${PORT}`);
});

