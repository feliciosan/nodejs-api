const UserDao = require('../dao/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { to, handleResponse, handleError } = require('../utils');

const signIn = async (req, res) => {
    try {
        const userfilter = {
            email: req.body.email,
        };

        const [errorOnFindUser, user] = await to(UserDao.find(userfilter));

        if (errorOnFindUser) {
            return handleError(res, errorOnFindUser);
        }

        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                const token = jwt.sign({ id: user.id }, process.env.APP_SECRET_KEY, {
                    expiresIn: '24h',
                });

                return handleResponse(res, {
                    token: token,
                });
            }
        }

        handleError(res, {
            code: 400,
            message: 'Invalid credentials.',
            status: 'error',
        });
    } catch (error) {
        handleError(res, error);
    }
};

const create = async (req, res) => {
    try {
        const userFilter = {
            email: req.body.email,
        };
        const userBody = {
            name: req.body.name,
            email: req.body.email,
        };

        const [errorOnCountUser, userExists] = await to(UserDao.count(userFilter));

        if (errorOnCountUser) {
            return handleError(res, errorOnCountUser);
        }

        if (userExists) {
            return handleError(res, {
                code: 409,
                message: 'Email already in use.',
            });
        }

        userBody.password = await getEncryptedPassword(req.body.password);

        const [errorOnCreateUser, userCreated] = await to(UserDao.create(userBody));

        if (errorOnCreateUser) {
            return handleError(res, errorOnCreateUser);
        }

        handleResponse(res, {
            user: {
                id: userCreated.id,
                name: userCreated.name,
            },
        });
    } catch (error) {
        handleError(res, error);
    }
};

const getEncryptedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

module.exports = {
    signIn: signIn,
    create: create,
};
