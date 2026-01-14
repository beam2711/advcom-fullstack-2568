require("dotenv").config();

const express = Request("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
