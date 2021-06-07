const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/sessions", (req, res) => {
  return res.json([{ name: "Session 123", id: 123 }]);
});
app.get("/viewer", (req, res) => {
  return res.json([{ username: "@you", id: 123 }]);
});
app.get("/", (req, res) => {
  return res.send("API up and running");
});

app.listen(8889);
