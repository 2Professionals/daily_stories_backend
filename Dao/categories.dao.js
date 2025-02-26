const { categories } = require("../models/categories.models.js");

class categoriesDao {
  
  async addCategory(req, res, next) {
    try {
      const { category_name, active } = req.body;

      if (!category_name) {
        return res.status(400).json({
          status: false,
          message: "Category name is required",
        });
      }

      const newCategory = await categories.create({
        category_name,
        active: active || "Y",
      });

      return res.status(201).json({
        status: true,
        Data: newCategory,
        message: "Category created successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAllCategories(req, res, next) {
    try {
      const get_all_categories_query =
        "SELECT * FROM categories WHERE active= 'Y' ORDER BY category_id ASC";
      const get_all_categories_data = await categories.sequelize.query(
        get_all_categories_query,
        {
          type: categories.sequelize.QueryTypes.SELECT,
        }
      );
      if (get_all_categories_data) {
        res.status(200).json({
          status: true,
          Data: get_all_categories_data,
          message: "Retrieved successfully",
        });
      } else {
        res.json({
          status: false,
          Data: [],
          message: "Failed to retrieve data",
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = categoriesDao;
