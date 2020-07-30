const jwt = require('jsonwebtoken');
const UserDao = require('../dao/user');
const { api } = require('../../config');
const { handleError, handleException } = require('../utils');

const auth = async (req, res, next) => {
    try {
        const headerAuth = req.header('Authorization') || '';
        const token = headerAuth.replace('Bearer ', '');

        if (!token) {
            throw handleException(401, 'Not authorized.');
        }

        const data = jwt.verify(token, api.secret_key);
        const user = await UserDao.find({
            id: data.id,
        });

        if (!user) {
            throw handleException(401, 'Not authorized.');
        }

        req.user = {
            id: user.id,
        };

        return next();
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = auth;
