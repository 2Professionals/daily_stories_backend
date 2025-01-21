const usersDao = require("../Dao/users.dao");

const users_instance = new usersDao();

module.exports = {
  getAllUsers: function (req, res, next) {
    users_instance.getAllUsers(req, res, next);
  },
  getUserById: function (req, res, next) {
    users_instance.getUserById(req, res, next);
  },
  getAllAdmins: function (req, res, next) {
    users_instance.getAllAdmins(req, res, next);
  },
  addNewUser: function (req, res, next) {
    users_instance.addNewUser(req, res, next);
  },
};
