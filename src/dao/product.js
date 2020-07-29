const sequelize = require('../db');
const Product = sequelize.model('product');

const create = (productBody) => {
    return Product.create(productBody);
};

const findAll = (productFilter) => {
    return Product.findAll({
        where: productFilter,
        raw: true,
    });
};

const update = (productFilter, productBody) => {
    return Product.update(productBody, {
        where: productFilter,
    });
};

const remove = (productFilter) => {
    return Product.destroy({
        where: productFilter,
    });
};

module.exports = {
    findAll: findAll,
    create: create,
    update: update,
    remove: remove,
};
