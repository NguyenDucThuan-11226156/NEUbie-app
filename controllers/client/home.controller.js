const Product = require("../../models/product.model");
const User = require("../../models/user.model");
// [GET] /home
module.exports.index = async (req, res) => {
  if (req.cookies?.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies?.tokenUser,
    });
    res.locals.user = user;
  }
  const products = await Product.find({
    status: "active",
    deleted: false,
  });

  res.render("client/pages/home/index", {
    pageTitle: "Home",
    products: products,
  });
};
