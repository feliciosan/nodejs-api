module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        'product',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            price: {
                type: DataTypes.FLOAT,
            },
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );

    return Product;
};
