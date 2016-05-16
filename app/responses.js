/**
 * Created by suman on 08/05/16.
 */

var core = require('chanakya');
var _ = require('lodash');
var Q = require('q'),
  http = require('http');

core.response('start', function () {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: `Welcome to Telco eCare`,
            subtitle: `Hello! What would you like to do?`,
            buttons: [
              {
                type: 'postback',
                title: 'Mobile',
                payload: 'askMobile'
              }, {
                type: 'postback',
                title: 'Fixed line & Broadband',
                payload: 'askFLBB'
              }, {
                type: 'postback',
                title: 'DTH',
                payload: 'askDTH'
              }
            ]
          }
        ]
      }
    }
  };
}, 'statement');

core.response('recommended', function () {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'Plan recommendation',
            subtitle: `Seems that you like streaming music and videos. Based on your usage, we can recommend you plans that will benefit you. Ready to check it out!!!`,
            buttons: [
              {
                type: 'postback',
                title: 'Show me better plans.',
                payload: 'plans'
              }, {
                type: 'postback',
                title: 'No',
                payload: 'start'
              }
            ]
          }
        ]
      }
    }
  };
}, 'statement');

core.response('otp', function () {
  return {
    text: `I have send an OTP to the phone number 9945458300. Please type your OTP below after you receive it.`
  };
}, 'otp');

core.response('fail', function (to) {
  return {
    text: `I am sorry ${to.first_name}, I am unable to understand what you mean.`
  };
}, 'statement');

core.response('bill', function () {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  }

  if(mm<10) {
    mm='0'+mm
  }

  today = mm+'/'+dd+'/'+yyyy;
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": `Bill summary of 9945458300 as on ${today}`,
            "image_url": "http://boiling-gorge-79536.herokuapp.com/img/bill.png",
            "subtitle": `To help you further choose a command`,
            "buttons": [
              {
                "type": "web_url",
                "title": "Detailed bill",
                "url": "http://www.google.com"
              }, {
                "type": "postback",
                "title": "Update Plan",
                "payload": "update"
              }, {
                "type": "postback",
                "title": "Recommended Plan",
                "payload": "recommended"
              }
            ]
          }
        ]
      }
    }
  };
}, 'statement');

core.response('askMobile', function () {
  return {
    text: `What is the mobile number Suman?`
  };
}, 'phoneno');

core.response('plans', function () {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "My Plan 299",
            // "image_url": "http://lorempixel.com/191/100/abstract/",
            "subtitle": "2GB free data usage for 45 days",
            "buttons": [
              {
                "type": "postback",
                "title": "Buy",
                "payload": "buy"
              }
            ]
          },
          {
            "title": "My Plan 499",
            // "image_url": "http://lorempixel.com/191/100/technics/",
            "subtitle": "4GB free data usage for 45 days",
            "buttons": [
              {
                "type": "postback",
                "title": "Buy",
                "payload": "buy"
              }
            ]
          }
        ]
      }
    }
  };
}, 'statement');

core.response('offers', function () {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [
          {
            "title": "Digital TV",
            // "image_url": "http://lorempixel.com/191/100/abstract/",
            "subtitle": "Record up to 750 hours of live TV",
            "buttons": [
              {
                "type": "web_url",
                "title": "Buy",
                "url": "http://www.google.com"
              }
            ]
          }
        ]
      }
    }
  };
}, 'statement');

core.response('buy', function () {
  return {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "receipt",
        "recipient_name": `Suman Paul`,
        "order_number": _.random(1000000, 9999999, false),
        "currency": "INR",
        "payment_method": "Visa 2345",
        "elements": [
          {
            "title": "My Plan 499",
            "subtitle": "4GB free data usage for 45 days",
            "quantity": 1,
            "price": 499,
            "currency": "INR",
            "image_url": "http://lorempixel.com/191/100/abstract/"
          }
        ],
        "summary": {
          "subtotal": 490.00,
          "total_tax": 9.00,
          "total_cost": 499.00
        }
      }
    }
  };
}, 'offer');
