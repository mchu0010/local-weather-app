$(document).ready(function() {

  var tmonth = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

  function GetClock(){
    var d = new Date();
    var nmonth = d.getMonth(), ndate = d.getDate(), nyear = d.getYear();
    if (nyear < 1000 ) nyear += 1900;

    document.getElementById('date').innerHTML = ""+tmonth[nmonth]+ " "+ndate+", "+nyear+"";
  }
    
  window.onload = function() {
    GetClock();
    setInterval(GetClock,1000);
  }


  getLocation();

  function getLocation() {
    $.get("http://ipinfo.io", function(location) {
      console.log(location);

      $('.location')
        .append(location.city + ", ")
        .append(location.region);

      var units = getUnits(location.country);
      getWeather(location.loc, units);

    }, "jsonp");

  }

  function getWeather(loc, units) {
    lat = loc.split(",")[0]
    lon = loc.split(",")[1]

    var weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + "&units=" + units + '&appid=e2db5b0453a25a492e87ad8b03046a7c';

    console.log(weatherApiUrl);

    $.get(weatherApiUrl, function(weather) {
      var windDir = convertWindDirection(weather.wind.deg);
      var temperature = weather.main.temp;
      var unitLabel;

      if (units === "imperial") {
        unitLabel = "F";
      } else {
        unitLabel = "C";
      }

      temperature = parseFloat((temperature).toFixed(1));

      console.log(weather);

      $('#icon')
        .append("<img src='http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png'>");

      $('#temp').append(temperature + " " + unitLabel);
      $('#conditions').append(weather.weather[0].description);
      $('#wind-speed').append(windDir + " " + weather.wind.speed + " knots");
      $('#postal').append(postal);

    }, "jsonp");

  };

  function convertWindDirection(dir) {
    var rose = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var eightPoint = Math.floor(dir / 45);
    return rose[eightPoint];
  }

  function getUnits(country) {
    var imperialCountries = ['US', 'BS', 'BZ', 'KY', 'PW'];

    if (imperialCountries.indexOf(country) === -1) {
      var units = 'metric';
    } else {
      units = 'imperial';
    }

    console.log(country, units);
    return units;
  }
  
});