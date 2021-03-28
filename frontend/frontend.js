import { getSweets } from "./helper.js";
let $sweets = document.querySelector("#sweets");
let $cart = document.querySelector("#cart");
let $cartSidebar = document.querySelector(".cart-sidebar");
let $contactSidebar = document.querySelector('#contact')



const renderCart = () => {
  $cart.innerHTML = "";
  cart.forEach(({ id, name: sweetName, cost, quantity }) => {
    let $cartDiv = document.createElement("div");
    $cartDiv.className = "cart__item row";
    $cartDiv.innerHTML = `
    <div class="col-7">
            <p>${sweetName}</p>
            <p>${quantity} items</p>
    </div>
          <div class="col-5 sweet-price">
            $${(cost * quantity).toFixed(2)}</div>
    `;
    $cart.append($cartDiv);
  });

  $cart.insertAdjacentHTML("beforeend", "<hr>");
  let totalPrice = cart.reduce((acc, item) => {
    return acc + item.cost * item.quantity;
  }, 0);
  $cart.insertAdjacentHTML(
    "beforeend",
    `<div class="cart__item row">
            <div class="col-8">
            <p>Total: </p>
            </div>
            <div class="col-4 sweet-price">
            $${totalPrice.toFixed(2)}</div>
        </div>`
  );
};
let cart = JSON.parse(localStorage.getItem("cart")) || [];
if (cart.length) {
  renderCart();
}

const openCartBtn = document.querySelector("#header__btn_cart");
openCartBtn.addEventListener("click", function () {
  $cartSidebar.classList.remove("close");
});

const openContactBtn = document.querySelector("#header__btn_menu");
openContactBtn.addEventListener("click", function () {
  document.getElementById("contact").classList.remove("close");
});

const closeCart = document.querySelector(".cart__btn-remove");
closeCart.addEventListener("click", () => {
  $cartSidebar.classList.add("close");
});

const closeContact = document.querySelector('.contact__btn-remove');
closeContact.addEventListener('click',()=>{
  $contactSidebar.classList.add('close')
})

const addToCart = (sweet) => {
  let isFound = false;
  cart = cart.map((item) => {
    if (item.id === sweet.id) {
      item.quantity++;
      isFound = true;
    }
    return item;
  });

  if (!isFound) {
    cart.push({ ...sweet, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
};
const renderSweetElement = (sweet) => {
  let $html = document.createElement("div");
  $html.classList.add("sweet");
  $html.classList.add("col-md-4");
  $html.classList.add("card-height");
  $html.innerHTML = `
    <img src='${sweet.image}' alt = '${sweet.name}' class="sweet__img">
    <h3>${sweet.name}</h3>
    <p class = 'sweet__ingredients'>${sweet.ingredients.join(", ")}</p>
    <p class = 'sweet__price'>$${sweet.cost}</p>
    `;
  let $addToCartBtn = document.createElement("button");
  $addToCartBtn.classList.add("add-btn");
  if (sweet.inStock === 0) {
    $addToCartBtn.setAttribute("disabled", "disabled");
  }
  $addToCartBtn.textContent =
    sweet.inStock == 0 ? "Not Available" : "Add to cart";
  $addToCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    addToCart(sweet);
  });

  let showSweetQuantity = document.querySelector(".header__sweet-quantity");
  let counter = 0;
  $addToCartBtn.addEventListener("click", function () {
    counter += 1;
    showSweetQuantity.innerHTML = counter.toString();
    return counter;
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
