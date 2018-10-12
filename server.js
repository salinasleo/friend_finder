//Dependencies
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("app/public"));

//routes

require("./app/routes/apiroutes")(app);
require("./app/routes/htmlroutes")(app);

//start and listen to server
app.listen(PORT, function () {
    console.log("app listening on port: " + PORT);
})
