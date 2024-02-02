const User = require("../models/users");

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
