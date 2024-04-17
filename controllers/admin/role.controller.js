const systemConfig = require("../../config/system");
const Roles = require("../../models/role.model");
// [GET] admin/roles
module.exports.index = async (req, res) => {
  res.render("admin/pages/roles/index", {
    pageTitle: "Quản lí vai trò",
  });
};
// [GET] admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Tạo mới vai trò",
  });
};
// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);
  const role = new Roles(req.body);
  await role.save();
  req.flash("success", "Tạo mới vai trò thành công !");
  res.render("admin/pages/roles/index", {
    pageTitle: "Quản lí vai trò",
  });
};
