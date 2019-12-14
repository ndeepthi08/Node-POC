const express = require('express');
const router = express.Router();
const Joi = require('joi');
let validator = require('express-joi-validation')({
    passError: true // NOTE: this tells the module to pass the error along for you
});
const searchService = require('../services/searchAPI.service');
const ExpressJoi = require('express-joi-validator');
const searchReqValidationSchema = require('../schemas/searchRequestValidation');

let Schema = {
    'latitude': Joi.string().required(),
    'longitude': Joi.string().required(),
    'customer name': Joi.string().required(),
    'number of locations': Joi.number().integer().empty("").allow(null),
    'type': Joi.string().empty("").allow(null),
    'response output': Joi.string().empty("").allow(null),
    'language': Joi.string().empty("").allow(null),
};


router.get('/search', validator.query(Schema), (req, res, next) => {
    try {
        searchService.searchResult(req).then(data => {
            let final_resp = [];
            if (req.query['number of locations']) {
                final_resp = data.slice(0, req.query['number of locations']);
            } else {
                final_resp = data
            }
            res.status(200).send({
                count: final_resp.length,
                locations: final_resp
            })

        }).catch(err => {
            res.status(500).send({
                Error: err
            })
        });
    } catch (e) {
        res.status(500).send({
            Error: e
        })
    }
});


module.exports = router;
