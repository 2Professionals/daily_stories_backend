const bcrypt = require("bcryptjs");
const { users } = require("../models/users.models");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.AUTH_SECRET_KEY;

class usersDao {
  async getAllUsers(req, res, next) {
    try {
      let limit = req.query.limit ? parseInt(req.query.limit) : null;
      const offset = parseInt(req.query.offset) || 0;

      const get_all_users_query = `
      SELECT users.user_id, users.user_username, users.user_name,
             users.user_lastname, users.user_email, roles.role_name
      FROM users 
      LEFT JOIN roles ON roles.role_id = users.role_id
      WHERE users.active = 'Y' AND roles.active = 'Y'
      ORDER BY user_id ASC
      ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ""}`;

      const get_all_users_data = await users.sequelize.query(
        get_all_users_query,
        {
          type: users.sequelize.QueryTypes.SELECT,
        }
      );

      const totalCountQuery = `SELECT COUNT(*) as total FROM users WHERE active = 'Y'`;
      const totalCountResult = await users.sequelize.query(totalCountQuery, {
        type: users.sequelize.QueryTypes.SELECT,
      });

      const total = totalCountResult[0]?.total || 0;

      res.status(200).json({
        status: true,
        data: get_all_users_data,
        total: total,
        message: "Retrieved successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAllInactiveUsers(req, res, next) {
    try {
      const get_all_inactive_users_query = `SELECT users.user_id,
                                    users.user_username,
                                    users.user_name,
                                    users.user_lastname,
                                    users.user_email,
                                    roles.role_name
                                    FROM users 
                                    LEFT JOIN roles 
                                    ON roles.role_id = users.role_id
                                    WHERE users.active = 'N' or roles.active='N'
                                    ORDER BY user_id ASC`;
      const get_all_inactive_users_data = await users.sequelize.query(
        get_all_inactive_users_query,
        {
          type: users.sequelize.QueryTypes.SELECT,
        }
      );

      if (get_all_inactive_users_data) {
        res.status(200).json({
          status: true,
          data: get_all_inactive_users_data,
          message: "Retrieved successfully",
        });
      } else {
        res.json({
          status: false,
          data: [],
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
          data: get_usr_by_id_data,
          message: "Retrieved successfully",
        });
      } else {
        res.json({
          status: false,
          data: [],
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
          data: get_admin_data,
          message: "Retrieved successfully",
        });
      } else {
        res.json({
          status: false,
          data: [],
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

    if (!user_email || !user_password) {
      return res
        .status(400)
        .json({ status: false, message: "Email and password are required." });
    }

    try {
      const get_user_query = `SELECT users.user_id,
          users.user_username, 
          users.user_name, 
          users.user_lastname, 
          users.user_email, 
          users.user_password, 
          roles.role_name 
          FROM users 
          left join roles
          on users.role_id = roles.role_id
          WHERE user_email = :user_email
          AND users.active = 'Y'
          LIMIT 1 `;
      const [user] = await users.sequelize.query(get_user_query, {
        replacements: { user_email },
        type: users.sequelize.QueryTypes.SELECT,
      });

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid email or password." });
      }

      const isPasswordValid = await bcrypt.compare(
        user_password,
        user.user_password
      );

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ status: false, message: "Invalid email or password." });
      }

      const token = jwt.sign(
        { user_id: user.user_id, role: user.user_role },
        SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        status: true,
        data: user,
        message: "Login successful",
        token,
      });
    } catch (error) {
      return next(error);
    }
  }

  async addNewUser(req, res, next) {
    try {
      const {
        user_username,
        user_name,
        user_lastname,
        user_email,
        user_password,
      } = req.body;
  
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
        replacements: { user_username, user_name, user_lastname, user_email, user_password: hashedPassword },
        type: users.sequelize.QueryTypes.INSERT,
      });
  
      if (!add_new_user_data || !add_new_user_data[0] || !add_new_user_data[0][0]) {
        return res.status(500).json({
          status: false,
          message: "Failed to add user",
        });
      }
  
      const newUser = add_new_user_data[0][0];
  
      const get_user_query = `
        SELECT users.user_id, 
               users.user_username, 
               users.user_name, 
               users.user_lastname,
               users.user_password, 
               users.user_email, 
               roles.role_name 
        FROM users 
        LEFT JOIN roles ON users.role_id = roles.role_id
        WHERE users.user_email = :user_email
        AND users.active = 'Y'
        LIMIT 1;
      `;
  
      const [user] = await users.sequelize.query(get_user_query, {
        replacements: { user_email: newUser.user_email },
        type: users.sequelize.QueryTypes.SELECT,
      });
  
      if (!user) {
        return res.status(500).json({
          status: false,
          message: "Failed to retrieve user details",
        });
      }
  
      const token = jwt.sign(
        {
          user_id: user.user_id,
          role: user.role_name,
        },
        SECRET_KEY,
        { expiresIn: "24h" }
      );
      
      return res.status(201).json({
        status: true,
        data: user,
        message: "User added successfully",
        token,
      });
  
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

  async getUserStatistics(req, res, next) {
    try {
      const query = `
        SELECT 
          (SELECT COUNT(*) FROM users) AS total_users,
          (SELECT COUNT(*) FROM users WHERE active='Y') AS active_users,
          (SELECT COUNT(*) FROM users WHERE active='N') AS inactive_users,
          (SELECT COUNT(*) FROM users 
            LEFT JOIN roles ON users.role_id = roles.role_id 
            WHERE roles.role_name = 'admin' OR roles.role_name = 'super admin') AS admins_count
      `;

      const result = await users.sequelize.query(query, {
        type: users.sequelize.QueryTypes.SELECT,
      });

      if (result.length > 0) {
        res.status(200).json({
          status: true,
          data: {
            total_users: Number(result[0].total_users),
            active_users: Number(result[0].active_users),
            inactive_users: Number(result[0].inactive_users),
            admins_count: Number(result[0].admins_count),
          },
          message: "Retrieved successfully",
        });
      } else {
        res.json({
          status: false,
          data: {},
          message: "Failed to retrieve data",
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  async requestPublisherStatus(req, res, next) {
    try {
      const userId = req.body.user_id;
      console.log("userId", userId);
      console.log("req.body", req.body);
  
      // Update the publisher request in the users table
      const update_publisher_request_query = `
        UPDATE users
        SET publisher_request = true
        WHERE user_id = ${userId}
      `;
      // await sequelize.query(updateQuery, {
      //   replacements: { userId },
      //   type: sequelize.QueryTypes.UPDATE,
      // });

      const update_publisher_request_data = await users.sequelize.query(update_publisher_request_query, {
        type: users.sequelize.QueryTypes.UPDATE,
      });
  console.log("update_publisher_request_data", update_publisher_request_data);
  
      // Insert a new notification into the notifications table
      const insert_notification_query = `
        INSERT INTO notifications (user_id, message)
        VALUES (${userId}, 'User has requested publisher status.')
      `;
      // await sequelize.query(insertQuery, {
      //   replacements: { userId },
      //   type: sequelize.QueryTypes.INSERT,
      // });

      const insert_notification_data = await users.sequelize.query(insert_notification_query, {
        replacements: { userId },
        type: users.sequelize.QueryTypes.INSERT,
      });
      console.log("insert_notification_data", insert_notification_data);
      
  
      res.status(200).json({
        status: true,
        message: "Request sent to admin.",
      });
    } catch (error) {
      return next(error);
    }
  }
  
}

module.exports = usersDao;
