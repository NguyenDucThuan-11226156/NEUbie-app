const Product = require("../../models/product.model");

// [GET] /detail/:slug
module.exports.detail = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
module.exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
    });
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
