const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/index", {
    pageTitle: "Đăng nhập",
  });
};
