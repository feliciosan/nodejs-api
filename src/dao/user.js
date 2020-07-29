const sequelize = require('../db');
const User = sequelize.model('user');

const find = (userfilter) => {
    return User.findOne({
        where: userfilter,
        attributes: ['id', 'password'],
        raw: true,
    });
};

const count = (userFilter) => {
    return User.count({
        where: userFilter,
    });
};

const create = (userBody) => {
    return User.create(userBody);
};

module.exports = {
    find: find,
    create: create,
    count: count,
};
