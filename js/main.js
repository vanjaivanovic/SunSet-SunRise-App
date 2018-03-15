/*const searchCity = document.getElementById('searchCity');
const weatherParam = 'weather';

searchCity.addEventListener('change', () => {
  const searchValue = searchCity.value;
  getTodaysWeather(searchValue);
})
*/

getTodaysWeather();

// Expects a parameter!!!
function getTodaysWeather(){
  fetch(`https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400`)
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


