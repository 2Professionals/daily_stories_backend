const { Sequelize, DataTypes } = require('sequelize');

const {sequelize} = require('../database/db.js');

const mus_users = sequelize.define('mus_users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Y'
  },
  role:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  timestamps: true,
});

module.exports = {
  mus_users,
  sequelize,
};
