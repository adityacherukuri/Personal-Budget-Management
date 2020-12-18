const router = require("express").Router();
const auth = require("../middleware/auth");
const todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, name } = req.body;
    if (!title || !name) {
      return res.status(400).json({ msg: "Please enter all the fields." });
    }
    const newTodo = new todo({
      title,
      name,
      userId: req.user,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const todos = await todo.find({ userId: req.user });
  res.json(todos);
});

module.exports = router;
