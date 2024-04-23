const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
function load(selector, path) {
  const cached = localStorage.getItem(path);
  if (cached) {
    $(selector).innerHTML = cached;
  }

  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      if (html !== cached) {
        $(selector).innerHTML = html;
        localStorage.setItem(path, html);
      }
    })
    .finally(() => {
      window.dispatchEvent(new Event("template-loaded"));
    });
}

function isHidden(element) {
  if (!element) return true;

  if (window.getComputedStyle(element).display === "none") {
    return true;
  }

  let parent = element.parentElement;
  while (parent) {
    if (window.getComputedStyle(parent).display === "none") {
      return true;
    }
    parent = parent.parentElement;
  }

  return false;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const calArrowPos = debounce(() => {
  if (isHidden($(".js-dropdown-list"))) return;

  const items = $$(".js-dropdown-list > li");

  items.forEach((item) => {
    const arrowPos = item.offsetLeft + item.offsetWidth / 2;
    item.style.setProperty("--arrow-left-pos", `${arrowPos}px`);
  });
});

window.addEventListener("resize", calArrowPos);

window.addEventListener("template-loaded", calArrowPos);

window.addEventListener("template-loaded", handleActiveMenu);

function handleActiveMenu() {
  const dropdowns = $$(".js-dropdown");
  const menus = $$(".js-menu-list");
  const activeClass = "menu-column__item--active";

  const removeActive = (menu) => {
    menu.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
  };

  const init = () => {
    menus.forEach((menu) => {
      const items = menu.children;
      if (!items.length) return;

      removeActive(menu);
      if (window.innerWidth > 991) items[0].classList.add(activeClass);

      Array.from(items).forEach((item) => {
        item.onmouseenter = () => {
          if (window.innerWidth <= 991) return;
          removeActive(menu);
          item.classList.add(activeClass);
        };
        item.onclick = () => {
          if (window.innerWidth > 991) return;
          removeActive(menu);
          item.classList.add(activeClass);
          item.scrollIntoView();
        };
      });
    });
  };

  init();

  dropdowns.forEach((dropdown) => {
    dropdown.onmouseleave = () => init();
  });
}

window.addEventListener("template-loaded", initJsToggle);

function initJsToggle() {
  $$(".js-toggle").forEach((button) => {
    const target = button.getAttribute("toggle-target");
    if (!target) {
      document.body.innerText = `Cần thêm toggle-target cho: ${button.outerHTML}`;
    }
    button.onclick = (e) => {
      e.preventDefault();

      if (!$(target)) {
        return (document.body.innerText = `Không tìm thấy phần tử "${target}"`);
      }
      const isHidden = $(target).classList.contains("hide");

      requestAnimationFrame(() => {
        $(target).classList.toggle("hide", !isHidden);
        $(target).classList.toggle("show", isHidden);
      });
    };
    document.onclick = function (e) {
      if (!e.target.closest(target)) {
        const isHidden = $(target).classList.contains("hide");
        if (!isHidden) {
          button.click();
        }
      }
    };
  });
}

window.addEventListener("template-loaded", () => {
  const links = $$(".js-dropdown-list > li > a");

  links.forEach((link) => {
    link.onclick = () => {
      if (window.innerWidth > 991) return;
      const item = link.closest("li");
      item.classList.toggle("navbar__item--active");
    };
  });
});

window.addEventListener("template-loaded", () => {
  const tabsSelector = "prod-tab__item";
  const contentsSelector = "prod-tab__content";

  const tabActive = `${tabsSelector}--current`;
  const contentActive = `${contentsSelector}--current`;

  const tabContainers = $$(".js-tabs");
  tabContainers.forEach((tabContainer) => {
    const tabs = tabContainer.querySelectorAll(`.${tabsSelector}`);
    const contents = tabContainer.querySelectorAll(`.${contentsSelector}`);
    tabs.forEach((tab, index) => {
      tab.onclick = () => {
        tabContainer
          .querySelector(`.${tabActive}`)
          ?.classList.remove(tabActive);
        tabContainer
          .querySelector(`.${contentActive}`)
          ?.classList.remove(contentActive);
        tab.classList.add(tabActive);
        contents[index].classList.add(contentActive);
      };
    });
  });
});

const switchBtn = document.querySelector("#switch-theme-btn");
if (switchBtn) {
  switchBtn.onclick = function () {
    const isDark = localStorage.dark === "true";
    document.querySelector("html").classList.toggle("dark", !isDark);
    localStorage.setItem("dark", !isDark);
    switchBtn.querySelector("span").textContent = isDark
      ? "Dark mode"
      : "Light mode";
  };
  const isDark = localStorage.dark === "true";
  switchBtn.querySelector("span").textContent = isDark
    ? "Light mode"
    : "Dark mode";
}
const isDark = localStorage.dark === "true";
document.querySelector("html").classList.toggle("dark", isDark);
// Slider Detail
// Add this to your JavaScript file or script tag
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
  loop: false,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
});

