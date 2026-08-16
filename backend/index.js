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

app.use(
  cors({
    origin: ["http://localhost:5173",
      "http://127.0.0.1:5173"],
  })
);

app.use("/api/users", userRoute);

app.use(
  "/api/tasks",
  restrictToLoggedinUserOnly,
  taskRoute
);

connectMongoDb(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) =>
    console.log("MongoDB failed to connect", error)
  );

app.listen(PORT, () => {
  console.log(`Running successfully on ${PORT}`);
});