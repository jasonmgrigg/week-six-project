'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'entries',
      'title',
      {
        type: Sequelize.STRING,
        allowNull: true,

      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'entries',
      'title'
    )
  }
  };
