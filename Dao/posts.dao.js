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

  async addPost(req, res, next) {
    try {
      const { title, content, image_id, author_id, category_id } = req.body;
  
      if (!title || !content || !author_id || !category_id) {
        return res.status(400).json({
          status: false,
          message: "Missing required fields",
        });
      }
  
      const newPost = await posts.posts.create({
        title,
        content,
        image_id: image_id || null,
        author_id,
        category_id,
      });
  
      res.status(201).json({
        status: true,
        message: "Post added successfully",
        data: newPost, 
      });
    } catch (error) {
      return next(error);
    }
  }
  
    
}

module.exports = postsDao;
