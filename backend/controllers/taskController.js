const Task = require('../models/Task');

// Get all tasks for the logged-in user [cite: 21]
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ deadline: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch tasks' });
  }
};

// Create a new task [cite: 18]
exports.createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const newTask = new Task({
      title,
      description,
      deadline,
      userId: req.user.id // From auth middleware [cite: 27]
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create task' });
  }
};

// Update task status or details [cite: 22]
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: 'Update failed' });
  }
};

// Delete a task [cite: 22]
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Delete failed' });
  }
};