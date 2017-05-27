var cheerio = require('cheerio'),
    request = require('request'),
    Scrape = require('../model/Scrape'),
    Promise = require('promise');

module.exports = function(app) {

	function scraper() {		
		return new Promise(function(fulfill, reject) {       
		    request("https://www.washingtonpost.com/", function(error, response, html) {
		        // Load the html body from request into cheerio
		        var $ = cheerio.load(html);

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
	                    newItem.save();
	                }
	            });
	        })
		fulfill();
		});
	}; 

	app.get('/scrape', function(req, res) {
		scraper().then(function(data) {
		    // This will get the articles we scraped from the mongoDB
		    // Grab every doc in the Articles array
		    Scrape.find(function(error, doc) {
		        // Log any errors
		        if (error) {
		            console.log(error);
		        }
		        // Or send the doc to the browser as a json object
		        else {
		        	console.log('scraped');
		            res.send(doc);
		        }
		    });
		});
	})		
};
