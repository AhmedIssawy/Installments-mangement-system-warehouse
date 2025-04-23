import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res
      .status(401)
      .json({ error: "اسم المستخدم او كلمه المرور غير صحيحه" });
  }
  const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 100 * 24 * 60 * 60 * 1000, // 100 days in ms
    //100 days
  });
  res.status(200).json({ message: "تم تسجيل الدخول بنجاح" });
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
});

const checkAuth = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;
  console.log(token);
  
  if(!token) {
    return res.status(401).json({isAuthinticated: false})
  }
  res.status(200).json({isAuthinticated: true})
})

export { loginUser, logoutUser, checkAuth };
