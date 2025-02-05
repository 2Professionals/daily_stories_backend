const { Sequelize, DataTypes } = require('sequelize');

const {sequelize} = require('../database/db.js');

const publishers = sequelize.define('publishers', {
    publisher_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'Y'
      },
});

module.exports = {
    publishers,
    sequelize,
  };