let config = require('../config/config.json');
const request = require('request');
const statusCode = require('../shared/statusCodes.json');

const searchResult = (req) => {
    return new Promise((resolve, reject) => {
        if(config.APIKey) {
            const APIKey = config.APIKey;
            let reqObj = {
                latitude: req.query.latitude,
                longitude: req.query.longitude,
                'customer name': req.query['customer name'],
                'number_of_locations': req.query['number of locations'] ? req.query['number of locations'] : '',
                type: req.query.type ? req.query.type : '',
                'response_output': req.query['response output'] ? req.query['response output'] : 'json',
                language: req.query.language ? req.query.language : ''
            };
            let location = reqObj.latitude.toString() + ',' + reqObj.longitude.toString();
            request({
                uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/${reqObj.response_output}?key=${APIKey}&location=${location}&type=${reqObj.type}&language=${reqObj.language}&radius=50000`,
                method: "GET"
            }, (err, result) => {
                if (err) {
                    console.log("error", err);
                    reject("Error connecting to google api. Error is " + err)
                } else {
                    console.log("result" + JSON.stringify(result));
                    if (result.statusCode === 200) {
                        // console.log("Result", result)
                        const response = JSON.parse(result.body);
                        if (!response.error_message) {
                            //   console.log("Body", response)
                            resolve(response.results)
                        } else {
                            reject(response)
                        }
                    } else {
                        reject(result.body)
                    }
                }
            })
        }else{
            reject("Add APIKey to config file")
        }
    })
};

module.exports = {
    searchResult: searchResult
};
