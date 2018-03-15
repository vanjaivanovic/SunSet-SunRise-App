


google.maps.event.addDomListener(window, 'load', initialize);

 

function initialize() {

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchCity'));
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();
        var selectDateButton = document.getElementById('selectDate');

        getsunlocation(latitude, longitude);

        
        selectDateButton.onclick = function selectDate() {
          var date = document.getElementById('calender').value;
          getDate(latitude, longitude, date);
          console.log(date);

        }
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
     function selectDate() {
          var date = document.getElementById('calender').value;
          getDate(latitude, longitude, date);
          console.log(date);

        }

        selectDate();
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
  const { results } = sunData;
  const sunInfoElement = document.getElementById('sunInfo');
  let sunInfo = `

    <p> Sun rises at: ${results.sunrise} </p>

    <p> Sun sets at: ${results.sunset} </p>

 

  `;
  sunInfoElement.innerHTML = sunInfo; 
} 

function getDate(latitude, longitude, date){
  fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}`)
    .then((response) => response.json())
    .then((sunData) =>  {
      console.log(sunData)
      displaySunData(sunData);

    })
    .catch((error) => {
      console.log(error);
    })
}

var today = new Date();
var dd = today.getDate();
var MM = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
   dd='0'+dd;
} 
if(MM<10){
   MM='0'+MM;
} 
var today = yyyy+'-'+MM+'-'+dd;
document.getElementById("calender").value = today;

