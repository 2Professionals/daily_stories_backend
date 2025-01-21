const { Sequelize, DataTypes } = require('sequelize');

const {sequelize} = require('../database/db.js');

const roles = sequelize.define('roles', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  active:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Y'
  }
}, {
  timestamps: true,
});

module.exports = {
  roles,
  sequelize,
};
