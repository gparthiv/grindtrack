// IMPORTS
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");

const { connectMongoDb } = require("./connection");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");

const PORT = process.env.PORT;

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/api/users", userRoute);

app.use(
  "/api/tasks",
  restrictToLoggedinUserOnly,
  taskRoute
);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

connectMongoDb(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) =>
    console.log("MongoDB failed to connect", error)
  );

app.listen(PORT, () => {
  console.log(`Running successfully on ${PORT}`);
});