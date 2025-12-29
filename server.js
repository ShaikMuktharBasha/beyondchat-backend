// server.js - Express server for the backend API

const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Enable CORS for frontend requests
const bodyParser = require('body-parser'); // Parse JSON request bodies
const mongoose = require('mongoose');
const articlesRouter = require('./articles'); // Routes for article CRUD operations
const { scrapeArticles } = require('./scraper'); // Scraping function
const { updateArticles } = require('./updater'); // AI Updater function
const { connectDB } = require('./database'); // DB connection

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Database Connection Middleware
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ 
    status: 'Backend is running', 
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' 
  });
});

app.use('/api/articles', articlesRouter); // Mount article routes

// Route to trigger scraping (for Phase 1)
app.post('/api/scrape', async (req, res) => {
  await scrapeArticles(); // Run scraping function
  res.json({ message: 'Scraping completed' });
});

// Route to trigger AI updates (for Phase 2)
app.post('/api/update-articles', async (req, res) => {
  const result = await updateArticles();
  if (result.success) {
    res.json({ message: result.message });
  } else {
    res.status(500).json({ error: result.error });
  }
});

// Start server
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

module.exports = app;

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});