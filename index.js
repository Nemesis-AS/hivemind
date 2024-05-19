require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const PORT = 3000;

const apiRouter = require("./src/routers/apiRouter");
const viewRouter = require("./src/routers/viewRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("assets"));

app.use("/", viewRouter);
app.use("/api", apiRouter);

app.listen(PORT, async () => {
    console.log("Running on PORT " + PORT);
    await mongoose.connect("mongodb://127.0.0.1:27017/hivemind");
    console.log("Connected with DB");
});
