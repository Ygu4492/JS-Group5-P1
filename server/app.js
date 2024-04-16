const express = require("express");
const path = require("path");

const routes = require("./routes");

const app = new express();

// set static public
app.use(express.static(path.join(__dirname, "../public")));
// api url encode
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// render home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// use routes
app.use(routes);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
