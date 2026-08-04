import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import Alert from "./Alert.js";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.quantity = 1;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();
    this.setupQuantityControls();

    const addBtn = document.getElementById("add-to-cart");
    if (addBtn) addBtn.addEventListener("click", this.addProductToCart.bind(this));

  }

  setupQuantityControls() {
    const decrease = document.getElementById("quantity-decrease");
    const increase = document.getElementById("quantity-increase");
    const input = document.getElementById("quantity-input");

    if (decrease) decrease.addEventListener("click", () => this.changeQuantity(-1));
    if (increase) increase.addEventListener("click", () => this.changeQuantity(1));
    if (input) input.addEventListener("input", () => this.setQuantity(Number(input.value)));
  }

  changeQuantity(delta) {
    this.setQuantity(this.quantity + delta);
  }

  setQuantity(value) {
    const quantity = Math.max(1, Number(value) || 1);
    this.quantity = quantity;

    const input = document.getElementById("quantity-input");
    if (input) input.value = quantity;
  }

  async addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const existing = cartItems.find((item) => item.Id === this.product.Id);

    const itemToStore = {
      ...this.product,
      Quantity: this.quantity,
    };

    if (existing) {
      existing.Quantity = (existing.Quantity || 1) + this.quantity;
    } else {
      cartItems.push(itemToStore);
    }

    setLocalStorage("so-cart", cartItems);

    await new Alert({ id: "alert-2", container: "body" }).loadAndRender();
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}


function productDetailsTemplate(product) {
  document.querySelector("h3").textContent =
    product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
  document.querySelector("#p-brand").textContent = product.Brand.Name;
  document.querySelector("#p-name").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("p-image");
  productImage.src = product.Images.PrimaryExtraLarge;
  productImage.alt = product.NameWithoutBrand;
  const euroPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(product.FinalPrice) * 0.85);

  document.getElementById("p-price").innerHTML = `<span class="discount-detail">$${product.SuggestedRetailPrice}</span> <span class="product-card__discount">%${discountPercentage(product)} OFF</span> $${product.FinalPrice}`;
  document.getElementById("p-color").textContent = product.Colors[0].ColorName;
  document.getElementById("p-description").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("add-to-cart").dataset.id = product.Id;
}

export function discountPercentage(product) {
  const retailPrice = product.SuggestedRetailPrice;
  const finalPrice = product.FinalPrice;

  if (!retailPrice || retailPrice <= 0) {
    return 0;
  }

  if (finalPrice >= retailPrice) {
    return 0;
  }

  return Math.floor(((retailPrice - finalPrice) / retailPrice) * 100);
}