// End Slider Detail

const logOutButton = document.querySelector("[logOutButton]");
if (logOutButton) {
  logOutButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
  });
}
// Cart
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}
// showMiniCart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if (miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
};
showMiniCart();
// Show thông báo thành công
const alertAddCartSusscess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-susscess]");
  if (elementAlert) {
    elementAlert.classList.remove("alert-hidden");

    setTimeout(() => {
      elementAlert.classList.add("alert-hidden");
    }, 3000);
  }
};
// Tổng tiền
const elementTotalFinalMoney = document.querySelector(".finalTotalMoney");
const elementTotalFinalMoneyShip = document.querySelector(
  ".finalTotalMoneyShip"
);
console.log(elementTotalFinalMoney);
console.log(elementTotalFinalMoneyShip);
if (elementTotalFinalMoney && elementTotalFinalMoneyShip) {
  console.log("Hello");
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalMoney = cart.reduce(
    (total, item) => total + item.quantity * item.priceNew,
    0
  );
  elementTotalFinalMoney.innerHTML = totalMoney.toLocaleString();
  elementTotalFinalMoneyShip.innerHTML = totalMoney.toLocaleString();
}
const calculateTotalMoney = () => {
  let totalMoney = 0;
  let totalSubMoney = 0;
  const elementTotalMoney = document.querySelector(".total_money");
  const elementTotalMoneyInCart = document.querySelector(".totalPrice");
  const elementTotalSubMoneyInCart = document.querySelector(".subTotal");

  if (elementTotalMoney) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    totalMoney = cart.reduce(
      (total, item) => total + item.quantity * item.priceNew,
      0
    );
    totalSubMoney = cart.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    elementTotalMoney.innerHTML = totalMoney.toLocaleString();
    elementTotalMoneyInCart.innerHTML = totalMoney.toLocaleString();
    elementTotalSubMoneyInCart.innerHTML = totalSubMoney.toLocaleString();
  }
};
calculateTotalMoney();
// Thêm tour vào giỏ hàng
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const productId = formAddToCart.getAttribute("product-id");
    const productPrice = formAddToCart.getAttribute("product-price");
    const productOriginalPrice = formAddToCart.getAttribute(
      "product-original-price"
    );

    const quantity = parseInt(event.target.elements.quantity.value) || 1;

    if (productId && quantity) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const existProduct = cart.find((item) => item.productId == productId);

      if (existProduct) {
        existProduct.quantity = existProduct.quantity + quantity;
      } else {
        const data = {
          productId: productId,
          quantity: quantity,
          priceNew: productPrice,
          price: productOriginalPrice,
        };
        cart.push(data);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alertAddCartSusscess();
      showMiniCart();
      calculateTotalMoney();
      getProductInCart();
    }
  });
}
// End Cart
//Dropdown Cart
const getProductInCart = async () => {
  const elementDropDowns = document.querySelectorAll(".act-dropdown");
  if (elementDropDowns.length > 0) {
    const carts = JSON.parse(localStorage.getItem("cart"));
    const displayedProductIds = new Set();
    for (const elementDropDown of elementDropDowns) {
      const title = elementDropDown.querySelector(".act-dropdown__title");
      const numberProductInCart = carts.length;
      title.innerHTML =
        numberProductInCart === 1
          ? `You have ${numberProductInCart} item`
          : `You have ${numberProductInCart} items`;
      const elementDropDownList = elementDropDown.querySelector(
        ".act-dropdown__list"
      );
      if (elementDropDownList) {
        for (const cartItem of carts) {
          if (!displayedProductIds.has(cartItem.productId)) {
            const product = await fetchProduct(cartItem.productId);
            if (product) {
              const existingProduct = elementDropDownList.querySelector(
                `[data-product-id="${cartItem.productId}"]`
              );
              if (existingProduct) {
                existingProduct.remove();
              }
              const innerHTML = `<div class="col" data-product-id="${
                cartItem.productId
              }">
                                  <article class="cart-preview-item">
                                      <div class="cart-preview-item__img-wrap"><img class="cart-preview-item__thumb" src="${
                                        product.thumbnail
                                      }" alt="" /></div>
                                      <h3 class="cart-preview-item__title">${
                                        product.title
                                      }</h3>
                                      <p class="cart-preview-item__price">${(
                                        product.price *
                                        (1 - product.discountPercentage / 100)
                                      )
                                        .toFixed(0)
                                        .toLocaleString()}</p>
                                      <p>Quantity: ${cartItem.quantity}</p>
                                  </article>
                                </div>`;
              elementDropDownList.insertAdjacentHTML("beforeend", innerHTML);
              displayedProductIds.add(cartItem.productId);
            }
          }
        }
      }
    }
  }
};
// Function to fetch product data
const fetchProduct = async (productId) => {
  try {
    const response = await fetch(`/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
getProductInCart();
//End Dropdown Cart

// Checkout
const drawCheckoutCart = () => {
  const elementCartInfo = document.querySelector(".cart-info .cart-info__list");
  if (elementCartInfo) {
    fetch("/checkout/list-json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: localStorage.getItem("cart"),
    })
      .then((res) => res.json())
      .then((data) => {
        const htmls = data.map((item, index) => {
          const price =
            typeof item.price === "number"
              ? item.price.toLocaleString()
              : item.price;
          const priceNew =
            typeof item.priceNew === "number"
              ? item.priceNew.toLocaleString()
              : item.priceNew;
          return `<article class="cart-item">
            <a href="./product-detail.html"><img class="cart-item__thumb" src="${
              item.thumbnail
            }" alt=""/></a>
            <div class="cart-item__content">
               <div class="cart-item__content-left">
                  <h3 class="cart-item__title"><a href="/products/detail/${
                    item.slug
                  }">${item.title}</a></h3>
                  <p class="cart-item__price-wrap">${parseInt(
                    price
                  ).toLocaleString()} |<span class="cart-item__status">In Stock</span></p>
                  <div class="cart-item__ctrl cart-item__ctrl--md-block">
                     <div class="cart-item__input">
                      <button class="cart-item__input-btn" btn-minus=${
                        item.productId
                      }>
                        <img class="icon" src="/icons/minus.svg" alt=""/>
                      </button>
                      <span item-quantity=${item.productId}>${
            item.quantity
          }</span>
                      <button class="cart-item__input-btn" btn-add=${
                        item.productId
                      }>
                        <img class="icon" src="/icons/plus.svg" alt=""/>
                      </button>
                     </div>
                  </div>
               </div>
               <div class="cart-item__content-right">
                  <p class="cart-item__total-price">${parseInt(
                    priceNew
                  ).toLocaleString()}</p>
                  <div class="cart-item__ctrl">
                    <button class="cart-item__ctrl-btn" save-btn>
                      <img src="/icons/heart-2.svg" alt=""/ >                            Save
                    </button>
                    <button class="cart-item__ctrl-btn js-toggle" toggle-target="#delete-confirm" btn-delete=${
                      item.productId
                    }>
                      <img src="/icons/trash.svg" alt=""/>                            Delete
                    </button>
                  </div>
               </div>
            </div>
         </article>`;
        });

        elementCartInfo.innerHTML = htmls.join("");
        deleteItemInCart();
        updateItemInCart();
        const saveBtn = document.querySelectorAll("[save-btn]");
        if (saveBtn.length > 0) {
          saveBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
              window.location.reload();
            });
          });
        }
      });
  }
};
drawCheckoutCart();
// Xóa sản phẩm trong giỏ hàng
const deleteItemInCart = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]");
  if (listBtnDelete.length > 0) {
    listBtnDelete.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("btn-delete");

        const cart = JSON.parse(localStorage.getItem("cart"));
        const newCart = cart.filter((item) => item.productId != productId);
        localStorage.setItem("cart", JSON.stringify(newCart));
        window.location.reload();
      });
    });
  }
};
// Hết Xóa sản phẩm trong giỏ hàng
// Cập nhật sản phẩm trong giỏ hàng
const updateItemInCart = () => {
  const listButtonMinus = document.querySelectorAll("[btn-minus]");
  const listButtonAdd = document.querySelectorAll("[btn-add]");
  if (listButtonMinus.length > 0 && listButtonAdd.length > 0) {
    listButtonMinus.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("btn-minus");

        const elementQuantity = document.querySelector(
          `[item-quantity="${productId}"]`
        );

        const quantity = elementQuantity.innerHTML - 1;
        elementQuantity.innerHTML = quantity;
        const cart = JSON.parse(localStorage.getItem("cart"));
        const productUpdate = cart.find((item) => item.productId == productId);
        productUpdate.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
      });
    });
    listButtonAdd.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("btn-add");
        const elementQuantity = document.querySelector(
          `[item-quantity="${productId}"]`
        );
        const quantity = parseInt(elementQuantity.innerHTML) + 1;
        elementQuantity.innerHTML = quantity;
        const cart = JSON.parse(localStorage.getItem("cart"));
        const productUpdate = cart.find((item) => item.productId == productId);
        productUpdate.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
      });
    });
  }
};

// Hết Cập nhật sản phẩm trong giỏ hàng

//End checkout
// Post Checkout
const formCheckout = document.querySelector("[form-checkout]");
if (formCheckout) {
  formCheckout.addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = event.target.elements.fullName.value;
    const school = event.target.elements.school.value;
    const phone = event.target.elements.phone.value;
    const address = event.target.elements.address.value;

    const cart = localStorage.getItem("cart");
    console.log(cart);
    fetch("/checkout/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Convert JavaScript object to JSON string
        fullName,
        school,
        phone,
        address,
        cart,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      });
  });
}

// End Post Checkout
