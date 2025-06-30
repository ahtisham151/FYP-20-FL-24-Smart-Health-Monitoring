const userSchema = {
  populate: [{ path: "profilePicture" }],
};

module.exports = userSchema;
