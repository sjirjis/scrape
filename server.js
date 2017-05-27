var express = require('express'),
	exphbs  = require('express-handlebars'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cheerio = require('cheerio'),
	request = require('request');

var app = express(),
	PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

require('./controller/rootController')(app);
require('./controller/scrapeController')(app);
require('./controller/savedController')(app);

app.use('/public', express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://heroku_sgzs54v9:pitscv2i4ab9e9tndbcle0l0ee@ds155651.mlab.com:55651/heroku_sgzs54v9');

var db = mongoose.connection;

db.on('error', function(err){
	console.log('Mongoose error:', err)
});

db.once('open', function(){
	console.log("Mongoose DB connected!")
});

app.listen(PORT, function(){
  console.log("App listening on PORT", PORT);
});

//function testing............



