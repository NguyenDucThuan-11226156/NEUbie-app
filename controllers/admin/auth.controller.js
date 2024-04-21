const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper");
// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/index", {
    pageTitle: "Đăng nhập",
  });
};
// [POST] /admin/auth/login
module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  const user = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại!");
    res.redirect("back");
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", "Sai mật khẩu!");
    res.redirect("back");
    return;
  }

  // if (user.status != "active") {
  //   req.flash("error", "Tài khoản đang bị khóa!");
  //   res.redirect("back");
  //   return;
  // }

  res.cookie("token", user.token);

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
};

module.exports.signUp = async (req, res) => {
  res.render("admin/pages/auth/sign-up", {
    pageTitle: "Đăng ký",
  });
};
module.exports.createSignUp = async (req, res) => {
  console.log(req.body);

  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    req.flash("error", "Mật khẩu không trùng khớp");
    res.render("admin/pages/auth/sign-up", {
      pageTitle: "Đăng ký",
    });
  } else {
    req.body.password = md5(req.body.password);
    req.body.token = generateHelper.generateRandomString(30);
    req.body.role_id = "661f57a1781fbbf1a13b7f70";
    const record = new Account(req.body);
    await record.save();
    res.redirect("/admin/pages/products");
  }
};
