const express = require("express");
const cors = require("cors");

const DB = { viewer: { username: "@you" } };
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/sessions", (req, res) => {
  return res.json([{ name: "Session 123", id: 123 }]);
});
app.get("/api/viewer", (req, res) => {
  return res.json(DB.viewer);
});
app.post("/api/viewer", (req, res) => {
  DB.viewer = { ...DB.viewer, ...req.body };

  return res.json(DB.viewer);
});
app.get("/", (req, res) => {
  return res.send("API up and running");
});

app.listen(8889);
