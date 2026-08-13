const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  const user = getUser(token);

  if (!user) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }

  req.user = user;

  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};