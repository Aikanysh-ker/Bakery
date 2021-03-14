import { getSweets } from "./helper.js";

let cart = [];
let $sweets = document.querySelector("#sweets");
let $cart = document.querySelector("#cart");

const renderCart = () => {
  $cart.innerHTML = "";
  cart.forEach(({ id, name: sweetName, cost }) => {
    $cart.insertAdjacentHTML(
      "beforeend",
      `<div class="cart__item row">
            <div class="col-8">
            ${sweetName}</div>
            <div class="col-4">
            ${cost}</div>
        </div>`
    );
  });
};
const addToCart = (sweet) => {
  cart.push(sweet);
  renderCart();
};

const renderSweetElement = (sweet) => {
  let $html = document.createElement("div");
  $html.classList.add("sweet");
  $html.classList.add("col-md-4");
  $html.innerHTML = `
    <img src='${sweet.image}' alt = '${sweet.name}' class="sweet__img">
    <h3>${sweet.name}</h3>
    <p class = 'sweet__ingredients'>${sweet.ingredients.join(", ")}</p>
    <p class = 'sweet__price'>$${sweet.cost}</p>
    `;

  let $addToCartBtn = document.createElement("button");
  if (sweet.inStock === 0) {
    $addToCartBtn.setAttribute("disabled", "disabled");
  }
  $addToCartBtn.textContent =
    sweet.inStock == 0 ? "Not Available" : "Add to cart";
  $addToCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addToCart(sweet);
  });
  $html.append($addToCartBtn);
  return $html;
};
const renderSweets = async () => {
  let sweets = await getSweets();

  sweets.forEach((sweet) => {
    let $sweetDiv = renderSweetElement(sweet);
    $sweets.append($sweetDiv);
  });
};

renderSweets();
