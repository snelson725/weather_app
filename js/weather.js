// Hard‑coded ZIP → lat/lon
const zipToLatLon = {
    "20009": { lat: 38.919, lon: -77.037 }
};

async function loadWeather(zip) {
    const { lat, lon } = zipToLatLon[zip];

    try {
        const pointRes = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
        const pointData = await pointRes.json();
        const forecastUrl = pointData.properties.forecast;

        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();

        displayForecast(forecastData.properties.periods);

    } catch (err) {
        document.getElementById("forecast").innerText = "Error loading weather data.";
        console.error(err);
    }
}

// Load weather on page load
loadWeather("20009");
