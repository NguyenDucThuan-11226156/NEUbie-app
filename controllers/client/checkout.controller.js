const Product = require("../../models/product.model");
const User = require("../../models/user.model");
// [GET] /checkout
module.exports.index = async (req, res) => {
  if (req.cookies?.tokenUser) {
    const user = await User.findOne({
      tokenUser: req.cookies?.tokenUser,
    }).select("-password");
    res.locals.user = user;
  }
  res.render("client/pages/checkout/index", {
    pageTitle: "Checkout",
  });
};
// [GET] /checkout/list-json
module.exports.listJson = async (req, res) => {
  const products = req.body;
  for (const product of products) {
    const infoProduct = await Product.findOne({
      _id: product.productId,
    });
    product.thumbnail = infoProduct.thumbnail;
    product.discountPercentage = infoProduct.discountPercentage;
    product.slug = infoProduct.slug;
    product.title = infoProduct.title;
  }
  res.status(200).json(products);
};
