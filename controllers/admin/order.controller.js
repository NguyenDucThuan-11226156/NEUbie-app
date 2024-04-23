const systemConfig = require("../../config/system");
const Roles = require("../../models/role.model");
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
// [GET] admin/order
module.exports.index = async (req, res) => {
  const orders = await Order.find({});
  console.log(orders);
  for (const order of orders) {
    order.totalMoney = 0;
    for (const product of order.products) {
      const item = await Product.findOne({
        _id: product.product_id,
      });
      product.title = item.title;
      order.totalMoney +=
        (item.price - (item.price * item.discountPercentage * 1.0) / 100) *
        product.quantity;
    }
  }
  res.render("admin/pages/order/index", {
    pageTitle: "Quản lí đơn hàng",
    orders: orders,
  });
};
