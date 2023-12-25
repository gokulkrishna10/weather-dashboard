function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
}


exports.responseDataMapping = function (response) {
    let responseObject = {}

    responseObject.lattitude = response.data.coord.lat
    responseObject.longitude = response.data.coord.lon
    responseObject.weather = response.data.weather[0].main
    responseObject.description = response.data.weather[0].description
    responseObject.temperature = parseFloat((response.data.main.temp - 273.15).toFixed(2))
    responseObject.feelsLike = parseFloat((response.data.main.feels_like - 273.15).toFixed(2))
    responseObject.maxTemp = parseFloat((response.data.main.temp_max - 273.15).toFixed(2))
    responseObject.minTemp = parseFloat((response.data.main.temp_min - 273.15).toFixed(2))
    responseObject.pressure = response.data.main.pressure
    responseObject.humidity = response.data.main.humidity
    responseObject.windSpeed = response.data.wind.speed
    responseObject.windDirection = response.data.wind['deg']
    responseObject.cloudiness = response.data.clouds.all
    responseObject.country = response.data.sys.country
    responseObject.sunriseTime = formatTimestamp(response.data.sys.sunrise)
    responseObject.sunsetTime = formatTimestamp(response.data.sys.sunset)
    responseObject.city = response.data.name

    return responseObject
}

exports.formatTimestamp = formatTimestamp;