// import { Router } from "express";
// import { loginUser, refreshToken, logoutUser } from "../controllers/authController";

// const router = Router();

// router.post("/login", async (req, res) => {
//     await loginUser(req, res);
// });
// router.post("/refresh-token", async (req, res) => {
//     console.log("Received request to refresh token");
//     await refreshToken(req, res);
// });
// router.post("/refresh-token/logout", async (req, res) => {
//     await logoutUser(req, res);
// });

// export default router;
import { Router } from "express";
import { handleLogin } from "../controllers/authController";

const router = Router();

router.post("/", handleLogin);

export default router;
