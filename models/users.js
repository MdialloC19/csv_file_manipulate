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
  previousPasswords: [String],
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// UserSchema.pre("find", function () {
//   this.where({ isDeleted: false });
// });

// UserSchema.pre("findOne", function () {
//   this.where({ isDeleted: false });
// });

module.exports = User = mongoose.model("User", UserSchema);
