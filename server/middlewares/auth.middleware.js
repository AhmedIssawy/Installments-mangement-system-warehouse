import jwt from "jsonwebtoken";
import asnycHandler from "express-async-handler";

export const authinticate = asnycHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ error: "سجل الدخول مجددا" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
