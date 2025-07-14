import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
import teamRoute from "./routes/teamRoute";
import authRoute from "./routes/authRoute";
require("./dbConnect");

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to my MongoDB application." });
});

app.use("/users", userRoute);
app.use("/teams", teamRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
