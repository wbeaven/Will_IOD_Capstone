import { Router } from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getOneUser,
} from "../controllers/userController";
import { verifyAuth } from "../middleware/verifyAuth";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.get("/", verifyAuth, getUsers);
router.post("/", async (req, res) => {
    await createUser(req, res);
});
router.put("/:id", verifyAuth, updateUser);
router.delete("/:id", verifyAuth, deleteUser);
router.get("/:id", verifyJWT, getOneUser);

export default router;
