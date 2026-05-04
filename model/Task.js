const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  status: { type: String, default: "pending" },
  dueDate: Date
});

module.exports = mongoose.model("Task", taskSchema);