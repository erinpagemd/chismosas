/* jshint node: true */

//var $ = require('jquery'),
//    _ = require('lodash'),
//    Firebase = require('firebase');

var FIREBASE_URL = 'https://chismosas.firebaseio.com',
    fb = new Firebase(FIREBASE_URL),
    fbMessages= fb.child('messages');


$(document).ready(initialize);
function initialize(){

  //event handler for message
  $('#submitMessage').click(pushFirebase);

  makeNamedMessageDiv();
}//end initialize

//////////////////////////////////////////////
///////////////// FUNCTIONS //////////////////
/////////////////////////////////////////////

//capture the input value
function getMessage () {
  var message = $('#message').val();
  $('#message').val('');
  return message;
}//end getMessage

//capture the name
function getName () {
  var name = $('#name').val();
  $('#name').val('');
  return name;
}//end getName

//put the message in firebase
function pushFirebase (event) {
  event.preventDefault();
  fbMessages.push({
    message: getMessage(),
    name: getName()
  });
}//end pushFirebase

//display the messages from firebase
//append the name and message to target
function makeNamedMessageDiv () {
  fbMessages.limitToLast(5).on('child_added', function(snapshot){
    var snap = snapshot.val();
    var $namedMessageDiv = $('<div class="row namedMessageDiv"></div>');
    var $nameDiv = $('<div class="col-xs-2 convo givenName">' + snap.name + ': </div>');
    var $messageDiv = $('<div class="col-xs-8 convo message">' + snap.message + '</div>');
    $namedMessageDiv.append($nameDiv, $messageDiv);
    $('#target').append($namedMessageDiv);
  });
}//end makeMessageDiv
