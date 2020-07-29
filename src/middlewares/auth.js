const jwt = require('jsonwebtoken');
const UserDao = require('../dao/user');
const { to, handleError } = require('../utils');

const auth = async (req, res, next) => {
    try {
        const headerAuth = req.header('Authorization') || '';
        const token = headerAuth.replace('Bearer ', '');

        if (!token) {
            return handleError(res, {
                code: 401,
                message: 'Not authorized.',
                status: 'error',
            });
        }

        const data = jwt.verify(token, process.env.APP_SECRET_KEY);
        const [errorOnFindUser, user] = await to(UserDao.find({ id: data.id }));

        if (errorOnFindUser) {
            return handleError(res, errorOnFindUser);
        }

        if (!user) {
            return handleError(res, {
                code: 401,
                message: 'Not authorized.',
                status: 'error',
            });
        }

        req.user = { id: user.id };
        next();
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = auth;
