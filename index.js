const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const methodOverride = require("method-override");
const path = require("path");
const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const moment = require("moment");
const database = require("./config/database");
const system = require("./config/system");
const configLoginWithGoogle = require("./controllers/client/social/google.controller");
dotenv.config();
database.connectDatabase();
const app = express();
const PORT = process.env.PORT || 3001;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(methodOverride("_method"));
app.use(express.static(`${__dirname}/public`));
app.use(methodOverride("_method"));
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//flash
app.use(cookieParser("Dat Gi cung duoc"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash

// app Local
app.locals.moment = moment;
app.locals.prefixAdmin = system.prefixAdmin;
//routes admin
routesAdmin(app);
//routes client
routesClient(app);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
configLoginWithGoogle.configLoginWithGoogle();
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
