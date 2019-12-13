const Joi = require('joi');

var searchDetails = {
    query: {
        
        // keyword: Joi.string().required(),
        // types: Joi.string().optional(),
        // radius: Joi.number().optional(),
        // language: Joi.string().optional()
    }
};



module.exports = {
    searchDetails: searchDetails,
}
