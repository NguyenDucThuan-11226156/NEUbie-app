const Product = require("../../models/product.model");
const User = require("../../models/user.model");
const Order = require("../../models/order.model");
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
// [GET] /checkout/order
module.exports.order = async (req, res) => {
  let { fullName, school, phone, address, cart } = req.body;
  const tokenUser = req.cookies.tokenUser;
  cart = JSON.parse(cart);
  const user = await User.findOne({
    tokenUser: tokenUser,
  });
  const user_id = user._id;
  const userInfo = {
    fullName: fullName,
    school: school,
    phone: phone,
    address: address,
  };
  const products = [];
  for (const item of cart) {
    const product = {
      product_id: item.productId,
      price: item.priceNew,
      quantity: item.quantity,
    };
    products.push(product);
  }
  const order = new Order({
    user_id,
    userInfo,
    products,
  });
  await order.save();
  res.json("Dat hang thanh cong");
};
