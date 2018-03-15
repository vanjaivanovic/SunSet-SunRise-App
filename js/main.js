//När sidan laddas kalla på funktionen "initialize".
google.maps.event.addDomListener(window, 'load', initialize);

//Listar och hämtar platser i koordinater som du skriver in i sökfältet. 
//Används sedan i alla funktioner som hämtar solinfo med hjälp av koordinater. 
function initialize() {

    var autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchCity'));
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();
        var selectDateButton = document.getElementById('selectDate');

        //Här kallas funktionen med sun APIet.
        getSun(latitude, longitude);

          //Här kallas funktionen med sun APIet med valt datum, när man klickar på select date knappen.
          selectDateButton.onclick = function selectDate() {
              var date = document.getElementById('calender').value;
              getDate(latitude, longitude, date);
          }
    });
};

//Hämtar knappen "Current position" för att använda den till en onclick event.
var button = document.getElementById("CurrentPosition");
var errormessage = document.getElementById("positionError");

//Hämtar användarens nuvarande position när man klickar på Current position knappen.
button.onclick = function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        errormessage.innerHTML = "Geolocation is not supported by this browser.";
    }
}

//Hämtar koordinater på användarens nuvarande position. 
//Där parametern 'position' är ett objekt, coords är ett objekt i position objektet som hämtar data av koordinater.
//longiitude och latitude är egenskaper med sitt värde.
function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getSun(latitude, longitude);

      function selectDate() {
          var date = document.getElementById('calender').value;
          getDate(latitude, longitude, date);
      }
      selectDate();
}

///Hämtar soldata från API med platskordinater.
function getSun(latitude, longitude) {
    fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`)
        .then((response) => response.json())
        .then((sunData) => {
            displaySunData(sunData);

        })
        .catch((error) => {
            console.log(error);
        })
}

//Hämtar soldata från API med platskordinater samt vald datum.
function getDate(latitude, longitude, date) {
    fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}`)
        .then((response) => response.json())
        .then((sunData) => {
            displaySunData(sunData);
        })
        .catch((error) => {
            console.log(error);
        })
}

//Printar ut paragrafer med Apiets data: soluppgång, solnedgång och daglängd. 
//results är objetets namn och sunrise, sunset och daylength egenskaper med sitt värde.
function displaySunData(sunData) {
    const { results } = sunData;
    const sunInfoElement = document.getElementById('sunInfo');
    let sunInfo = `
      <p> Sun rises at: ${results.sunrise} </p>
      <p> Sun sets at: ${results.sunset} </p>
      <p> Day lenght: ${results.day_length}</p>
    `;
    sunInfoElement.innerHTML = sunInfo;
}

// Hämtar dagens datum och formaterar den i ÅR-MÅNAD-DAG
var today = new Date();
var dd = today.getDate();
var MM = today.getMonth() + 1; //January is 0!


var yyyy = today.getFullYear();
  if (dd < 10) {
      dd = '0' + dd; //om dagens datum är mindre än 10:e, lägg en 0 före siffran under 10.
  }
  if (MM < 10) {
      MM = '0' + MM; //även här lägg en 0 före siffran under 10:e månaden.
  }
var today = yyyy + '-' + MM + '-' + dd;
document.getElementById("calender").value = today;