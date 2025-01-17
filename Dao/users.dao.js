// const mus_users = require("../models/users.models");

// class mus_usersDao {
//   async getAllUsers(req, res, next) {
//     try {
//       const get_all_users_query = `SELECT * FROM mus_users WHERE role = 'user' ORDER BY user_id ASC`;

//       const get_all_users_data = await mus_users.sequelize.query(
//         get_all_users_query,
//         {
//           type: mus_users.sequelize.QueryTypes.SELECT,
//         }
//       );

//       if (get_all_users_data) {
//         res.status(200).json({
//           status: true,
//           Data: get_all_users_data,
//           message: "Retrieved successfully",
//         });
//       } else {
//         res.json({
//           status: false,
//           Data: [],
//           message: "Failed to retrieve data",
//         });
//       }
//     } catch (error) {
//       return next(error);
//     }
//   }
//   async getUserById(req, res, next) {
//     let params = req.params.params;
//     params = params && params.length ? JSON.parse(params) : {};

//     const id = params.id;

//     try {
//       const get_user_by_id_query = `SELECT * FROM mus_users WHERE user_id = ${id} AND active='Y'`;

//       const get_usr_by_id_data = await mus_users.sequelize.query(
//         get_user_by_id_query,
//         {
//           type: mus_users.sequelize.QueryTypes.SELECT,
//         }
//       );

//       if (get_usr_by_id_data) {
//         res.status(200).json({
//           status: true,
//           Data: get_usr_by_id_data,
//           message: "Retrieved successfully",
//         });
//       } else {
//         res.json({
//           status: false,
//           Data: [],
//           message: "Failed to retrieve data",
//         });
//       }
//     } catch (error) {
//       return next(error);
//     }
//   }

//   async getAdmin(req, res, next) {
//     try {
//       const get_admin_query = `SELECT * FROM mus_users WHERE role = 'admin' ORDER BY user_id ASC`;
//       const get_admin_data = await mus_users.sequelize.query(get_admin_query, {
//         type: mus_users.sequelize.QueryTypes.SELECT,
//       });
//       if (get_admin_data) {
//         res.status(200).json({
//           status: true,
//           Data: get_admin_data,
//           message: "Retrieved successfully",
//         });
//       } else {
//         res.json({
//           status: false,
//           Data: [],
//           message: "Failed to retrieve data",
//         });
//       }
//     } catch (error) {
//       return next(error);
//     }
//   }
// }

// module.exports = mus_usersDao;
