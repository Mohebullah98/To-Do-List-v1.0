const express = require("express");
const port = 3000;
const app = express();
const date = require(__dirname + "/date.js");
app.use(express.urlencoded({
  extended: true
}));
//Set Arrays for toDo list and work list
let items = new Array("Water the Plants", "Feed the Cats", "Buy Groceries", "Cook food", "Clean Living Room");
let workItems = new Array();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) { //get to do list page
  let day = date();
  res.render("list", {  //render list page with toDo list array and list title
    listTitle: day,
    newItems: items
  });
});

app.post("/", function(req, res) {
  let item = req.body.toDo;
  console.log(item);
  if (item == undefined) { //if text box doesn't have value, then home button was pressed, redirect to home.
    res.redirect("/");
  } else {
    if (req.body.list !== "Work") { //if the current page isn't for work add item to regular list and redirect to home
      items.push(item);
      console.log(req.body);
      res.redirect("/");
    } else { //add to work list and redirect to work page
      workItems.push(item);
      console.log(workItems);
      res.redirect("/work");
    }
  }
});

app.post("/about", function(req, res) { //redirect to about page
  res.redirect("/about");
})
app.post("/work", function(req, res) { //redirect to work page
  res.redirect("/work");
})
app.get("/work", function(req, res) { //get work list page, keep in mind that work list is rendering list.ejs but with work array and work title.
  res.render("list", {
    listTitle: "Work List",
    newItems: workItems
  });
});
app.get("/about", function(req, res) {
  res.render("about");
})
app.listen(port, function(req, res) {
  console.log("Server has started up on Port 3000");
});
