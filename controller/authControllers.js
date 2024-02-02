const User = require("../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({
        erros: [{ msg: "User Not found" }],
      });
    }
    return res.status(200).json({
      sucess: true,
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

exports.postAuth = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: [
        {
          msg: errors.array(),
        },
      ],
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        errors: [
          {
            msg: "Invalid Credentials ",
          },
        ],
      });
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        errors: [
          {
            msg: "Invalid Credentials ",
          },
        ],
      });
    }
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
          sucess: true,
          message: "User registered",
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: [
        {
          msg: error.message,
        },
      ],
    });
  }
};
