var latitude;
var longitude;
var city;
var iconURL;
var temperatureF;
var temperatureC;
var description;
var wind;
var celcius = false;      // Celcius or fahrenheit

function capitalizeFirstLetters(sentence) {
  var splitSentence = sentence.split(" ");
  var capitalizedSplitSentence = splitSentence.map(function(val) {
    var word = val.split("");
    word[0] = word[0].toUpperCase();
    word = word.join("");
    return word;
  });  
  return capitalizedSplitSentence.join(" ");
}

function getWeather() {
  $.getJSON("https://api.wunderground.com/api/afd93aceeaf2b434/conditions/q/" + latitude.toString() + "," + longitude.toString() + ".json", function(data) {
    city = data.current_observation.display_location.full;
    iconURL = data.current_observation.icon_url;
    temperatureF = data.current_observation.temp_f;
    temperatureC = data.current_observation.temp_c;
    description = data.current_observation.weather;  
    wind = data.current_observation.wind_string;
    publishWeather();
  });
};

// First time automatically fahrenheit
function publishWeather() {  
  $("#city").text(city);
  $("#icon").attr("src", iconURL);
  if (celcius == true) {
    $("#temperature").html(temperatureC + "&deg;C");
  } else {
    $("#temperature").html(temperatureF + "&deg;F");
  }  
  $("#description").text(description);
  $("#wind").text("Wind: " + wind);
}

$(document).ready(function() {  
  if ("geolocation" in navigator) {    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeather();    
    });     
  } else {
    alert("Please allow geolocation access");
  }
  
  $("#change-unit").on('click', function() {
    celcius = !celcius;
    if (celcius == true) {
      $("#temperature").html(temperatureC + "&deg;C");
      $("#change-unit").text("Change to Fahrenheit");
    } else {
      $("#temperature").html(temperatureF + "&deg;F");
      $("#change-unit").text("Change to Celcius");
    }
  });
});