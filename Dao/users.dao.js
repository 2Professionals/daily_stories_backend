const bcrypt = require('bcryptjs');
const users = require("../models/users.models");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.AUTH_SECRET_KEY;


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

  // async addNewUser(req, res, next) {
  //   let params = req.params.params;
  //   params = params && params.length ? JSON.parse(params) : {};

  //   try {
  //     const { user_username, user_name, user_lastname, user_email, user_password } = req.body;
  
  //     if (!user_username || !user_name || !user_lastname || !user_email || !user_password) {
  //       return res.status(400).json({
  //         status: false,
  //         message: "All fields are required",
  //       });
  //     }
  
  //     const add_new_user_query = `
  //       INSERT INTO users (user_username, user_name, user_lastname, user_email, user_password)
  //       VALUES (:user_username, :user_name, :user_lastname, :user_email, :user_password)
  //       RETURNING *;
  //     `;
  
  //     const add_new_user_data = await users.sequelize.query(add_new_user_query, {
  //       replacements: {
  //         user_username,
  //         user_name,
  //         user_lastname,
  //         user_email,
  //         user_password, // In production, hash this before storing!
  //       },
  //       type: users.sequelize.QueryTypes.INSERT,
  //     });
  
  //     if (add_new_user_data) {
  //       res.status(201).json({
  //         status: true,
  //         Data: add_new_user_data[0],
  //         message: "User added successfully",
  //       });
  //     } else {
  //       res.status(500).json({
  //         status: false,
  //         message: "Failed to add user",
  //       });
  //     }
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  async loginUser(req, res, next) {
    const { user_email, user_password } = req.body;    
    // console.log("re.body: ", req.body);
    
    if (!user_email || !user_password) {
      return res.status(400).json({ status: false, message: "Email and password are required." });
    }

    try {
      const get_user_query = `SELECT * FROM users WHERE user_email = :user_email AND active = 'Y' LIMIT 1`;      
      const [user] = await users.sequelize.query(get_user_query, {
        replacements: { user_email },
        type: users.sequelize.QueryTypes.SELECT,
      });

      if (!user) {
        return res.status(401).json({ status: false, message: "Invalid email or password." });
      }

      const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
      // console.log("user password (o):  ",typeof(user_password), " / ", user_password );
      // console.log("user password (from form):  ",typeof(user.user_password)," / ", user.user_password );
      // console.log("isPasswordValid -----> ", isPasswordValid);
      

      if (!isPasswordValid) {
        return res.status(401).json({ status: false, message: "Invalid email or password." });
      }

      const token = jwt.sign({ user_id: user.user_id, role: user.user_role }, SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        status: true,
        message: "Login successful",
        token,
      });
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

      const hashedPassword = await bcrypt.hash(user_password, 10);

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
          user_password: hashedPassword,
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

  // hash old passwords.
  async hashPasswords(req, res, next) {
    try {
      const get_users_query = `SELECT user_id, user_password FROM users WHERE user_password NOT LIKE '$%'`;
      const get_users_data = await users.sequelize.query(get_users_query, {
        type: users.sequelize.QueryTypes.SELECT,
      });
  
      if (!get_users_data || get_users_data.length === 0) {
        return res.status(200).json({
          status: true,
          message: "No plain-text passwords found to hash.",
        });
      }
  
      for (const user of get_users_data) {
        const hashedPassword = await bcrypt.hash(user.user_password, 10);
  
        const update_query = `UPDATE users SET user_password = ? WHERE user_id = ?`;
        await users.sequelize.query(update_query, {
          replacements: [hashedPassword, user.user_id],
          type: users.sequelize.QueryTypes.UPDATE,
        });
  
        console.log(`Password for user ${user.user_id} has been hashed.`);
      }
  
      return res.status(200).json({
        status: true,
        message: "Passwords have been successfully hashed and updated.",
      });
    } catch (error) {
      return next(error);
    }
  }
  
}

module.exports = usersDao;
