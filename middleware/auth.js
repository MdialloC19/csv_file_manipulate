const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get token from the header
  const token = req.header("x-auth-token");

  //   Check if not token
  if (!token) {
    return res.status(401).json({
      errors: [{ msg: "No token, authorization denied" }],
    });
  }

  //   verify if token is valid

  try {
    const decoded = jwt.verify(token, process.env.mySecret);
    req.user = decoded.user;
    next();
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
