import { Router } from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    // getMe
} from "../controllers/userController";
import { verifyJWT } from "../middleware/verifyAuth";

const router = Router();

router.get("/", verifyJWT, getUsers);
router.post("/", async (req, res) => {
    await createUser(req, res);
});
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);

export default router;
