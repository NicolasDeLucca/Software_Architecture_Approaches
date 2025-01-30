'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clientes', {
      IdCliente: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      NombreApellido: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Clientes');
  },
};
