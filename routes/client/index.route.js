const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const passport = require("passport");
const authRoutes = require("./auth.route");
const authMiddleware = require("../../middlewares/client/auth.middleware");

module.exports = (app) => {
  app.use("/", homeRoutes);
  app.use("/products", authMiddleware.requireAuth, productRoutes);
  app.use("/", authRoutes);
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.locals.user = req.user;
      res.cookie("tokenUser", req.user?.tokenUser);
      res.redirect("/");
    }
  );
};
