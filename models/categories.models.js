const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db.js");

const categories = sequelize.define(
  "categories",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Y",
    },
  },
  {
    timestamps: true,
  }
);

const posts = require("./posts.models.js");

categories.associate = function (models) {
  categories.hasMany(models.posts, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });
};

module.exports = {
  categories,
  sequelize,
};
