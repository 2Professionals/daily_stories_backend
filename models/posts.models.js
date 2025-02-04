const { Sequelize, DataTypes } = require('sequelize');

const {sequelize} = require('../database/db.js');

const posts = sequelize.define('posts', {
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      author_id: {
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
    posts,
    sequelize,
  };