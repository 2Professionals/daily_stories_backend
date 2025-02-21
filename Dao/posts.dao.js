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
      // Extract data from the request body
      const { title, content, image_id, author_id, category_id } = req.body;
  
      // Check if the required fields are provided
      if (!title || !content || !author_id || !category_id) {
        return res.status(400).json({
          status: false,
          message: "Missing required fields",
        });
      }
  
      // Prepare the insert query with dynamic data from the request body
      const add_post_query = `
        INSERT INTO posts (title, content, image_id, author_id, category_id) 
        VALUES (:title, :content, :image_id, :author_id, :category_id)
      `;
  
      // Execute the query with the provided data
      const add_post_data = await posts.sequelize.query(add_post_query, {
        replacements: {
          title,
          content,
          image_id: image_id || null, // Handle optional image_id
          author_id,
          category_id,
        },
        type: posts.sequelize.QueryTypes.INSERT,
      });
  
      // Check if the insert was successful and return an appropriate response
      if (add_post_data) {
        res.status(200).json({
          status: true,
          message: "Post added successfully",
          data: add_post_data, // You may return the inserted post or just a success message
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Failed to add post",
        });
      }
    } catch (error) {
      // Error handling
      return next(error);
    }
  }
    
}

module.exports = postsDao;
