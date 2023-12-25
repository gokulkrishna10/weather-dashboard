document.addEventListener('DOMContentLoaded', function () {
    const cityForm = document.getElementById('cityForm');
    const weatherDisplay = document.getElementById('weatherDisplay');

    // Initially hide the weather display until data is fetched
    weatherDisplay.style.display = 'none';

    cityForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const city = document.getElementById('cityInput').value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });

    // Function to fetch weather data from API
    function fetchWeatherData(city) {
        const apiUrl = `http://localhost:8888/weather?city=${encodeURIComponent(city)}`;
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(weatherData => {
                if (weatherData && weatherData.code && ["400", "404"].includes(weatherData.code)) {
                    displayError(weatherData.msg);
                } else {
                    displayWeatherData(weatherData);
                    weatherDisplay.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherDisplay.style.display = 'none';
            });
    }

    // Function to display weather data
    function displayWeatherData(weatherData) {
        document.getElementById('city').textContent = weatherData.city;
        document.getElementById('location').textContent = `${weatherData.lattitude}, ${weatherData.longitude} (${weatherData.country})`;
        document.getElementById('weather').textContent = weatherData.weather;
        document.getElementById('description').textContent = weatherData.description;
        document.getElementById('temperature').textContent = `${weatherData.temperature}°C`;
        document.getElementById('feelsLike').textContent = `${weatherData.feelsLike}°C`;
        document.getElementById('maxTemp').textContent = `${weatherData.maxTemp}°C`;
        document.getElementById('minTemp').textContent = `${weatherData.minTemp}°C`;
        document.getElementById('pressure').textContent = `${weatherData.pressure} hPa`;
        document.getElementById('humidity').textContent = `${weatherData.humidity}%`;
        document.getElementById('windSpeed').textContent = `${weatherData.windSpeed} m/s`;
        document.getElementById('windDirection').textContent = `${weatherData.windDirection}°`;
        document.getElementById('cloudiness').textContent = `${weatherData.cloudiness}%`;
        document.getElementById('sunriseTime').textContent = weatherData.sunriseTime;
        document.getElementById('sunsetTime').textContent = weatherData.sunsetTime;
    }

    function displayError(message) {
        // Clear existing content
        weatherDisplay.innerHTML = '';

        // Create a new 'p' element
        const errorMessageElement = document.createElement('p');
        errorMessageElement.className = 'error-message';
        errorMessageElement.textContent = message; // Use textContent for security

        // Append the new element to the weather display container
        weatherDisplay.appendChild(errorMessageElement);

        // Make the weather display visible
        weatherDisplay.style.display = 'block';
    }
});