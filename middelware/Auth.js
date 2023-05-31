import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.auth-token;
  if (!token) return res.json({status: 401, message: "You are not authenticated"});

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.json((403, "Token is invalid"));
    req.user = user;
    next();
  });
};