const ProductDao = require('../dao/product');
const { handleResponse, handleError } = require('../utils');

const create = async (req, res) => {
    try {
        const productBody = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            user_id: req.user.id,
        };

        await ProductDao.create(productBody);

        handleResponse(res, 201, true);
    } catch (error) {
        handleError(res, error);
    }
};

const findAll = async (req, res) => {
    try {
        const productFilter = {
            user_id: req.user.id,
        };

        const products = await ProductDao.findAll(productFilter);

        handleResponse(res, 200, products);
    } catch (error) {
        handleError(res, error);
    }
};

const update = async (req, res) => {
    try {
        const productFilter = {
            id: req.params.id,
            user_id: req.user.id,
        };
        const productBody = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
        };

        const productUpdated = await ProductDao.update(productFilter, productBody);

        handleResponse(res, 200, productUpdated);
    } catch (error) {
        handleError(res, error);
    }
};

const remove = async (req, res) => {
    try {
        const productFilter = {
            id: req.params.id,
            user_id: req.user.id,
        };

        const productRemoved = await ProductDao.remove(productFilter);

        handleResponse(res, 200, productRemoved);
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    findAll: findAll,
    create: create,
    update: update,
    remove: remove,
};
