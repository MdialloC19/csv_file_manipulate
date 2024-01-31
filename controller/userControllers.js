const User = require("../models/users");
const { check, validationResult } = require("express-validator");
const gravitar = require("gravitar");

/**
 * @desc get user from database by his email
 * @method
 * @return a user
 */

// module.exports = async (req,res) => {

//     const
// };

exports.postOneUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { name, email, password } = req.body;

  try {
    //verify if use exist
    let user = await User.findOne(email);
    if (user) {
      return res.status(400).json({
        erros: [{ msg: "User already exists" }],
      });
    }
    user = new User({
      name,
      email,
      avatar,
      password,
    });

    user.avatar = gravitar.url(email, {
      s: "200",
      r: "pg",
      d: "404",
    });

    const salt = await bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(password, salt);
    await user.save();
  } catch (error) {
    console.log(errors);
    return res.status(500).json({
      errors: [{ msg: errors.message() }],
    });
  }
};
