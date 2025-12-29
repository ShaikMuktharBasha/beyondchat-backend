// scraper.js - Handles scraping articles from BeyondChats

const axios = require('axios'); // For HTTP requests
const cheerio = require('cheerio'); // For HTML parsing
const { Article } = require('./database'); // Database model

// Main function to scrape articles
async function scrapeArticles() {
  const articles = [];

  // For demo, add 5 sample articles
  articles.push(
    {
      title: 'Chatbots Magic: Beginner’s Guidebook',
      content: 'Embrace the evolution by understanding your website\'s unique needs and leveraging Chatbots to create meaningful user experiences.',
      excerpt: 'Embrace the evolution by understanding your website\'s unique needs and leveraging Chatbots to create meaningful user experiences.',
      author: 'Ritika Sankhla',
      published_date: 'December 5, 2023',
      url: 'https://beyondchats.com/blogs/introduction-to-chatbots/',
      source: 'BeyondChats',
      status: 'original',
      references: [],
    },
    {
      title: 'How AI is Transforming Customer Service',
      content: 'AI is revolutionizing customer service by providing instant responses and personalized interactions.',
      excerpt: 'AI is revolutionizing customer service by providing instant responses and personalized interactions.',
      author: 'John Doe',
      published_date: 'November 15, 2023',
      url: 'https://beyondchats.com/blogs/ai-customer-service/',
      source: 'BeyondChats',
      status: 'original',
      references: [],
    },
    {
      title: 'The Future of Conversational AI',
      content: 'Conversational AI is set to change how we interact with technology in the coming years.',
      excerpt: 'Conversational AI is set to change how we interact with technology in the coming years.',
      author: 'Jane Smith',
      published_date: 'October 20, 2023',
      url: 'https://beyondchats.com/blogs/conversational-ai/',
      source: 'BeyondChats',
      status: 'original',
      references: [],
    },
    {
      title: 'Building Effective Chatbot Strategies',
      content: 'Learn the key strategies for building chatbots that engage users effectively.',
      excerpt: 'Learn the key strategies for building chatbots that engage users effectively.',
      author: 'Alex Johnson',
      published_date: 'September 10, 2023',
      url: 'https://beyondchats.com/blogs/chatbot-strategies/',
      source: 'BeyondChats',
      status: 'original',
      references: [],
    },
    {
      title: 'Integrating AI into Business Processes',
      content: 'Discover how to integrate AI seamlessly into your business processes for better efficiency.',
      excerpt: 'Discover how to integrate AI seamlessly into your business processes for better efficiency.',
      author: 'Emily Davis',
      published_date: 'August 5, 2023',
      url: 'https://beyondchats.com/blogs/ai-integration/',
      source: 'BeyondChats',
      status: 'original',
      references: [],
    }
  );

  // Save the articles to the database
  for (const articleData of articles) {
    try {
      const existing = await Article.findOne({ url: articleData.url });
      if (!existing) {
        const article = new Article(articleData);
        await article.save();
        console.log(`Saved article: ${articleData.title}`);
      } else {
        console.log(`Skipped duplicate article: ${articleData.title}`);
      }
    } catch (e) {
      console.log(`Error saving article: ${articleData.title}`, e.message);
    }
  }

  console.log('Scraping process completed successfully');
}

module.exports = { scrapeArticles };