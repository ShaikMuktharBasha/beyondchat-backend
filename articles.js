const express = require('express');
const router = express.Router();
const { Article } = require('./database');

// GET /api/articles - Retrieve all articles with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const articles = await Article.find().skip(skip).limit(limit);
    const totalArticles = await Article.countDocuments();
    const totalPages = Math.ceil(totalArticles / limit);

    res.json({
      success: true,
      data: {
        articles,
        pagination: {
          currentPage: page,
          totalPages,
          totalArticles,
          limit,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles - Create a new article
router.post('/', async (req, res) => {
  try {
    const article = new Article(req.body); // Create new article instance
    await article.save(); // Save to DB
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/:id - Retrieve a specific article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/articles/:id - Update an article by ID
router.put('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/articles/:id - Delete an article by ID
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;