const Policy = require("../../models/Policy");
const { handlers } = require("../../utilities/handlers/handlers");

class PolicyService {
  // Create or Update a Policy (Terms & Conditions / Privacy Policy)
  async upsertPolicy(req, res) {
    try {
      const { title, content, version } = req.body;

      if (!title || !content) {
        return handlers.response.failed({
          res,
          message: "Title and content are required.",
        });
      }

      const updatedPolicy = await Policy.findOneAndUpdate(
        { title }, // Find by title (Terms & Conditions / Privacy Policy)
        { content, version },
        { new: true, upsert: true }
      );

      return handlers.response.success({
        res,
        message: "Policy updated successfully.",
        data: updatedPolicy,
      });
    } catch (error) {
      return handlers.response.error({ res, error });
    }
  }

  // Get a specific policy by title
  async getPolicy(req, res) {
    try {
      const { title } = req.query;

      const policy = await Policy.findOne({ title });

      if (!policy) {
        return handlers.response.failed({
          res,
          message: `${title} policy not found.`,
        });
      }

      return handlers.response.success({
        res,
        message: "Policy retrieved successfully.",
        data: policy,
      });
    } catch (error) {
      return handlers.response.error({ res, error });
    }
  }

  // Get all policies
  async getAllPolicies(req, res) {
    try {
      const policies = await Policy.find();

      if (!policies.length) {
        return handlers.response.failed({
          res,
          message: "No policies found.",
        });
      }

      return handlers.response.success({
        res,
        message: "All policies retrieved successfully.",
        data: policies,
      });
    } catch (error) {
      return handlers.response.error({ res, error });
    }
  }

  // Delete a policy by title
  async deletePolicy(req, res) {
    try {
      const { title } = req.params;

      const deletedPolicy = await Policy.findOneAndDelete({ title });

      if (!deletedPolicy) {
        return handlers.response.failed({
          res,
          message: `${title} policy not found.`,
        });
      }

      return handlers.response.success({
        res,
        message: "Policy deleted successfully.",
      });
    } catch (error) {
      return handlers.response.error({ res, error });
    }
  }
}

module.exports = new PolicyService();
