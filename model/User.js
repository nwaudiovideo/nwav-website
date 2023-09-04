const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  displayName: { type: String },

  googleProfile: {
    profileImage: { type: String },
  },
});

module.exports = mongoose.model("User", UserSchema);
