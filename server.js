const express = require("express");
const bodyParser = require("body-parser");
 
const path = require("path")

const app = express();
 require("./app/routes/movie.routes.js")(app);

// set the view engine to ejs
app.set("views", "./view")
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});