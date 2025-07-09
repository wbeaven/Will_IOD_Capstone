import mongoose from "mongoose";

const uri =
    process.env.MONGO_URI ||
    "mongodb+srv://wtbeaven:nOb2Nme0zajQu27A@will-dev-cluster.7wtvy0y.mongodb.net/?retryWrites=true&w=majority&appName=will-dev-cluster";

// Mongoose.connect(uri)
//     .then(() => console.log("MongoDB Connected"))
//     .catch((error) => console.log("MongoDB Error: " + error.message));

const mongoConnect = async () => {
    await mongoose
        .connect(uri)
        .then(() => console.log("MongoDB Connected"))
        .catch((error) => console.log("MongoDB Error: " + error.message));
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));

// exports.mongoose = mongoose;
mongoConnect();
