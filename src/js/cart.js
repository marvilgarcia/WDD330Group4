import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<li class='empty-cart'>Your cart is empty.</li>";

    return;
  }

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const quantity = item.Quantity || 1;
  const lineTotal = item.FinalPrice * quantity;

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${lineTotal.toFixed(2)}</p>
  </li>`;
}

function calculateTotalPrice() {
  const cartItems = getLocalStorage("so-cart") || [];
  const totalPrice = cartItems.reduce((total, item) => {
    const qty = item.Quantity || 1;
    return total + item.FinalPrice * qty;
  }, 0);

  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
} 

renderCartContents();
calculateTotalPrice();