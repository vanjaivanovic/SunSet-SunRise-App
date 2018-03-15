var googleKey = "AIzaSyBw0MIypLnDtsAuC9ZIBD0TnMuhhZ_53OM";


google.maps.event.addDomListener(window, 'load', initialize);

 

function initialize() {

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchCity'));
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var location = "<b>Adress</b>: " + place.formatted_address + "<br/>";
        var latitude = "<b>Latitude</b>" + place.geometry.location.lat(); + "<br/>";
        var longitude = "<b>Longitude</b>" + place.geometry.location.lng();
        var lat = place.geometry.location.lat();
        var long = place.geometry.location.lng();
 
        document.getElementById('adressResult').innerHTML = location;

        document.getElementById('latitudeResult').innerHTML = latitude;

        document.getElementById('longitudeResult').innerHTML = longitude;

 

        console.log(location);

        console.log(latitude);

        console.log(longitude);

        console.log(UTCoffset);

        getsunlocation(lat, long);

 
    });

 

};
var button = document.getElementById("CurrentPosition");
var errormessage = document.getElementById("positionError");

button.onclick = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        errormessage.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getSun(latitude, longitude);
}

// Expects a parameter!!!
function getSun(latitude, longitude){
  fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`)
    .then((response) => response.json())
    .then((sunData) =>  {
      console.log(sunData)
      displaySunData(sunData);

    })
    .catch((error) => {
      console.log(error);
    })
}

function displaySunData(sunData){
  // const main = weatherData.main;
  //const weather = weatherData.weather;
  const { results } = sunData;
  const sunInfoElement = document.getElementById('sunInfo');
  let sunInfo = `

    <p> Sun rises at: ${results.sunrise} </p>

    <p> Sun sets at: ${results.sunset} </p>

 

  `;
  sunInfoElement.innerHTML = sunInfo; 
} 


