const cartSection = document.querySelector(".cartSection");
const itemContainer = document.querySelector(".itemContainer");
const cartItemContainer = document.querySelector(".cartItemContainer");
const cartBtn = document.querySelector("#cartBtn");
const cartCount = document.querySelector("#cartCount");
const totalAmnt = document.querySelector("#totalAmnt");
const emptyCart = document.querySelector(".emptycartP");

let count = 0;
let totalAmount = 0;
let itemInCart = [];
let itemId = 0;

const burgers = [
  {
    id: 0,
    name: "Cheese Burger",
    price: 100,
    imageUrl: "./images/Cheeseburger.jpg",
  },
  {
    id: 1,
    name: "Chilli Burger",
    price: 120,
    imageUrl: "./images/Chili%20Burger.jpg",
  },
  {
    id: 2,
    name: "Chimichurri Burger",
    price: 170,
    imageUrl: "./images/Chimichurri%20Burger.jpg",
  },
  {
    id: 3,
    name: "Olive Burger",
    price: 90,
    imageUrl: "./images/Olive%20Burger.jpg",
  },
  {
    id: 4,
    name: "Onion Burger",
    price: 100,
    imageUrl: "./images/Onion%20Burger.jpg",
  },
  {
    id: 5,
    name: "Slaw Burger",
    price: 120,
    imageUrl: "./images/Slaw%20Burger.jpg",
  },
  {
    id: 6,
    name: "Minetta Burger",
    price: 150,
    imageUrl: "./images/minetta%20burger.png",
  },
  {
    id: 7,
    name: "Caprese Burger",
    price: 130,
    imageUrl: "./images/caprese%20burger.png",
  },
];

// Products Display
displayProducts(burgers);

// Function to display products
function displayProducts(currentArray) {
  for (let i = 0; i < currentArray.length; i++) {
    let burgerItemCard = document.createElement("div");

    burgerItemCard.innerHTML = `
    <div class="imageDiv">
      <img src=${currentArray[i].imageUrl} alt="" />
    </div>
    
    <div class="itemDetails">
      <div class="itemNamePrice">
        <p class="itemName">${currentArray[i].name}</p>
        <p class="itemPrice"> <span>${currentArray[i].price}</span> Rs </p>
      </div>
      <i class='bi bi-cart-plus addCart' id='addCartBtn'></i>
    </div>
    `;
    burgerItemCard.classList.add("itemCard");
    itemContainer.appendChild(burgerItemCard);
  }

  displayInCart();
}

// Function to insert and display items in cart and delete

function displayInCart() {
  // for triggering cart section
  const burgerImage = document.querySelectorAll(".imageDiv img");
  const burgerName = document.querySelectorAll(".itemName");
  const burgerPrice = document.querySelectorAll(".itemPrice span");
  const addCartBtn = document.querySelectorAll("#addCartBtn");

  for (let i = 0; i < addCartBtn.length; i++) {
    addCartBtn[i].onclick = () => {
      cartSection.classList.add("cartSectionActive");

      totalAmount = totalAmount + Number(burgerPrice[i].textContent);
      // count++;
      totalAmnt.textContent = totalAmount + " Rs";

      let cartItem = document.createElement("div");

      cartItem.innerHTML = `
      <div class="cartImageDetails">
        <div class="cartImageDiv">
          <img src=${burgerImage[i].src} alt="" />
        </div>
        <div class="cartItemDetails">
          <p class="cartItemName">${burgerName[i].textContent}</p>
          <p class="cartItemPrice"> <span>${burgerPrice[i].textContent}</span> Rs</p>
        </div>
      </div>
      <i class="bi bi-dash-circle removeBtn"></i>`;

      cartItem.classList.add("cartItemActive");
      cartItemContainer.appendChild(cartItem);

      // this array is not used as of now. for future use in case of localstorage
      let itemToPush = {
        id: itemId++,
        name: burgerName[i].textContent,
        price: Number(burgerPrice[i].textContent),
        imageUrl: burgerImage[i].src,
      };
      itemInCart.push(itemToPush); // items n cart are pushed into an array

      cartCount.innerHTML = ++count;
      deleteCartItem();
    };
  }
}

function deleteCartItem() {
  // delete item from cart
  const cartremoveBtn = document.querySelectorAll(".removeBtn");
  const cartItemActive = document.querySelectorAll(".cartItemActive");
  const cartItemPrice = document.querySelectorAll(".cartItemPrice span");

  for (let j = 0; j < cartremoveBtn.length; j++) {
    cartremoveBtn[j].onclick = () => {
      totalAmount = totalAmount - Number(cartItemPrice[j].textContent);
      totalAmnt.textContent = totalAmount + " Rs";
      cartItemContainer.removeChild(cartItemActive[j]);
      cartCount.innerHTML = --count; //cart count decreasing
    };
  }
}

searchFilter();

//SearchBar Function
function searchFilter() {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keyup", function () {
    let text = searchInput.value.toLowerCase();

    let filterResult = burgers.filter(function (burger) {
      if (burger.name.toLowerCase().includes(text)) {
        return burger.name;
      }
    });

    if (this.value == "") {
      itemContainer.innerHTML = "";
      displayProducts(burgers);
    } else {
      if (filterResult == "") {
        itemContainer.innerHTML = '<p class="itemNotFound">No Item Found</p>';
      } else {
        itemContainer.innerHTML = "";
        displayProducts(filterResult);
      }
    }

    // cart btn click event
    displayInCart();
  });
}

// cart btn click event
cartBtn.onclick = () => {
  cartSection.classList.toggle("cartSectionActive");
  if (count == 0) {
    emptyCart.classList.replace("emptycartP", "emptycartPActive");
  }
};

// for closing cart section
const cartCloseBtn = document.querySelector(".cartCloseBtn");
cartCloseBtn.onclick = () => {
  cartSection.classList.toggle("cartSectionActive");
};