const mongoose = require('mongoose');

// Create mongoose Schema
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});
  
module.exports = mongoose.model("Article", articleSchema);