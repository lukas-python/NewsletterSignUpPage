const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const name = req.body.firstName;
    const surname = req.body.lastName;
    const email = req.body.emailAddress;
    const data = {
        members:[{
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: name,
            LNAME: surname
        }}]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/52d7cf4486"

    const options = {
        method: 'POST',
        auth: "luke:f86766f3ff95c11bf8a936be939827be-us12"
    }

    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
            }
        else{
            res.sendFile(__dirname + "/failure.html");
            }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();

});

app.post('/failure', function(req, res){
    res.redirect("/");
});

app.post('/success', function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running");
})
