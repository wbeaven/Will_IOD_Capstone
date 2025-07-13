import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";

const mongoConnect = async () => {
    await mongoose
        .connect(uri)
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => console.log("MongoDB Error: " + error.message));
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

mongoConnect();
