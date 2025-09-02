const userInput = document.querySelector('.user-input');
const searchBtn = document.getElementById('search-btn');
const cityElement = document.getElementById('city-title');
const tempElement = document.getElementById('tempeture');
const descElement = document.getElementById('weather-desc');

async function getWeatherData(){
   const city  = userInput.value;
    const apiKey = '746a9f92f608bcc320c4ff169e2fdf8a';

    if (city === ""){
        cityElement.textContent = 'Error: the city name was empty!'
        return;
    }

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { mode: 'cors' });
        const weatherData = await response.json();

        if (weatherData.cod === '404'){
            cityElement.textContent = 'City not found';
            tempElement.textContent = "";
            descElement.textContent = "";
            return;
        }

        const cityName = userInput.value;
        const tempCelcius = (weatherData.main.temp - 273.15).toFixed(1);
        const weatherDesc = weatherData.weather[0].description;

        

        cityElement.textContent = cityName;
        tempElement.textContent = `${tempCelcius}C`;
        descElement.textContent = weatherDesc;

        console.log(cityName);
    } catch (error){
        console.error('error to search api data');
    }
}
searchBtn.addEventListener('click', () => {
    cityElement.textContent = 'Loading...';
    getWeatherData();
});
