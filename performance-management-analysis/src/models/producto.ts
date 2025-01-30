import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Producto extends Model {
    static associate(models: any) {
      Producto.hasMany(models.DetalleFactura, { foreignKey: 'IdProducto', as: 'detalleFacturas' });
    }
  }

  Producto.init({
    IdProducto: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    Descripcion: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    PrecioUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Existencia: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Producto',
    timestamps: false,
  });

  return Producto;
};
