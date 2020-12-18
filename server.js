const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());

const budget = require("./budget.json");
app.get("/budget", (req, res) => {
  res.json(budget);
});

// set up routes

app.use("/users", require("./routes/userRouter"));
app.use("/todos", require("./routes/todoRouter"));
app.use("/budgets", require("./routes/budgetRouter"));

//serving static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);
