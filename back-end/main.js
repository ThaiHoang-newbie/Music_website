var express = require("express");
var app = express();
// lắng nghe port 3000
app.listen(3000);


// Cấu hình app
app.set("view engine", "ejs");
app.set("render", "./render");
app.get("/songs-list", function(req, res){
    res.render("songs")
});

// http://localhost:3000/songs
// /songs là route

app.get("/songs", function (req, res) {
    res.send("<font color=red>Thai Hoang's loving Thu Huong</font>")
});

app.post("/songs", function (req, res) {
    res.send("<font color=red>Thai Hoang's loving Thu Huong so much</font>")
});

app.get("/songs/:id", function (req, res) {
    // lấy dữ liệu cụ thể là id từ req
    // chỉ get có params, post không có nên phải làm như bên dưới
    var i = req.params.id;
    res.send("Stt" + i + ":<font color=red>Thai Hoang's loving Thu Huong</font>");
});


// Thư viện Body parser của NodeJS
var bodyParser = require("body-parser");

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// password, username
app.post("/songs/post1", urlencodedParser, function (req, res) {
    var u = req.body.username;
    var p = req.body.password;
    res.send("Thai Hoang's loving Thu Huong so much, right? " + u + "has pasword: " + p)
});


