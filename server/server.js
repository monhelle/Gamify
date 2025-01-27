const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes.js");
const gameRoutes = require("./routes/gameRoutes.js");
const tagRoutes = require("./routes/tagRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");

const app = express();
app.use(cookieParser());

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.send("Hallo");
})

app.listen(process.env.PORT);