const handleResponse = (res, data) => {
    res.send(data);
};

const handleError = (res, error) => {
    res.status(error.code || 500).send(error);
};

const parseError = (error) => {
    return {
        code: 500,
        message: error.message,
        status: 'error',
    };
};

const to = (promise) => {
    return promise.then((data) => [null, data]).catch((error) => [error, null]);
};

module.exports = {
    to: to,
    handleError: handleError,
    parseError: parseError,
    handleResponse: handleResponse,
};
