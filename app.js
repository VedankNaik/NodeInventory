const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000);

app.get("/", (req, res) => {
  const items = [
    { name: "Mobile", price: 25000 },
    { name: "Book", price: 500 },
    { name: "Computer", price: 60000 },
  ]
  res.render("index", { items });
});

app.get("/add-items", (req, res) => {
  res.render("add-items");
});

app.use((req, res) => {
  res.render("error");
});
