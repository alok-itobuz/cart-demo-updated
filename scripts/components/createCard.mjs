function createCustomizedElement(tagName, classNames, attributes, innerText) {
  const elem = document.createElement(tagName);
  if (classNames) elem.classList.add(...classNames);

  attributes?.forEach((att) => {
    elem.setAttribute(att[0], att[1]);
  });

  if (innerText) elem.innerText = innerText;

  return elem;
}

export default function createCard(
  id,
  imagePath,
  imageAlt,
  price,
  title,
  count,
  isWishlist,
  isWishlisted,
  isNotAddToCart = null
) {
  const card = createCustomizedElement(
    "div",
    ["card"],
    [["data-id", id]],
    null
  );

  const imageContainer = createCustomizedElement(
    "div",
    ["image-container"],
    null,
    null
  );

  const cardImage = createCustomizedElement(
    "img",
    null,
    [
      ["src", imagePath],
      ["alt", imageAlt],
    ],
    null
  );
  imageContainer.appendChild(cardImage);

  const textContainer = createCustomizedElement(
    "div",
    ["text-container"],
    null,
    null
  );

  const titleHeading = createCustomizedElement("h3", null, null, title);

  const titleDescription = createCustomizedElement(
    "p",
    ["price"],
    null,
    `$ ${price}`
  );

  const btnAddToCart = createCustomizedElement(
    "button",
    ["add-to-cart", `add-to-cart-${id}`, `display-${count ? "none" : ""}`],
    [
      ["data-id", id],
      ["data-btn-type", "add-to-cart"],
    ],
    "Add to Cart"
  );

  // card buttons

  const cardButtons = createCustomizedElement(
    "div",
    ["card-buttons", `card-buttons-${id}`, `display-${count ? "" : "none"}`],
    [["data-id", id]]
  );

  const addQuantityBtn = createCustomizedElement(
    "button",
    ["btn-change-quantity", "add-quantity"],
    [["data-id", id]],
    "+"
  );

  const itemCountText = createCustomizedElement(
    "p",
    ["item-count"],
    null,
    count
  );

  const removeQuantityBtn = createCustomizedElement(
    "button",
    ["btn-change-quantity", "remove-quantity"],
    [["data-id", id]],
    "-"
  );

  cardButtons.append(removeQuantityBtn, itemCountText, addQuantityBtn);

  textContainer.append(titleHeading, titleDescription);

  if (!isNotAddToCart) textContainer.append(btnAddToCart, cardButtons);

  const wishlistInput = createCustomizedElement(
    "input",
    ["input-wishlist"],
    [
      ["data-id", id],
      ["type", "checkbox"],
      ["value", id],
    ],
    null
  );

  if (isWishlisted) wishlistInput.setAttribute("checked", true);

  card.append(imageContainer, textContainer);
  if (isWishlist) card.append(wishlistInput);

  return card;
}
