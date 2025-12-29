const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Define the Article schema
const articleSchema = new mongoose.Schema({
  title: String,          // Article title
  content: String,        // Article content
  excerpt: String,        // Short description
  author: String,         // Author name
  published_date: String, // Publication date
  url: String,            // URL
  source: String,         // Source (BeyondChats or AI Enhanced)
  status: String,         // Status (original or ai_updated)
  references: [String],   // References for AI articles
}, { timestamps: true });  // Adds createdAt and updatedAt

// Create the Article model
const Article = mongoose.model('Article', articleSchema);

module.exports = { Article };