var cheerio = require('cheerio'),
    request = require('request'),
    Scrape = require('../model/Scrape');

scraper = function () {
    request("https://www.washingtonpost.com/", function(error, response, html) {
        // Load the html body from request into cheerio
        var $ = cheerio.load(html);
        var articleArray = [];
        // For each element with a "headline" class
        $(".headline").each(function(i, element) {
            // Save the text of each url enclosed in the current element
            var headline = $(this).children("a").text();
            // Save the href value of each url enclosed in the current element
            var url = $(this).children("a").attr("href");

            // If this headline element had both a headline and a url
            if (headline && url) {

                var newItem = new Scrape({
                    headline: headline,
                    url: url
                });

                // Save the data in the scrapedData db
                newItem.save(function(error, saved) {
                    // If there's an error during this query
                    if (error) {
                        // Log the error
                        console.log(error);
                    }
                    // Otherwise,
                    else {
                        // Log the saved data
                        articleArray.push(saved);
                        //res.write(saved);
                        //console.log(articleArray);
                        //res.end('Scraping complete ' + Date.now());
                    }
                });
            }
        });
    });
}

module.exports = function(app) {

    app.get("/scrape", function(req, res) {
        scraper().then(function(){
            console.log(articleArray);
            res.send(articleArray);
        });
    })
};
