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

});