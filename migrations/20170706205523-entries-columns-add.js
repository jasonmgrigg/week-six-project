'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'entries',
      'date',
      {
        type: Sequelize.DATE,
        allowNull: true,

      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'entries',
      'date'
    )
  }
  };
