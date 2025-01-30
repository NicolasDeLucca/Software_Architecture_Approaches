import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Factura extends Model {
    static associate(models: any) {
      Factura.belongsTo(models.Cliente, { foreignKey: 'IdCliente', as: 'cliente' });
      Factura.hasMany(models.DetalleFactura, { foreignKey: 'IdVenta', as: 'detalleFacturas' });
    }
  }

  Factura.init({
    IdVenta: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    FechaVenta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    IdCliente: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Cliente',
        key: 'IdCliente',
      },
    },
    TotalVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Factura',
    timestamps: false
  });

  return Factura;
};
