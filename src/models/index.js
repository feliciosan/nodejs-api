module.exports = (sequelize, DataTypes) => {
    const UserModel = require('./user');
    const ProductModel = require('./product');

    const models = {};

    models.user = UserModel(sequelize, DataTypes);

    models.product = ProductModel(sequelize, DataTypes);
    models.product.belongsTo(models.user, {
        foreignKey: 'user_id',
    });
};
