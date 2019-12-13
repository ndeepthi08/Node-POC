const searchService = require('../services/searchAPI.service');
const ExpressJoi = require('express-joi-validator');
const searchReqValidationSchema = require('../schemas/searchRequestValidation');

module.exports = function (app, router) {
    app.route('/search').get( searchService.searchResult)
}