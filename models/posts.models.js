const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db.js");

const posts = sequelize.define(
  "posts",
  {
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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "category_id",
      },
      onDelete: "CASCADE",
    },
    active: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Y",
    },
  },
  {
  }
);

const categories = require("./categories.models.js");

posts.associate = function (models) {
  posts.belongsTo(models.categories, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
  });
};

// posts.sync({ force: true }) // ⚠️ This will delete all data in the posts table
//   .then(() => {
//     console.log("Posts table updated!");
//   })
//   .catch((err) => console.error(err));

module.exports = {
  posts,
  sequelize,
};
