// server.js - Express server for the backend API

const express = require('express'); // Web framework for Node.js
const cors = require('cors'); // Enable CORS for frontend requests
const bodyParser = require('body-parser'); // Parse JSON request bodies
const articlesRouter = require('./articles'); // Routes for article CRUD operations
const { scrapeArticles } = require('./scraper'); // Scraping function

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.use('/api/articles', articlesRouter); // Mount article routes

// Route to trigger scraping (for Phase 1)
app.post('/api/scrape', async (req, res) => {
  await scrapeArticles(); // Run scraping function
  res.json({ message: 'Scraping completed' });
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