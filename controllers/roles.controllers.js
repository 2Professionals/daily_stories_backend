const rolesDao = require("../Dao/roles.dao");

const roles_instance = new rolesDao();

module.exports = {
  getAllRoles: function (req, res, next) {
    roles_instance.getAllRoles(req, res, next);
  },
};
