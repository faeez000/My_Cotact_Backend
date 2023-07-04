const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SCERET, (err, decodedInfo) => {
      if (err) {
        res.status(401);
        throw new Error("user is not authorized");
      }
      req.user = decodedInfo.user;
      //   console.log(decodedInfo);
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("user is not authorized");
    }
  }
});

module.exports = validateToken;
