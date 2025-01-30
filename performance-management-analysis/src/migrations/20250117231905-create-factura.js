'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facturas', {
      IdVenta: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      FechaVenta: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      IdCliente: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Clientes', 
          key: 'IdCliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      TotalVenta: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Facturas');
  },
};
