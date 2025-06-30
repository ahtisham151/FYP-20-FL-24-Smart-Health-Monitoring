class ProfileController {
  constructor() {
    this.service = require("../../services/users/profile-service"); // Adjust path if needed
  }

  // Create Profile (for both user and business)
  async createProfile(req, res) {
    await this.service.createProfile(req, res);
  }

  // Update Profile (for both user and business)
  async updateProfile(req, res) {
    await this.service.updateProfile(req, res);
  }

  async generateUserReport(req, res) {
    await this.service.generateUserReport(req, res);
  }

  // Delete Account
  async deleteAccount(req, res) {
    await this.service.deleteAccount(req, res);
  }

  // Logout
  async logout(req, res) {
    await this.service.logoutService(req, res);
  }

  // Get My Profile
  async getMyProfile(req, res) {
    await this.service.getMyProfile(req, res);
  }
}

module.exports = new ProfileController();
