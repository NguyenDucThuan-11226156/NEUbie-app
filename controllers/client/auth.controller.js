// http://localhost:3000/google/redirect
// client_id= 754898315434-0dqjd5jf2dnhnpqatottbq6hqmpirq2s.apps.googleusercontent.com
// client_secret = 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
const User = require("../../models/user.model");
// [GET] /login
module.exports.index = async (req, res) => {
  res.render("client/pages/auth/index", {
    pageTitle: "Đăng nhập",
  });
};
// [GET] /logout
module.exports.logOut = async (req, res) => {
  res.clearCookie("tokenUser");
  await User.updateOne(
    {
      _id: res.locals.id,
    },
    {
      tokenUserL: "",
    }
  );
  res.render("client/pages/auth/index", {
    pageTitle: "Đăng nhập",
  });
};
