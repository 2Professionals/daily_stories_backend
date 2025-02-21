const postsDao = require("../Dao/posts.dao");

const posts_instance = new postsDao();

module.exports = {
  getAllPosts: function (req, res, next) {
    posts_instance.getAllPosts(req, res, next);
  },
  addPost: function (req, res, next) {
    posts_instance.addPost(req, res, next);
  },
};
