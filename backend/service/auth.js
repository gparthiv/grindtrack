const jwt = require("jsonwebtoken");

const key = process.env.JWT_SECRET;

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    key,
    {
      expiresIn: "7d",
    }
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, key);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};