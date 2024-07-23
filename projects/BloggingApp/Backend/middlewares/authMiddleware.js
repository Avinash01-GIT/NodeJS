const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");

const authMiddleware = async (req, res, next) => {
  console.log(req.headers.authorization);
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const token = bearerToken.split(" ")[1]; // JWT
    jwt.verify(token, "secretOrPrivateKey"); // Token validation

    const tokenData = jwt.decode(token);

    console.log(tokenData);
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

    if (currentTimeInSeconds > tokenData.exp) {
      // Token is expired
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await UserModel.findById(tokenData.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
