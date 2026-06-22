const express = require('express');
const app = express();
const coursesRouter = require('./routes/courses');

app.use(express.json());

// Routes
app.use('/courses', coursesRouter);

// Basic root endpoint
app.get('/', (req, res) => res.send('CodeCraftHub API'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CodeCraftHub API listening on port ${PORT}`);
});

