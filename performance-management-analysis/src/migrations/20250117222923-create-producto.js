'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      IdProducto: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      Descripcion: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      PrecioUnitario: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      Existencia: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Productos');
  },
};
