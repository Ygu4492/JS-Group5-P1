const express = require("express");
const path = require("path");

const routes = require("./routes");

const app = new express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// use routes
app.use(routes);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});


