const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../database/db.js");

const users = sequelize.define(
  "users",
  {
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
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

const roles = require("./roles.models.js");

users.prototype.modelIncludes = {
  roles: {
    model: roles,
  },
};
users.associate = function (models) {
  users.belongsTo(models.roles, {
    foreignKey: "role_id",
  });
};

module.exports = {
  users,
  sequelize,
};
