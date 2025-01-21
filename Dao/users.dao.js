// const bcrypt = require('bcrypt'); // to be user later to hash the password
const users = require("../models/users.models");

class usersDao {
  async getAllUsers(req, res, next) {
    try {
      const get_all_users_query = `SELECT * FROM users WHERE active = 'Y' ORDER BY user_id ASC`;

      const get_all_users_data = await users.sequelize.query(
        get_all_users_query,
        {
          type: users.sequelize.QueryTypes.SELECT,
        }
      );

      if (get_all_users_data) {
        res.status(200).json({
          status: true,
          Data: get_all_users_data,
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

  async getUserById(req, res, next) {
    let params = req.params.params;
    params = params && params.length ? JSON.parse(params) : {};

    const id = params.id;

    try {
      const get_user_by_id_query = `SELECT * FROM users WHERE user_id = ${id} AND active='Y'`;

      const get_usr_by_id_data = await users.sequelize.query(
        get_user_by_id_query,
        {
          type: users.sequelize.QueryTypes.SELECT,
        }
      );

      if (get_usr_by_id_data) {
        res.status(200).json({
          status: true,
          Data: get_usr_by_id_data,
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

  async getAllAdmins(req, res, next) {
    try {
      const get_admin_query = `SELECT * FROM users WHERE user_role = 'admin' AND active='Y' ORDER BY user_id ASC`;
      const get_admin_data = await users.sequelize.query(get_admin_query, {
        type: users.sequelize.QueryTypes.SELECT,
      });
      if (get_admin_data) {
        res.status(200).json({
          status: true,
          Data: get_admin_data,
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

  async addNewUser(req, res, next) {
    let params = req.params.params;
    params = params && params.length ? JSON.parse(params) : {};

    try {
      const { user_username, user_name, user_lastname, user_email, user_password } = req.body;
  
      if (!user_username || !user_name || !user_lastname || !user_email || !user_password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required",
        });
      }
  
      const add_new_user_query = `
        INSERT INTO users (user_username, user_name, user_lastname, user_email, user_password)
        VALUES (:user_username, :user_name, :user_lastname, :user_email, :user_password)
        RETURNING *;
      `;
  
      const add_new_user_data = await users.sequelize.query(add_new_user_query, {
        replacements: {
          user_username,
          user_name,
          user_lastname,
          user_email,
          user_password, // In production, hash this before storing!
        },
        type: users.sequelize.QueryTypes.INSERT,
      });
  
      if (add_new_user_data) {
        res.status(201).json({
          status: true,
          Data: add_new_user_data[0],
          message: "User added successfully",
        });
      } else {
        res.status(500).json({
          status: false,
          message: "Failed to add user",
        });
      }
    } catch (error) {
      return next(error);
    }
  }
  
  
}

module.exports = usersDao;
