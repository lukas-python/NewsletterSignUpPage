const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const name = req.body.firstName;
    const surname = req.body.lastName;
    const email = req.body.emailAddress;
    console.log(name + " " + surname + " " + email);
    
})



app.listen(3000, function(){
    console.log("Server is running");
})