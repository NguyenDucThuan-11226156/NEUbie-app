const Product = require("../../models/product.model");

// [GET] /detail/:slug
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  const product = await Product.findOne({
    slug: slug,
    deleted: false,
  });
  product.priceNew = product.price * (1 - product.discountPercentage / 100);
  product.priceNew = product.priceNew.toFixed(0);
  console.log(product);
  res.render("client/pages/product/detail", {
    pageTitle: "Chi tiết sản phẩm",
    product: product,
  });
};
