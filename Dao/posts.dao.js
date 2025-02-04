const posts = require("../models/posts.models");

class postsDao {

  async getAllPosts(req, res, next) {

      try {
      const get_all_posts_query = "SELECT * FROM posts WHERE active= 'Y' ";
      const get_all_posts_data = await posts.sequelize.query(
        get_all_posts_query,
        {
          type: posts.sequelize.QueryTypes.SELECT,
        }
      );
      if (get_all_posts_data) {
        res.status(200).json({
          status: true,
          Data: get_all_posts_data,
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

module.exports = postsDao;
