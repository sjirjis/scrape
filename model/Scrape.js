var mongoose = require("mongoose");

var scrapeSchema = mongoose.Schema({
    headline: String,
    url: String
});

var Scrape = mongoose.model('Scrape', scrapeSchema);

module.exports = Scrape;