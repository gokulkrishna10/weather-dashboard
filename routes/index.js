const weatherIndex = require('../controllers/controller')


exports.getWeatherData = function (req, res) {
    weatherIndex.getWeatherData(req, (err, response) => {
        if (err) {
            res.status(err.code).send(err)
        } else {
            res.status(200).send(response)
        }
    })
}