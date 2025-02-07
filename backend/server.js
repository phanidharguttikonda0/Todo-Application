const express = require("express");
const Authrouter = require("./routes/Authentication");
const homeRouter = require("./routes/home");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*", // In development only! Configure properly for production
    credentials: true,
  }),
);
// app.use(
//   cors({
//     origin: "http://localhost:19000", // Your Expo app's URL for local development
//     methods: ["GET", "POST"],
//     credentials: true,
//   }),
// );

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todolist");

// for routes like '/' we mean go for authentication
app.use("/Authentication", Authrouter);
app.use("/", homeRouter);

app.listen(9999, "0.0.0.0", () => console.log("Listening to the port 9999"));
