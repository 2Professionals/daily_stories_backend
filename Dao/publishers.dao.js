// const publishers = require("../models/publishers.models");

// class publishersDao {

//   async getAllPublishers(req, res, next) {

//       try {
//       const get_all_publishers_query = "SELECT * FROM publishers WHERE active= 'Y' ";
//       const get_all_publishers_data = await publishers.sequelize.query(
//         get_all_publishers_query,
//         {
//           type: publishers.sequelize.QueryTypes.SELECT,
//         }
//       );
//       if (get_all_publishers_data) {
//         res.status(200).json({
//           status: true,
//           Data: get_all_publishers_data,
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

// module.exports = publishersDao;
