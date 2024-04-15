const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  console.log("Hello");
  //   const products = await Product.find({
  //     status: "active",
  //     deleted: false,
  //   }).sort({
  //     position: "desc",
  //   });

  //   for (const item of products) {
  //     item.priceNew = item.price * (1 - item.discountPercentage / 100);
  //     item.priceNew = item.priceNew.toFixed(0);
  //   }

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
  });
};
