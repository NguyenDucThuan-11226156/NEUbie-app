const systemConfig = require("../../config/system");
const productRoutes = require("./product.route");
const authRoutes = require("./auth.route");
const roleRoutes = require("./role.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
module.exports = (app) => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/products`, authMiddleware.requireAuth, productRoutes);
  app.use(`${PATH_ADMIN}/auth`, authRoutes);
  app.use(`${PATH_ADMIN}/roles`, authMiddleware.requireAuth, roleRoutes);
};
