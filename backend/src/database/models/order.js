const moment = require('moment');

/**
 * Order database model.
 * See https://sequelize.org/v5/manual/models-definition.html to learn how to customize it.
 */
module.exports = function(sequelize, DataTypes) {
  const order = sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      delivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  order.associate = (models) => {
    models.order.belongsTo(models.customer, {
      as: 'customer',
      constraints: false,
    });

    models.order.belongsToMany(models.product, {
      as: 'products',
      constraints: false,
      through: 'orderProductsProduct',
    });

    models.order.belongsTo(models.user, {
      as: 'employee',
      constraints: false,
    });

    models.order.hasMany(models.file, {
      as: 'attachments',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.order.getTableName(),
        belongsToColumn: 'attachments',
      },
    });

    models.order.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.order.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return order;
};
