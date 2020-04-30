const express = require("express");
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");
const main = require("./views/main");
const { db, Page, User } = require("./models");

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res) => {
  res.send(main());
});

const PORT = 3000;

const syncModels = async () => {
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`Listening on port: ` + PORT);
  });
};

syncModels();
