


exports.salesLogin = (req, res, next) => {
    const body = req.body;
    searchService.login(body, res)

    {
        var requestJSON = JSON.stringify(req.body);
    }
}
