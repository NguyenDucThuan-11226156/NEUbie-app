const systemConfig = require("../../config/system");
const productRoutes = require("./product.route");
const authRoutes = require("./auth.route");
const roleRoutes = require("./role.route");
module.exports = (app) => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH_ADMIN}/products`, productRoutes);
  app.use(`${PATH_ADMIN}/auth`, authRoutes);
  app.use(`${PATH_ADMIN}/roles`, roleRoutes);
};
