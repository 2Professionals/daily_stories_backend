const notifications = require("../models/notifications.models");

class notificationsDao {

  async getAllNotifications(req, res, next) {

      try {
      const get_all_notifications_query = "SELECT * FROM notifications ";
      const get_all_notifications_data = await notifications.sequelize.query(
        get_all_notifications_query,
        {
          type: notifications.sequelize.QueryTypes.SELECT,
        }
      );
      if (get_all_notifications_data) {
        res.status(200).json({
          status: true,
          data: get_all_notifications_data,
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
    
}

module.exports = notificationsDao;
