import { Router } from "express";
import { loginUser, logoutUser, checkAuth } from "../controllers/admin.controller.js";

const router = Router();

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", checkAuth);

export default router;
