const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const path = require("path");
const routesClient = require("./routes/client/index.route");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const moment = require("moment");
const database = require("./config/database");
dotenv.config();
database.connectDatabase();
const app = express();
const PORT = process.env.PORT || 3000;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(methodOverride("_method"));
app.use(express.static(`${__dirname}/public`));

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.use(bodyParser.urlencoded({ extended: false }));
//flash
app.use(cookieParser("Dat Gi cung duoc"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash
// app Local
app.locals.moment = moment;
//routes admin
// routesAdmin(app);
//routes client
routesClient(app);
// 404 Not Found
app.get("*", (req, res) => {
  res.render("client/pages/errors/404", {
    pageTitle: "404 Not Found",
  });
  // res.redirect("/");
});
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
