'use strict';
module.exports = function(sequelize, DataTypes) {
  var likes = sequelize.define('likes', {
    like: DataTypes.BOOLEAN
  }, {});
  likes.associate = function(models) {
    likes.belongsTo(models.entries,{as:'users', foreignKey: 'entryId'})
    likes.belongsTo(models.entries,{as:'entries', foreignKey: 'userId'})


  }
  return likes;
};
