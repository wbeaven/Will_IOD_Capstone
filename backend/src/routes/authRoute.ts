import { Router } from "express";
import { handleLogin } from "../controllers/authController";
import { handleRefreshToken } from "../controllers/refreshTokenController";
import { handleLogout } from "../controllers/logoutController";

const router = Router();

router.post("/", handleLogin);
router.get("/", handleRefreshToken);
router.get("/logout", handleLogout);

export default router;
