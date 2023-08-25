const express = require("express");
const bodyParser = require("body-parser");
const { link } = require("fs");
const { escape } = require("querystring");

const app = express();


let items = ["gym", "work", "football"];
let works = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
 

app.get("/", function (req, res) {

    let today = new Date();

    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-us", option);

    res.render("list", {
        listTitle: day,
        //first one is html items and second one is the array items
        items: items,
        cancel: "homeCancel"
    });

});


app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "work",
        items: works,
        cancel: "workCancel"

    })
});


app.post("/", function (req, res) {
    item = req.body.newItem;

    if (req.body.cancel == "workCancel") {
        works.pop(item);
        res.redirect("/work");
    }
    else if (req.body.list == "work") {
        works.push(item);
        res.redirect("/work");
    }
    else if (req.body.cancel == "homeCancel" && req.body.list != "work") {
        items.pop(item);
        res.redirect("/");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});




app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})


