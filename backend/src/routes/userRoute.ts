import { Router } from "express";
import {
    getUsers,
    createUser,
    // updateUser,
    // deleteUser,
    // getMe
} from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", async (req, res) => {
    await createUser(req, res);
});
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
