const User = require("../models/User");
const { handlers } = require("../utilities/handlers/handlers");

const adminAuthorization = async (req, res, next) => {
  try {
    const current_user = req.user;

    const user = await User.findById(current_user._id);

    if (!user) {
      return handlers.logger.error({ message: "We cannot find this user" });
    }

    if (user.role !== "admin") {
      handlers.logger.unauthorized({
        message: "You are not authorized to access this resource"
      });
      return handlers.response.unauthorized({
        res,
        message: "You are not authorized to access this resource"
      });
    }

    handlers.logger.success({
      message: "Admin verification successful"
    });
    return next();
  } catch (error) {
    handlers.logger.error({ message: error });
    return handlers.response.error({
      res,
      message: "Failed to verify admin"
    });
  }
};

module.exports = adminAuthorization;
