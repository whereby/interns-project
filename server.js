const express = require("express");
const server = express();
const port = parseInt(process.env.WHEREBY_INTERNS_PORT || "3000");

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`Example server listening on port ${port}`);
});
