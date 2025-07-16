import { Router } from "express";
import {
    getTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    getOneTeam,
    getUserTeams,
} from "../controllers/teamController";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.get("/", verifyJWT, getTeams);
router.post("/", verifyJWT, async (req, res) => {
    await createTeam(req, res);
});
router.put("/:id", verifyJWT, updateTeam);
router.delete("/:id", verifyJWT, deleteTeam);
router.get("/me", verifyJWT, getUserTeams);
router.get("/:id", verifyJWT, getOneTeam);

export default router;
