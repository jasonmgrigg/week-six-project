'use strict';
module.exports = function(sequelize, DataTypes) {
  var entries = sequelize.define('entries', {
    entry: DataTypes.STRING
  }, {});
  entries.associate = function(models) {
    entries.belongsTo(models.users,{as: 'users', foreignKey: 'userId'})
  }
  return entries;
};
