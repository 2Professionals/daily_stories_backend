const categoriesDao = require("../Dao/categories.dao");

const categories_instance = new categoriesDao();

module.exports = {
  getAllCategories: function (req, res, next) {
    categories_instance.getAllCategories(req, res, next);
  },
  addCategory: function (req, res, next) {
    categories_instance.addCategory(req, res, next);
  },
};
