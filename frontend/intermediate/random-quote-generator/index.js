var quote = "";
var quoteTweet = "";
var author = author = "- Anonymous";
var colors = ["#001f3f", "#0074D9", "#7FDBFF", "#39CCCC", "#3D9970", "#2ECC40", "#01FF70", "#FFDC00", "#FF851B", "#FF4136", "#85144b", "#F012BE", "#B10DC9", "#AAAAAA"];
var color = Math.floor(Math.random() * colors.length);

var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();


function getQuote() {
  $.getJSON("http://api.icndb.com/jokes/random?exclude=[explicit]", function(data) {
    quote = decodeEntities(data.value.joke);
    quote = "\"" + quote + "\"";
  });
};

function publishQuote() {
  color = Math.floor(Math.random() * colors.length);

  $('#quote').fadeOut('slow', function() {
    $(this).text(quote).fadeIn('slow');
  });
  $('#author').fadeOut('slow', function() {
    $(this).text(author).fadeIn('slow');
  });

  $('body, .btn').animate({
    backgroundColor: colors[color]
  }, {
    queue: false
  }, 'slow');
  $('.btn').animate({
    borderBottomColor: colors[color],
    borderLeftColor: colors[color],
    borderTopColor: colors[color],
    borederRightColor: colors[color]
  }, {
    queue: false
  }, 'slow');
  $('#quote, #author').animate({
    color: colors[color]
  }, {
    queue: false
  }, 'slow');

}

function publishFirstQuote() {
  $('body, .btn').css("background-color", colors[color]);
  $('.btn').css("border-color", colors[color]);
  $('#quote, #author').css("color", colors[color]);

  $('#quote').fadeOut(200, function() {
    $(this).text(quote).fadeIn(200);
  });
  $('#author').fadeOut(200, function() {
    $(this).text(author).fadeIn(200);
  });
  $('.btn').delay(400).show(0);

}

function tweet() {
  var tweetLink = "https://twitter.com/intent/tweet?text=";
  
  tweetLink = tweetLink.concat(encodeURIComponent(quote));
  var win = window.open(tweetLink, '_blank');
  if (win) {
    //Browser has allowed it to be opened
    win.focus();
  } else {
    //Broswer has blocked it
    alert('Please allow popups for this site');
  }
}

$(document).ready(function() {
  getQuote();
  publishFirstQuote();
  $('#new-quote').on('click', function() {
    getQuote();
    publishQuote();
  });
  $('#twitter').on('click', function() {
    tweet();
  })

});
