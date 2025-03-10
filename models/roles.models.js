const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/db.js");

const roles = sequelize.define(
  "roles",
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

module.exports = {
  roles,
  sequelize,
};
