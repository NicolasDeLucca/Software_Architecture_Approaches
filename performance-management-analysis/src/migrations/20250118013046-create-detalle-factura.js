'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleFacturas', {
      IdDetalle: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IdVenta: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Facturas',
          key: 'IdVenta',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      IdProducto: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'IdProducto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      TotalProducto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('DetalleFacturas');
  },
};
