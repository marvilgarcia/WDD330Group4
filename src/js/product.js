import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

loadHeaderFooter();

const productID = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productID, dataSource);


//animamtion for the add to cart button
const addToCartButton = document.querySelector("#add-to-cart");
const quantityIncreaseButton = document.querySelector("#quantity-increase");
const quantityDecreaseButton = document.querySelector("#quantity-decrease");

addToCartButton.addEventListener("click", () => {
  addToCartButton.classList.add("animate");
  setTimeout(() => {
    addToCartButton.classList.remove("animate");
  }, 400);
});

quantityIncreaseButton.addEventListener("click", () => {
  quantityIncreaseButton.classList.add("animate");
  setTimeout(() => {
    quantityIncreaseButton.classList.remove("animate");
  }, 400);
});

quantityDecreaseButton.addEventListener("click", () => {
  quantityDecreaseButton.classList.add("animate");  
  setTimeout(() => {
    quantityDecreaseButton.classList.remove("animate");
  }, 400);
});


// Render the product details
product.init();

