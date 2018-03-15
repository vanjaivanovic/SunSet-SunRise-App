


google.maps.event.addDomListener(window, 'load', initialize);

 

function initialize() {

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchCity'));
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var location = "<b>Adress</b>: " + place.formatted_address + "<br/>";
        var lat = "<b>Latitude</b>" + place.geometry.location.lat(); + "<br/>";
        var long = "<b>Longitude</b>" + place.geometry.location.lng();
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();
 
        document.getElementById('adressResult').innerHTML = location;
        document.getElementById('latitudeResult').innerHTML = lat
        document.getElementById('longitudeResult').innerHTML = long;

        getsunlocation(latitude, longitude);

 
    });
};

function getsunlocation(latitude, longitude){
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


