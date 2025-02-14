const categories = require("../models/categories.models");

class categoriesDao {

  async getAllCategories(req, res, next) {

      try {
      const get_all_categories_query = "SELECT * FROM categories WHERE active= 'Y' ";
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
