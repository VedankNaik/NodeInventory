const express = require("express");
const app = express();

app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/add-items", (req, res) => {
    res.sendFile("./views/add-items.html", { root: __dirname });
});

app.use((req, res) => {
    res.sendFile("./views/error.html", { root: __dirname });
});