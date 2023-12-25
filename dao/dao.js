const apiHelper = require('../helpers/helper')
const axios = require("axios")
const {environment} = require("../environments");


exports.getWeatherData = function (req, callback) {
    let options = {
        url: environment.WEATHER_API_URL,
        method: "GET",
        rejectUnauthorized: false,
        params: {
            q: req.query.city,
            APPID: environment.API_KEY
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        json: true
    }

    axios.get(options.url, {params: options.params, headers: options.headers})
        .then(response => {
            let res = apiHelper.responseDataMapping(response)
            callback(null, res)
        })
        .catch(error => {
            let err = {}
            err.code = error.response.data.cod
            err.status = error.response.statusText
            err.msg = error.response.data.message
            callback(err, null)
        })
}

