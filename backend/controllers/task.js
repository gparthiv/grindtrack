const Task = require("../models/Task");

// HELPER FUNCTION
function isToday(date) {
  const taskDate = new Date(date);
  const today = new Date;
  return (
    taskDate.getFullYear() === today.getFullYear() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getDate() === today.getDate()
  )
}

// GET / READ
async function handleAllGet(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  }
  catch (err) {
    res.status(500).json({
      message: "Failed to fetch tasks"
    });
  }
}

// UPDATE /  PATCH
async function patchTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (!isToday(task.date)) {
      return res.status(403).json({
        msg: "Previous tasks cannot be edited"
      })
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId, req.body,
      {
        new: true
      }
    );

    res.status(200).json(updatedTask);
  }
  catch (err) {
    res.status(500).json({
      message: "Failed to update Task"
    });
  }
}


// DELETE
async function deleteTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if(!task){
      res.status(404).json({
        msg: "task not found"
      });
    }
    if(!isToday(task.date)){
      res.status(403).json({
        msg: "previous task not deletable"
      })
    }
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({
        message: "Task Not found"
      });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message: "Failed to Delete Task"
    });
  }
}


// POST / CREATE
async function postTask(req, res) {
  try {
    const { title, subject } = req.body;
    if (!title || !subject) {
      return res.status(400).json({ message: 'Title and Subject required' });
    }
    const newTask = await Task.create({
      title: title,
      subject: subject,
      date: new Date()
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task"
    });
  }
}

module.exports = {
  handleAllGet,
  patchTaskById,
  deleteTaskById,
  postTask
};