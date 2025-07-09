import { Router } from "express";
import {
    getTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    // getMe
} from "../controllers/teamController";

const router = Router();

router.get("/", getTeams);
router.post("/", async (req, res) => {
    await createTeam(req, res);
});
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
