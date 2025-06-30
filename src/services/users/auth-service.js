const bcrypt = require("bcrypt");
const User = require("../../models/User");
const userSchema = require("../../schemas/user-schema");
const { handlers } = require("../../utilities/handlers/handlers");
const generateToken = require("../../utilities/generators/token-generator");

const SALT_ROUNDS = 10; // for bcrypt hashing

class Service {
  constructor() {
    this.user = User;
  }

  // Sign up (Create new user)
  async signUp(req, res) {
    try {
      const {
        name,
        email,
        password,
        gender,
        age,
        termsAndConditions,
        privacyPolicy,
      } = req.body;

      // Check required fields
      if (!name || !email || !password || !gender || !age) {
        return handlers.response.error({
          res,
          message: "All fields are required",
        });
      }

      // Check if user already exists with email
      const existingUser = await this.user.findOne({
        email: email.toLowerCase(),
      });
      if (existingUser) {
        return handlers.response.error({
          res,
          message: "Email already registered",
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create new user
      const newUser = new this.user({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        gender,
        age,
        termsAndConditions,
        privacyPolicy,
      });

      await newUser.save();
      await newUser.populate(userSchema.populate);

      handlers.logger.success({
        message: "User signed up successfully",
        data: newUser,
      });

      return handlers.response.success({
        res,
        message: "User signed up successfully",
        data: newUser,
      });
    } catch (error) {
      handlers.logger.error({ message: error });
      return handlers.response.error({ res, message: error.message });
    }
  }

  // Sign in (login with email + password)
  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return handlers.response.error({
          res,
          message: "Email and password are required",
        });
      }

      const user = await this.user.findOne({ email: email.toLowerCase() });
      if (!user) {
        return handlers.response.error({
          res,
          message: "Invalid email or password",
        });
      }

      // Compare password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return handlers.response.error({
          res,
          message: "Invalid email or password",
        });
      }

      // Generate session token
      const token = generateToken({ _id: user._id, res });
      user.sessionToken = token;
      await user.save();
      await user.populate(userSchema.populate);

      handlers.logger.success({
        message: "User signed in successfully",
        data: user,
      });

      return handlers.response.success({
        res,
        message: "User signed in successfully",
        data: user,
      });
    } catch (error) {
      handlers.logger.error({ message: error });
      return handlers.response.error({ res, message: error.message });
    }
  }
}

module.exports = new Service();
