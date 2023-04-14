const ingItemContainer = document.querySelector(".ingItemContainer");
const totalAmnt = document.querySelector("#totalAmnt");
const cartItemContainer = document.querySelector(".cartItemContainer");
const ingredientsapce = document.querySelector(".ingredientsapce");

let ingredients = [
  {
    id: 0,
    name: "Sliced Tomato",
    price: 10,
    imageUrl: "/images/tomato.png",
    ingredientImageUrl: "/images/tomatoele.png",
  },
  {
    id: 1,
    name: "Cheese",
    price: 12,
    imageUrl: "/images/cheese.png",
    ingredientImageUrl: "/images/cheeseele.png",
  },
  {
    id: 2,
    name: "Ketchup",
    price: 8,
    imageUrl: "/images/ketchup.png",
    ingredientImageUrl: "/images/ketchupele.png",
  },
  {
    id: 3,
    name: "Lettuce",
    price: 10,
    imageUrl: "/images/lettuce.png",
    ingredientImageUrl: "/images/lettuceele.png",
  },
  {
    id: 4,
    name: "Mayonnaise",
    price: 12,
    imageUrl: "/images/Mayonnaise.png",
    ingredientImageUrl: "/images/mayoele.png",
  },
  {
    id: 5,
    name: "Fried Egg",
    price: 20,
    imageUrl: "/images/egg%20fry.png",
    ingredientImageUrl: "/images/eggfryele.png",
  },
  {
    id: 6,
    name: "Chilicon",
    price: 15,
    imageUrl: "/images/chilicon.png",
    ingredientImageUrl: "/images/chiliconele.png",
  },
  {
    id: 7,
    name: "Cucumber",
    price: 10,
    imageUrl: "/images/cucumber.png",
    ingredientImageUrl: "/images/cucmele.png",
  },
  {
    id: 8,
    name: "Beef Patty",
    price: 30,
    imageUrl: "/images/beef.png",
    ingredientImageUrl: "/images/pattyele.png",
  },
  {
    id: 9,
    name: "Bison Patty",
    price: 35,
    imageUrl: "/images/bisonpatty.png",
    ingredientImageUrl: "/images/pattyele.png",
  },
  {
    id: 10,
    name: "Mustard",
    price: 20,
    imageUrl: "/images/mustard.png",
    ingredientImageUrl: "/images/mustardele.png",
  },
  {
    id: 11,
    name: "Parsley",
    price: 10,
    imageUrl: "/images/Parsley.png",
    ingredientImageUrl: "/images/parsleyele.png",
  },
];

let IngredientsCart = [];
let itemId = 0;
let totalAmount = 15;
displayIngredients(ingredients);

function displayIngredients(currentArray) {
  for (let i = 0; i < currentArray.length; i++) {
    let ingreItemCard = document.createElement("div");

    ingreItemCard.innerHTML = `
        <div class="ingImgDiv">
          <img src="${currentArray[i].imageUrl}" alt="Ingredient" />
        </div>
        <div class="ingDetails">
          <p class="ingName">${currentArray[i].name}</p>
          <p class="ingPrice"><span>${currentArray[i].price}</span> Rs</p>
        </div>
        `;
    ingreItemCard.classList.add("ingItem");
    ingItemContainer.appendChild(ingreItemCard);
  }

  displayInCart();
}

function displayInCart() {
  // for triggering cart section
  const IngredientImage = document.querySelectorAll(".ingImgDiv img");
  const IngredientName = document.querySelectorAll(".ingName");
  const IngredientPrice = document.querySelectorAll(".ingPrice span");

  const ingItem = document.querySelectorAll(".ingItem");

  for (let i = 0; i < ingItem.length; i++) {
    ingItem[i].onclick = () => {
      totalAmount = totalAmount + Number(IngredientPrice[i].textContent);

      totalAmnt.textContent = totalAmount + " Rs";

      let cartItem = document.createElement("div");

      cartItem.innerHTML = `
        <div class="cartImageDetails">
          <div class="cartImageDiv">
            <img src=${IngredientImage[i].src} alt="" />
          </div>
          <div class="cartItemDetails">
            <p class="cartItemName">${IngredientName[i].textContent}</p>
            <p class="cartItemPrice"> <span>${IngredientPrice[i].textContent}</span> Rs</p>
          </div>
        </div>
        <i class="bi bi-dash-circle removeBtn"></i>`;

      cartItem.classList.add("cartItemActive");
      cartItemContainer.appendChild(cartItem);

      //   ingredient image  img tag created ,src set and append to parent div
      let ingredientImgElement = document.createElement("img");
      ingredientImgElement.src = ingredients[i].ingredientImageUrl;
      ingredientsapce.appendChild(ingredientImgElement);

      // this array is not used as of now. for future use in case of localstorage
      let itemToPush = {
        id: itemId++,
        name: IngredientName[i].textContent,
        price: Number(IngredientPrice[i].textContent),
        imageUrl: IngredientImage[i].src,
      };
      IngredientsCart.push(itemToPush); // items n cart are pushed into an array

      deleteCartItem();
    };
  }
}

function deleteCartItem() {
  // delete item from cart
  const cartremoveBtn = document.querySelectorAll(".removeBtn");
  const cartItemActive = document.querySelectorAll(".cartItemActive");
  const cartItemPrice = document.querySelectorAll(".cartItemPrice span");
  const ingredientImageTag = document.querySelectorAll(".ingredientsapce img");

  for (let j = 0; j < cartremoveBtn.length; j++) {
    cartremoveBtn[j].onclick = () => {
      totalAmount = totalAmount - Number(cartItemPrice[j].textContent);
      totalAmnt.textContent = totalAmount + " Rs";
      cartItemContainer.removeChild(cartItemActive[j]);
      ingredientsapce.removeChild(ingredientImageTag[j]);
    };
  }
}
