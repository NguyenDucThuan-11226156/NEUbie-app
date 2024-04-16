const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
  });

  for (const item of products) {
    item.priceNew = item.price * (1 - item.discountPercentage / 100);
    item.priceNew = item.priceNew.toFixed(0);
  }

  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Tạo mới sản phẩm",
  });
};
module.exports.createPost = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  req.flash("success", "Thêm mới sản phẩm thành công!");
  res.redirect(`/${systemConfig.prefixAdmin}/products`);
};
// [DELETE] delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const deleteItem = await Product.updateOne(
      { _id: id }, // Filter to match the item with the given ID
      { deleted: true } // Update to mark the item as deleted
    );

    if (deleteItem.nModified === 0) {
      return res.status(404).json({
        code: 404,
        message: "Item not found",
      });
    }

    // Respond with success message if the update was successful
    res.status(200).json({
      code: 200,
      message: "Delete Success",
    });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error deleting item:", error);
    res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
};
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    _id: id,
    deleted: false,
  });
  res.render("admin/pages/products/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product,
  });
};
// [POST] /admin/products/edit/:id
module.exports.editProduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);

    const product = await Product.findOneAndUpdate(
      {
        _id: id,
        status: "active",
        deleted: false,
      },
      req.body,
      { new: true } // To return the updated document
    );

    if (!product) {
      req.flash("error", "Không tìm thấy sản phẩm hoặc sản phẩm không hợp lệ");
      return res.redirect("/admin/products");
    }

    req.flash("success", "Cập nhật sản phẩm thành công");
    res.redirect("/admin/products");
  } catch (error) {
    console.error("Error updating product:", error);
    req.flash("error", "Đã xảy ra lỗi khi cập nhật sản phẩm");
    res.redirect("/admin/products");
  }
};
