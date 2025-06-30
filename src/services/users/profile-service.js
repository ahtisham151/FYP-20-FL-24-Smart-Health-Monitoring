const User = require("../../models/User");
const { handlers } = require("../../utilities/handlers/handlers");

class UnifiedProfileService {
  // Create profile
  async createProfile(req, res) {
    try {
      const userId = req.user?._id;
      const user = await User.findById(userId);
      if (!user) return this._handleError(res, "User not found.");
      if (user.profileCompleted) {
        return handlers.response.success({
          res,
          message: "Profile already completed.",
          data: user,
        });
      }

      const profilePicture = req.file?.path || user.profilePicture;

      const {
        bloodPressure,
        cholesterol,
        chestPain,
        diabetes,
        electrocardiogramVariation,
      } = req.body;

      Object.assign(user, {
        bloodPressure,
        cholesterol,
        chestPain,
        diabetes,
        electrocardiogramVariation,
        profilePicture,
        profileCompleted: true,
      });

      await user.save();

      return handlers.response.success({
        res,
        message: "Profile created successfully.",
        data: user,
      });
    } catch (error) {
      return this._handleError(res, error.message);
    }
  }

  // Update profile
  async updateProfile(req, res) {
    try {
      const userId = req.user?._id;
      const user = await User.findById(userId);
      if (!user) return this._handleError(res, "User not found.");

      const profilePicture = req.file?.path;

      const updatableFields = [
        "bloodPressure",
        "cholesterol",
        "chestPain",
        "diabetes",
        "electrocardiogramVariation",
      ];

      updatableFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      });

      if (profilePicture) {
        user.profilePicture = profilePicture;
      }

      await user.save();

      return handlers.response.success({
        res,
        message: "Profile updated successfully.",
        data: user,
      });
    } catch (error) {
      return this._handleError(res, error.message);
    }
  }

  // Generate full report
  async generateUserReport(req, res) {
    try {
      const user = await User.findById(req.user._id).select(
        "Name  age gender  bloodPressure cholesterol chestPain diabetes electrocardiogramVariation "
      );

      if (!user) return this._handleError(res, "User not found.");

      return handlers.response.success({
        res,
        message: "User health report generated successfully.",
        data: user,
      });
    } catch (error) {
      return this._handleError(res, error.message);
    }
  }

  // Delete account
  async deleteAccount(req, res) {
    try {
      const userId = req.user?._id;
      const user = await User.findById(userId);
      if (!user) return this._handleError(res, "User not found.");

      await User.findByIdAndDelete(userId);

      return handlers.response.success({
        res,
        message: "Account deleted successfully.",
      });
    } catch (error) {
      return this._handleError(res, error.message);
    }
  }

  // Get profile
  async getMyProfile(req, res) {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return this._handleError(res, "User not found.");

      return handlers.response.success({
        res,
        message: "Profile fetched successfully.",
        data: user,
      });
    } catch (error) {
      return this._handleError(res, error.message);
    }
  }

  // Logout
  async logoutService(req, res) {
    try {
      res.clearCookie("authorization");
      const user = await User.findById(req.user._id);
      if (!user) return this._handleError(res, "User not found.");

      user.token = "";
      await user.save();

      return handlers.response.success({
        res,
        message: "Logged out successfully",
      });
    } catch (error) {
      return this._handleError(res, error.message);
    }
  }

  _handleError(res, message) {
    console.error("ProfileService Error:", message);
    return handlers.response.failed({ res, message });
  }
}

module.exports = new UnifiedProfileService();
