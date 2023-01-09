const ejs = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const path = require("path");

const { WEBSITE } = require("./src/Settings/Config")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app
  .use(express.json())
  .engine("html", require("ejs").renderFile)
  .set("view engine", "ejs")
  .set("views", path.join(__dirname, "/src/views"));

const Main = require("./src/Routers/Main");

app.use('/', Main);

app.listen(WEBSITE.port, async () => {
    console.log(chalk.default.green(`Website Opened ${chalk.default.bgRed(WEBSITE.port)} Port.`));
    await mongoose.connect(WEBSITE.connection).then(x => console.log(`${chalk.default.green(`MongoDB bağlantısı kuruldu!`)}`)).catch(err => chalk.default.red(err));
});

