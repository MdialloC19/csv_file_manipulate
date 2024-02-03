const User = require("../models/users");
const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc get user from database by his email
 * @method
 * @return a user
 */

exports.getAllUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        erros: [{ msg: "User Not found" }],
      });
    }
    return res.status(200).json({
      succed: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errors: [
        {
          msg: error.message,
        },
      ],
    });
  }
};

exports.postOneUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  // console.log(req.body);

  const { name, email, password } = req.body;

  try {
    //verify if use exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        erros: [{ msg: "User already exists" }],
      });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "404",
    });
    user = new User({
      name,
      email,
      avatar,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // console.log(user.password);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.mySecret,
      {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({
          token,
          succed: true,
          message: "User registered",
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      succed: false,
      error: [error.message],
    });
  }
};

exports.putOnUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      succed: false,
      errors: errors.array(),
    });
  }
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        succed: false,
        erros: [{ msg: "User Not found" }],
      });
    }
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    // if (password) updateFields.password = await bcrypt.hash(password, salt);
    if (password) {
      const isPreviousPassword = user.previousPasswords.some(
        async (prevPassword) => {
          return await bcrypt.compare(password, prevPassword);
        }
      );
      if (isPreviousPassword) {
        return res.status(406).json({
          succed: false,
          erros: [{ msg: "The new password is a previous password" }],
        });
      } else {
        console.log(password);
        user.previousPasswords.push(user.password);
        updateFields.password = await bcrypt.hash(password, salt);
        updateFields.previousPasswords = user.previousPasswords;
      }
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        succed: false,
        errors: [{ msg: "No field to update" }],
      });
    }
    console.log(updateFields);
    const updatedUser = await User.findByIdAndUpdate(user.id, updateFields, {
      new: false,
    });
    if (updatedUser === null) {
      return res.status(404).json({
        succed: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      succed: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succed: false,
      error: [error.message],
    });
  }
};
