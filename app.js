
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();
const items = [];
const work_items = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  const day = date.getDate();

  res.render("list", {listTitle: day, anotherListItems: items});

});

app.post("/", function(req, res){
  const item = req.body.newItem;

  if (req.body.list === "Work") {
    work_items.push(item);
    res.redirect("/work");
  }else {
    items.push(item);
    res.redirect("/");
  }

});


app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", anotherListItems: work_items});
});

app.listen(3000, function(){
  console.log("server is running at port 3000");
});
