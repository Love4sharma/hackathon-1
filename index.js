const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const connectDB = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

const authRouter = require("./routes/auth.Route");
const userRouter = require("./routes/user.Route");
const chatRouter = require("./routes/chat.Route");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter);

connectDB();
app.listen(PORT, (req, resp) => {
  console.log(`Server is running at PORT at ${PORT}`);
});
