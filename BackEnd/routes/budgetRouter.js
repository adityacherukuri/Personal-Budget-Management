const router = require("express").Router();
const auth = require("../middleware/auth");
const budget = require("../models/budgetModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title, value, color } = req.body;
    if (!title || !value || !color) {
      return res.status(400).json({ msg: "Please enter all the fields." });
    }
    const newBudget = new budget({
      title,
      value,
      color,
      userId: req.user,
    });
    const savedBudget = await newBudget.save();
    res.json(savedBudget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", auth, async (req, res) => {
  const budgets = await budget.find({ userId: req.user });
  res.json(budgets);
});

router.delete("/:id", auth, async (req, res) => {
  const budget = await budget.findOne({ userId: req.user, _id: req.params.id });
  if (!budget) {
    return res.status(400).json({ msg: "Budget not found" });
  }
  const deletedBudget = await budget.findByIdAndDelete(req.params.id);
  res.json(this.delete);
});

module.exports = router;
