const notificationsDao = require("../Dao/notifications.dao");

const notifications_instance = new notificationsDao();

module.exports = {
    getAllNotifications: function (req, res, next) {
    notifications_instance.getAllNotifications(req, res, next);
  },
};
