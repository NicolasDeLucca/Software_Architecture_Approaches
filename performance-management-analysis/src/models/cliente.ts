import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class Cliente extends Model {
    static associate(models: any) {
      Cliente.hasMany(models.Factura, { foreignKey: 'IdCliente', as: 'facturas' });
    }
  }

  Cliente.init({
    IdCliente: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    NombreApellido: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Cliente',
    timestamps: false,
  });

  return Cliente;
};
