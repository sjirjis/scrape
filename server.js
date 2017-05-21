var express = require('express'),
	exphbs  = require('express-handlebars'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cheerio = require('cheerio'),
	request = require('request');

var app = express(),
	PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log("App listening on PORT", PORT);
})