var express = require('express');
var app = express();

var token = 'EAAWCXOKuV0gBABuh1ZC2rbwFspjW23ZACd1iZCd67Yg1FNTAZA8XZCsnIAbBRQZBLjv2k6V4p1LTTiR4StZCOF49iZCdaspZC8oTFqqpQXrEZARz0bJZBebC6tmUMQuEACL0ZB1wITZCV8ZALgb7Pv5ZCt8k60mRdVylc1JZA4zz5iCsQ7L7eQZDZD';

function sendTextMessage(sender, text) {
  var messageData = {
    text: text
  };
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: token},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData
    }
  }, function (error, response) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === token) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

app.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
    }
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port', app.get('port'));
});
