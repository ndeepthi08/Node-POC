var config = require('../config/config.json');
const request = require('request');
const statusCode = require('../shared/statusCodes.json')

const searchResult = (req, res) => {
    const APIKey = config.APIKey;
    let reqObj = {
        location:req.query.location,
        keyword: req.query.keyword,
        types:req.query.type,
        radius:req.query.radius,
        language:req.query.language
    }
    request({
        uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${APIKey}&location=${reqObj.location}&type=${reqObj.types}&keyword=${reqObj.keyword}&language=${reqObj.language}&radius=${reqObj.radius}`,
        method: "GET"
    },
        (err, result) => {
            if (err) {
                console.log("error", error)
            }
            else {
                if (result.statusCode === 200) {
                    // console.log("Result", result)
                      const response = JSON.parse(result.body);
                    //   console.log("Body", response)
                    res.status(parseInt(statusCode.OK)).send({
                        "Status": parseInt(statusCode.OK),
                        "response": response
                    })
                }
                else {
                    res.status(parseInt(statusCode.UNAUTHORIZED)).send({
                        "Status": parseInt(statusCode.UNAUTHORIZED)     
                    })
                }
            }
        })
}

module.exports = {
    searchResult: searchResult
}
