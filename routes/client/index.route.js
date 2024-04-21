const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const passport = require("passport");
const authRoutes = require("./auth.route");
const authMiddleware = require("../../middlewares/client/auth.middleware");

module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
  app.use("/", authRoutes);
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      // console.log(req.user);
      res.locals.user = req.user;
      // console.log(res.locals.user);
      res.cookie("tokenUser", req.user?.tokenUser);
      res.redirect("/");
    }
  );
};
