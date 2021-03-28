import { getSweets, updateSweet, deleteSweet } from "./helper.js";

let $sweets = document.querySelector("#sweets");

const decreaseStock = async (id, currentStock) => {
  await updateSweet(id, {
    inStock: currentStock - 1,
  });
  renderSweets();
};
const increaseStock = async (id, currentStock) => {
  await updateSweet(id, {
    inStock: currentStock + 1,
  });
  renderSweets();
};
const renderSweetElement = (sweet) => {
  let $html = document.createElement("div");
  $html.classList.add("sweet");
  $html.classList.add("row");
  $html.innerHTML = `
    <div class = 'col-md-4 item-field'>  
        <h3 class='sweet-name'>${sweet.name}</h3>
        <form><input type="text" name="itemname" class="item-name">
        <button class="update-name"><i class="done-icon"></i></button></form>
        <button type="button" class="edit-btn"><i class="edit-icon"></i></button>
    </div>
    <div class='col-md-3'>
        price: $${sweet.cost}
    </div>
    <div class='col-md-3'>
    <span class='decrease'></span>
        inStock: ${sweet.inStock}
    <span class='increase'></span>
    </div>
    <div class='col-md-2'>
    <button class="delete-btn"><i class="delete-icon"></i></button>
    </div>
    `;

  let $editItemName = $html.querySelector(".edit-btn");
  $editItemName.addEventListener("click", (e) => {
    $html.querySelector(".item-name").value = $html.querySelector(
      "h3"
    ).innerHTML;
    $html.classList.add("editing");
  });

  let $updateItemName = $html.querySelector(".done-icon");
  $updateItemName.addEventListener("click", (e) => {
    let newItemName = $html.querySelector(".item-name").value;
    updateSweet(sweet.id, {
      name: newItemName,
    }).then((result) => {
      $html.classList.remove("editing");
    });
  });

  let $deleteBtn = $html.querySelector(".delete-btn");
  $deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteSweet(sweet.id);
  });

  let $decreaseBtn = document.createElement("button");
  $decreaseBtn.innerHTML = `<i class="icon-decrease"></i>`;
  $decreaseBtn.className = "btn-decrease";
  $decreaseBtn.addEventListener("click", () => {
    decreaseStock(sweet.id, sweet.inStock);
  });
  $html.querySelector(".decrease").append($decreaseBtn);

  let $increaseBtn = document.createElement("button");
  $increaseBtn.innerHTML = `<i class="icon-increase"></i>`;
  $increaseBtn.className = "btn-increase";
  $increaseBtn.addEventListener("click", () => {
    increaseStock(sweet.id, sweet.inStock);
  });
  $html.querySelector(".increase").append($increaseBtn);

  return $html;
};
const renderSweets = async () => {
  $sweets.innerHTML = "";
  let sweets = await getSweets();
  sweets.forEach((sweet) => {
    let $sweetDiv = renderSweetElement(sweet);
    $sweets.append($sweetDiv);
  });
};

renderSweets();
