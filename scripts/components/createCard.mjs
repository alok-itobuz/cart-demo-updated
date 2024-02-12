function createCustomizedElement(tagName, classNames, attributes, innerText) {}

export default function createCard(
  id,
  imagePath,
  imageAlt,
  price,
  title,
  count,
  showAddToCart
) {
  // return `<div class="card">
  //   <div class="image-container">
  //     <img src="${imagePath}" alt="${imageAlt}" />
  //   </div>
  //   <div class="text-container">
  //     <h3>${title}</h3>
  //     <p class="price">$ ${price}</p>
  //   ${
  //     showAddToCart
  //       ? `<button class="add-to-cart add-to-cart-${id} ${
  //           count !== 0 ? "display-none" : ""
  //         }">Add to cart</button>`
  //       : ""
  //   }
  //     <div class="card-buttons card-buttons-${id} ${
  //   count === 0 ? "display-none" : ""
  // }">
  //       <button class="decrease">-</button>
  //       <p class="item-count">${count}</p>
  //       <button class="increase">+</button>
  //     </div>
  //   </div>
  // </div>`;

  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", id);

  // image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");
  const cardImage = document.createElement("img");
  cardImage.src = imagePath;
  cardImage.alt = imageAlt;
  imageContainer.appendChild(cardImage);

  // text container
  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  const titleHeading = document.createElement("h3");
  titleHeading.innerText = title;
  const titleDescription = document.createElement("p");
  titleDescription.classList.add("price");
  titleDescription.innerText = `$ ${price}`;

  // add to cart button
  const btnAddToCart = document.createElement("button");
  btnAddToCart.setAttribute("data-id", id);
  btnAddToCart.setAttribute("data-btn-type", "add-to-cart");
  btnAddToCart.classList.add("add-to-cart", `add-to-cart-${id}`);

  count ? btnAddToCart.classList.add("display-none") : "";
  btnAddToCart.innerText = "Add to Cart";
  showAddToCart ? textContainer.appendChild(btnAddToCart) : "";

  // card buttons
  const cardButtons = document.createElement("div");
  cardButtons.setAttribute("data-id", id);
  cardButtons.classList.add("card-buttons", `card-buttons-${id}`);
  count ? "" : cardButtons.classList.add("display-none");
  const addQuantityBtn = document.createElement("button");
  addQuantityBtn.setAttribute("data-id", id);
  addQuantityBtn.classList.add("btn-change-quantity", "add-quantity");
  addQuantityBtn.innerText = "+";

  const itemCountText = document.createElement("p");
  itemCountText.classList.add("item-count");
  itemCountText.innerText = count;

  const removeQuantityBtn = document.createElement("button");
  removeQuantityBtn.setAttribute("data-id", id);
  removeQuantityBtn.classList.add("btn-change-quantity", "remove-quantity");
  removeQuantityBtn.innerText = "-";

  cardButtons.appendChild(removeQuantityBtn);
  cardButtons.appendChild(itemCountText);
  cardButtons.appendChild(addQuantityBtn);

  textContainer.append(
    titleHeading,
    titleDescription,
    btnAddToCart,
    cardButtons
  );
  card.append(imageContainer, textContainer);

  return card;
}
