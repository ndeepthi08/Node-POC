let buildErrorMessage = function (err) {
    console.log("Error"+err)
    return {
        metadata: {
            "Status_Code": err.status || 404,
            "Message": err || err.error,
            "Error_Message": err || err.error
        }
    };
};

let buildErrorMessageDev = function (err) {
    return JSON.stringify({
        "Status_Code": err.status || 500,
        "Message": err.message,
        "errorName": err.name,
        "errorMessage": err.message,
        "stack": err.stack
    });
};

let invalidField = function (err) {
    return {
        "developerMessage": "Plese check the DataBase Column name.",
        "Error_Message": err.message,
        "status": 404,
        "errorCode": "ER_BAD_FIELD_ERROR"//TODO define standard error codes
    };
};

module.exports = {
    buildErrorMessage: buildErrorMessage,
    buildErrorMessageDev: buildErrorMessageDev,
    invalidField: invalidField
};
