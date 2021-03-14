import { getSweets } from "./helper.js";

let $sweets = document.querySelector("#sweets");

const renderSweetElement = (sweet) => {
  let $html = document.createElement("div");
  $html.classList.add("sweet");
  $html.innerHTML = `
    <img src='${sweet.image}' alt = '${sweet.name}'>
    <h3>${sweet.name}</h3>
    <p class = 'sweet__ingredients'>${sweet.ingredients.join(", ")}</p>
    <p class = 'sweet__price'>$${sweet.price}</p>
    `;
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
