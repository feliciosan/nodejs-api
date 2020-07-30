const UserDao = require('../dao/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { api } = require('../../config');
const { handleResponse, handleError, handleException } = require('../utils');

const signIn = async (req, res) => {
    try {
        const userfilter = {
            email: req.body.email,
        };

        const user = await UserDao.find(userfilter);

        if (!user) {
            throw handleException(400, 'Invalid credentials.');
        }

        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            throw handleException(400, 'Invalid credentials.');
        }

        const token = jwt.sign({ id: user.id }, api.secret_key, { expiresIn: '24h' });

        handleResponse(res, 200, token);
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

        const userExists = await UserDao.count(userFilter);

        if (userExists) {
            throw handleException(409, 'Email already in use.');
        }

        userBody.password = await getEncryptedPassword(req.body.password);

        const userCreated = await UserDao.create(userBody);

        handleResponse(res, 201, {
            id: userCreated.id,
            name: userCreated.name,
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
