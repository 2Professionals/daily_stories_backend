const { Sequelize, DataTypes } = require('sequelize');

const {sequelize} = require('../database/db.js');

const users = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_lastname: {
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
  user_role:{
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
  users,
  sequelize,
};
