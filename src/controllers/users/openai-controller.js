class Controller {
  constructor() {
    this.service = require("../../services/users/openai-service");
  }

  async proceedWithDiagnose(req, res) {
    await this.service.proceedWithDiagnose(req, res);
  }
}

module.exports = new Controller();
