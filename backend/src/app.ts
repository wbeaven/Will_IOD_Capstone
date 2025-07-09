import express, { Request, Response } from "express";
import cors from "cors";
import userRoute from "./routes/userRoute";
require("./dbConnect");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 8080;

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to my MongoDB application." });
});
// try {
//     // await mongooseConnect();
//     console.log("MongoDB connected successfully");
// } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     //process.exit(1); // Exit the process if the connection fails
// }

app.use("/users", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
