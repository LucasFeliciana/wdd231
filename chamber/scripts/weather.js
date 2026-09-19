const apiKey = "dbb015553d1ec6623398edc5a0bacc32";

const lat = 41.7508;
const lon = -88.1535;

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;


async function getWeather() {
    try {
        const currentResponse = await fetch(currentWeatherURL);

        if (!currentResponse.ok) {
            throw Error(await currentResponse.text());
        }

        const currentData = await currentResponse.json();

        displayCurrentWeather(currentData);


        const forecastResponse = await fetch(forecastURL);

        if (!forecastResponse.ok) {
            throw Error(await forecastResponse.text());
        }

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);
    }
}


function displayCurrentWeather(data) {
    const currentTemp = document.querySelector("#current-temp");
    const description = document.querySelector("#weather-description");
    const weatherIcon = document.querySelector("#weather-icon");

    currentTemp.textContent = Math.round(data.main.temp);

    description.textContent = data.weather[0].description;

    const icon = data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherIcon.alt = data.weather[0].description;
}


function displayForecast(data) {
    const dailyForecasts = [];

    data.list.forEach((forecast) => {
        if (forecast.dt_txt.includes("12:00:00")) {
            dailyForecasts.push(forecast);
        }
    });

    const nextThreeDays = dailyForecasts.slice(0, 3);

    nextThreeDays.forEach((forecast, index) => {
        const date = new Date(forecast.dt * 1000);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        document.querySelector(`#day${index + 1}`).textContent =
            dayName;

        document.querySelector(`#temp${index + 1}`).textContent =
            Math.round(forecast.main.temp);
    });
}


getWeather();