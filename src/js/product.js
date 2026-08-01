import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

loadHeaderFooter();

const productID = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productID, dataSource);

// Render the product details
product.init();

// Add to cart button event handler
async function addToCartHandler(e) {
  const selectedProduct = await dataSource.findProductById(
    e.target.dataset.id
  );

  addProductToCart(selectedProduct);
}

// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
