$(document).ready(function() {
  $txtInput = $('.txtInput');
  var index = 1;

  var makePromptElement = function(array) {
    var promptStr = '';
    for (var i = 0; i < array.length; i++) {
      if (array[i] !== '<p>' && array[i] !== '</p>') {
        promptStr += '&nbsp;' + '<span>' + array[i] + '</span>';
      } else {
        promptStr += array[i];
      }
    }
    return $.parseHTML(promptStr);
  };

  //each definition
  var each = ["<p> var each = function(collection, iterator) { </p> <p>",
    "if (Array.isArray(collection)) { </p> <p>",
      "for (var i = 0; i < collection.length; i++) { </p> <p>",
        "iterator(collection[i], i, collection); </p> <p>",
      "} </p> <p>",
    "} else if (typeof collection === 'object') { </p> <p>",
      "for (var key in collection) { </p> <p>",
        "iterator(collection[key], key, collection); </p> <p>",
      "} </p> <p>",
    "} </p> <p>",
  "}; </p>"].join(' ').split(' ');
  

  //making the htmlDiv and appending it
  var htmlDiv = makePromptElement(each);
  $('.currentDiv').append(htmlDiv);


  //Input box 
  $txtInput.on('keypress',function(e) {
    var target = each[index];
    var nextTarget = each[index + 1];

    var correct = function(extra) {
      $txtInput.val('');
      $('span:nth-child(' + (index + 1) + ')').removeClass('redBg');
      index += 1 + extra;
      $('span:nth-child(' + (index + 1) + ')').addClass('redBg');
    };

    var message = $txtInput.val();
    if (e.keyCode == 32) {
      e.preventDefault()
      if (message === target && nextTarget !== "</p>") {
        correct(0);
      }
    } else if(e.keyCode == 13){
      e.preventDefault()
      if(nextTarget === "<br>" && message === target) {
        correct(2);
      }
    }
  });
});