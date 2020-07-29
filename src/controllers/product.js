const ProductDao = require('../dao/product');
const { to, handleResponse, handleError } = require('../utils');

const create = async (req, res) => {
    try {
        const productBody = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            user_id: req.user.id,
        };

        const [errorOnCreateProduct, productCreated] = await to(ProductDao.create(productBody));

        if (errorOnCreateProduct) {
            return handleError(res, errorOnCreateProduct);
        }

        handleResponse(res, {
            product: productCreated,
        });
    } catch (error) {
        handleError(res, error);
    }
};

const findAll = async (req, res) => {
    try {
        const productFilter = {
            user_id: req.user.id,
        };

        const [errorOnFindProducts, products] = await to(ProductDao.findAll(productFilter));

        if (errorOnFindProducts) {
            return handleError(res, errorOnFindProducts);
        }

        handleResponse(res, {
            products: products,
        });
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

        const [errorOnUpdateProduct, productUpdated] = await to(ProductDao.update(productFilter, productBody));

        if (errorOnUpdateProduct) {
            return handleError(res, errorOnUpdateProduct);
        }

        handleResponse(res, {
            updated: productUpdated,
        });
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

        const [errorOnRemoveProduct, productRemoved] = await to(ProductDao.remove(productFilter));

        if (errorOnRemoveProduct) {
            return handleError(res, errorOnRemoveProduct);
        }

        handleResponse(res, {
            removed: productRemoved,
        });
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
