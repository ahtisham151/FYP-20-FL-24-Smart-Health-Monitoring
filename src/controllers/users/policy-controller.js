const service = require("../../services/users/policy-service");

class PolicyController {
  createOrUpdatePolicy = async (req, res) => {
    await service.upsertPolicy(req, res);
  };

  getPolicy = async (req, res) => {
    await service.getPolicy(req, res);
  };

  getAllPolicies = async (req, res) => {
    await service.getAllPolicies(req, res);
  };

  deletePolicy = async (req, res) => {
    await service.deletePolicy(req, res);
  };
}

module.exports = new PolicyController();
