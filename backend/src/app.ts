import express, { Request, Response } from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
import teamRoute from "./routes/teamRoute";
require("./dbConnect");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to my MongoDB application." });
});

app.use("/users", userRoute);
app.use("/teams", teamRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
