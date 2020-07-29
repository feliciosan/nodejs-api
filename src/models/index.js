module.exports = (sequelize, DataTypes) => {
    const User = require('./user')(sequelize, DataTypes);
    const Product = require('./product')(sequelize, DataTypes);

    Product.belongsTo(User, { foreignKey: 'user_id' });
};
