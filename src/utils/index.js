const handleResponse = (res, code, data) => {
    res.status(code || 200);
    res.send({
        data: data || {},
    });
};

const handleError = (res, error) => {
    res.status(error.code || 500);
    res.send(error);
};

const handleException = (code, message) => {
    return {
        code: code || 500,
        message: message,
    };
};

module.exports = {
    handleError: handleError,
    handleResponse: handleResponse,
    handleException: handleException,
};
