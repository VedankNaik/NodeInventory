const express = require("express");
const mongoose = require("mongoose");
const Item = require("./models/items");
const app = express();
app.use(express.urlencoded({ extended: true }));
const mongodb =
  "mongodb+srv://user1:qawsedrf@cluster0.wtf9b.mongodb.net/item-db?retryWrites=true&w=majority";
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.get("/create-item", (req, res) => {
  const item = new Item({
    name: "Computer",
    price: 80000,
  });
  item.save().then((result) => res.send(result));
});

app.get("/get-item", (req, res) => {
  Item.findById("611beb5198627d27602edcc1")
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

app.get("/", (req, res) => {
  res.redirect("/get-items");
});

app.get("/get-items", (req, res) => {
  Item.find()
    .then((result) => {
      res.render("index", { items: result });
    })
    .catch((err) => console.log(err));
});

app.get("/add-items", (req, res) => {
  res.render("add-items");
});

app.post("/items", (req, res) => {
  console.log(req.body);
  const item = Item(req.body);
  item
    .save()
    .then(() => {
      res.redirect("/get-items");
    })
    .catch((err) => console.log(err));
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  Item.findById(id).then((result) => {
    res.render("item-detail", { items: result });
  });
});

app.get("/itemdelete/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/get-items");
    })
    .catch((err) => console.log(err));
});

app.get("/itemupdate/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(id, req.body)
    .then((result) => {
      res.redirect("/get-items");
    })
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.render("error");
});
