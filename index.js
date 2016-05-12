var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
	  res.send('Hello World!');
});

app.get('/webhook/', function (req, res) {
	  if (req.query['hub.verify_token'] === 'EAAWCXOKuV0gBABuh1ZC2rbwFspjW23ZACd1iZCd67Yg1FNTAZA8XZCsnIAbBRQZBLjv2k6V4p1LTTiR4StZCOF49iZCdaspZC8oTFqqpQXrEZARz0bJZBebC6tmUMQuEACL0ZB1wITZCV8ZALgb7Pv5ZCt8k60mRdVylc1JZA4zz5iCsQ7L7eQZDZD') {
		      res.send(req.query['hub.challenge']);
		        }
	    res.send('Error, wrong validation token');
});

app.listen(app.get('port'), function () {
	  console.log('Example app listening on port', app.get('port'));
});
