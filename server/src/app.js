const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/auth.routes.js");
const profileRoute = require("./routes/profile.routes.js");
const requestRoute = require("./routes/request.routes.js");
const userRoute = require("./routes/user.routes.js");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/request", requestRoute);
app.use("/api/user", userRoute);

module.exports = { app };
