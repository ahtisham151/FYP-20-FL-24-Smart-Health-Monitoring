class Controller {
  constructor() {
    this.service = require("../../services/users/auth-service");
  }

  async signUp(req, res) {
    await this.service.signUp(req, res);
  }

  async signIn(req, res) {
    await this.service.signIn(req, res);
  }
}

module.exports = new Controller();
