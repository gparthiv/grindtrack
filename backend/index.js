const express = require('express');
const taskRouter = require("./routes/taskRouter")
const cors = require('cors');

require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


const { connectMongoDb } = require("./connection");
connectMongoDb(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/api/tasks", taskRouter);


app.listen(PORT, () => {
  console.log(`Running successfully on ${PORT}`);
});