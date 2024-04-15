// [GET] /detail/:slug
module.exports.detail = async (req, res) => {
  res.render("client/pages/product/detail", {
    pageTitle: "Chi tiết sản phẩm",
  });
};
