const { scrapeArticles } = require('./scraper');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas (copying from database.js to ensure connection)
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    await scrapeArticles();
    console.log('Done');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
    process.exit(1);
  });
