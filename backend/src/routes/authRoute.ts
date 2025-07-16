import { Router } from "express";
import { handleLogin } from "../controllers/authController";
import { handleRefreshToken } from "../controllers/refreshTokenController";
import { handleLogout } from "../controllers/logoutController";
import { handleAuthToken } from "../controllers/authTokenController";

const router = Router();

router.post("/", handleLogin);
router.get("/", handleRefreshToken);
router.get("/logout", handleLogout);
router.get("/verify", handleAuthToken);

export default router;
