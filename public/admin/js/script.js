//Preview image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );
  uploadImageInput.addEventListener("change", (event) => {
    const [file] = uploadImageInput.files;
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
//End preview image
// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert
const createProductButton = document.querySelector(".createProduct");
if (createProductButton) {
  createProductButton.addEventListener("click", () => {
    window.location.href = `/admin/products/create`;
  });
}
//Delete product
const deleteProductButtons = document.querySelectorAll(".btn-remove");
if (deleteProductButtons.length > 0) {
  deleteProductButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("product_id");
      fetch(`/admin/products/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Delete request successful", data);
          window.location.href = "/admin/products";
        })
        .catch((error) => {
          console.error("Error during delete request:", error);
        });
    });
  });
}

// End delete product

//Update product
const updateProductButtons = document.querySelectorAll(".btn-edit");
if (updateProductButtons.length > 0) {
  updateProductButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("product_id");
      window.location.href = `/admin/products/edit/${id}`;
    });
  });
}

//End update product
function set_cookie(name, value) {
  document.cookie = name + "=" + value + "; Path=/;";
}
function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
const logoutButton = document.querySelector(".logoutButton");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    delete_cookie("token");
  });
}
