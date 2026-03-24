function applyTemperatureColors() {
    document.querySelectorAll('.temp').forEach(el => {
        const temp = parseInt(el.textContent);
        if (!isNaN(temp)) {
            el.style.color = getTempColor(temp);
        }
    });
}

function displayForecast(periods) {
    const container = document.getElementById("forecast");
    container.innerHTML = "";

    periods.slice(0, 14).forEach((period, index) => {
        const isNight = period.isDaytime === false;

        const div = document.createElement("div");
        div.className = isNight ? "night-card" : "day-card";

        const col = Math.floor(index / 2) + 1;
        const row = isNight ? 2 : 1;

        div.style.gridColumn = col;
        div.style.gridRow = row;

        div.innerHTML = `
            <h3 class='day'>${period.name}</h3>
            <p class="temp"><strong>${period.temperature}</strong>°${period.temperatureUnit}</p>
            <p>${period.shortForecast}</p>
            <p><em>Wind: ${period.windSpeed} ${period.windDirection}</em></p>
        `;

        container.appendChild(div);
    });

    applyTemperatureColors();
    updateLegendGradient();
}
