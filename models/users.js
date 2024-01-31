const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill the name"],
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "Please give the email"],
  },
  password: {
    type: String,
    required: [true, "Please give the password"],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model("user", UserSchema);
