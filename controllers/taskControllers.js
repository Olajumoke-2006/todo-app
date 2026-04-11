const Task = require("../models/Task");

// Create task
exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// Get tasks (with filter)
exports.getTasks = async (req, res, next) => {
  try {
    const filter = req.query.status;

    const query = {
      userId: req.user.id,
      ...(filter && { status: filter }),
    };

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// Update task status
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: req.body.status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// Soft delete
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "deleted" },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    next(err);
  }
};