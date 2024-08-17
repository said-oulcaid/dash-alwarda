const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.id = decoded.id;
      req.isOwner = decoded.isOwner
      next();
    } catch (error) {
      res.status(401).json({ message: "Vous n'êtes pas connecté(e)!" });
    }
  } else {
    res.status(401).json({ message: "Vous n'êtes pas connecté(e)!" });
  }
}
module.exports = {
  verifyToken,
};
