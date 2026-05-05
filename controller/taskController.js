const Task = require("../model/Task");


exports.createTask = async (req, res) => {
  const task = await Task.create({
    userId: req.user,
    ...req.body
  });
  res.json(task);
};


exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
};


exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.userId.toString() === req.user) {
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};


exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.userId.toString() === req.user) {
    await task.deleteOne();
    res.json({ message: "Deleted" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};


exports.completeTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task && task.userId.toString() === req.user) {
    task.status = "completed";
    await task.save();
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
};