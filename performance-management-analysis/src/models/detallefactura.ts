import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class DetalleFactura extends Model {
    static associate(models: any) {
      DetalleFactura.belongsTo(models.Factura, { foreignKey: 'IdVenta', as: 'factura' });
      DetalleFactura.belongsTo(models.Producto, { foreignKey: 'IdProducto', as: 'producto' });
    }
  }

  DetalleFactura.init({
    IdDetalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IdVenta: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Factura',
        key: 'IdVenta',
      },
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IdProducto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'IdProducto',
      },
    },
    TotalProducto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DetalleFactura',
    timestamps: false
  });

  return DetalleFactura;
};
