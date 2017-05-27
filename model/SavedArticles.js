var mongoose = require("mongoose");

var savedArticlesSchema = mongoose.Schema({
    headline: String,
    url: String,
    scrapeId: String,
    notes: String
});

var SavedArticles = mongoose.model('SavedArticles', savedArticlesSchema);

module.exports = SavedArticles;