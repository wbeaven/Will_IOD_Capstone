import { Router } from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getOneUser,
} from "../controllers/userController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.get("/", verifyJWT, getUsers);
router.post("/", async (req, res) => {
    await createUser(req, res);
});
router.put("/:id", verifyJWT, updateUser);
router.delete("/:id", verifyJWT, deleteUser);
router.get("/:id", verifyJWT, getOneUser);

export default router;
