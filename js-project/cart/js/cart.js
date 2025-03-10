let cart = [];
let indexOfProduct;
let i;
let cartCount = 0;
let items = [
  {
    name: "עגבניה",
    price: "8.90",
    img: "./images/tomato.jpeg",
    type: "Vegetables",
    subType: "weight",
    id: "tomato",
    maxQty: 5,
  },
  {
    name: "מלפפון",
    price: "7.90",
    img: "./images/cucumber.jpeg",
    type: "Vegetables",
    subType: "weight",
    id: "cucumber",
    maxQty: 5,
  },
  {
    name: "גזר",
    price: "4.90",
    img: "./images/gezer.jpeg",
    type: "Vegetables",
    subType: "weight",
    id: "carrot",
    maxQty: 5,
  },
  {
    name: "כרוב לבן",
    price: "4.90",
    img: "./images/kruv.webp",
    type: "Vegetables",
    subType: "weight",
    id: "kruv",
    maxQty: 5,
  },
  {
    name: "פלפל אדום",
    price: "5.90",
    img: "./images/pilple.jpeg",
    type: "Vegetables",
    subType: "weight",
    id: "pilpleRed",
    maxQty: 5,
  },
  {
    name: "פלפל צהוב",
    price: "5.90",
    img: "./images/yellow.jpeg",
    type: "Vegetables",
    subType: "weight",
    id: "pilpleYellow",
    maxQty: 5,
  },
  {
    name: "חלב",
    price: "11.90",
    img: "./images/milk.jpeg",
    type: "Diary",
    subType: "quantitative",
    id: "mill",
    maxQty: 10,
  },
  {
    name: "שוקו בשקית",
    price: "20.80",
    img: "./images/shoko.jpeg",
    type: "Diary",
    subType: "quantitative",
    id: "shoko",
    maxQty: 10,
  },
  {
    name: "יוגורט פרו",
    price: "10.50",
    img: "./images/pro.jpg",
    type: "Diary",
    subType: "quantitative",
    id: "pro",
    maxQty: 10,
  },
  {
    name: "לחם דגנים",
    price: "16.20",
    img: "./images/bread-1.jpeg",
    type: "BreadPatsiry",
    id: "bread",
    maxQty: 10,
  },
  {
    name: "קוראסון",
    price: "10.00",
    img: "./images/croissant.jpg",
    type: "BreadPatsiry",
    subType: "quantitative",
    id: "croissant",
    maxQty: 10,
  },
  {
    name: "שוקולד פרה",
    price: "10.50",
    img: "./images/crunch.jpg",
    type: "Sweets",
    subType: "quantitative",
    id: "chocolate",
    maxQty: 10,
  },
];

let showTotalPrice = document.getElementById("total");
const shoppingList = document.getElementById("listItems");
let productsItems = document.querySelector(".products");
let notFound;
let message = document.getElementById("productExist");
message.style.display = "none";

function createDivToMessage() {
  notFound = document.createElement("div");
  notFound.id = "textExist";
  notFound.style.display = "none";
  productsItems.appendChild(notFound);
}
createDivToMessage();

function notFoundMessage(displayType, text) {
  if (displayType == "flex" && text == "textExist") {
    notFound.innerHTML = "המוצר שחיפשת אינו קיים!";
    notFound.style.display = displayType;
  }
  if (displayType == "block" && text == "alreadyExist") {
    message.innerHTML = "אנא שנה את כמות המוצר ";
    message.style.color = "red";
    message.style.fontWeight = "bold";
    message.style.display = displayType;
  }
  if (displayType == "flex" && text == "dontFromCategory") {
    notFound.innerHTML = "אין מוצרים מהקטגוריה הנבחרת!";
    notFound.style.display = displayType;
  }
}

function createProductCard(product) {
  return `
      <div class="card item align-items-center justify-content-center" id="${
        product.id
      }">
          <h3 class="card-title">${product.name}</h3>
          <img src="${product.img}">
           <p class="price">${
             product.type == "Vegetables"
               ? `${product.price}₪ לק"ג`
               : `${product.price}₪ ליחידה`
           }</p>
           <div class="card-footer d-flex justify-content-center">
              <button class="myBtn addButton" onclick="addProductToCart(${
                product.id
              })">הוסף מוצר</button>
           </div>
      </div>
    `;
}

function init(arrItems) {
  let showCardsOnHtml = "";
  arrItems.forEach((item) => {
    showCardsOnHtml += createProductCard(item);
  });
  productsItems.innerHTML = showCardsOnHtml;
}
init(items);

// הוספת מוצר לעגלת קניות
function addProductToCart(productId) {
  let product = items.find((item) => item.id == productId.id);
  if (cart.find((prod) => prod.name == product.name)) {
    notFoundMessage("block", "alreadyExist");
    return;
  } else {
    message.style.display = "none";
    let newProduct = {
      price: Number(product.price),
      name: product.name,
      qty: 0,
      image: product.img,
      type: product.type,
      subType: product.subType,
      maxQty: product.maxQty,
      productId: product.id,
    };
    cart.push(newProduct);
    cartCount++;
    updateCount();
    updateShoppingList(newProduct);
    console.log(cart);
  }
}

function updateShoppingList(product) {
  let emptyCart = document.getElementById("my-cart");
  emptyCart.style.gap = "0px";
  let productItem = document.createElement("div");
  productItem.classList.add(
    "list-product-details",
    "d-flex",
    "gap-5",
    "mt-1",
    "justify-content-center",
    "align-items-center"
  );
  productItem.id = `prodToRemove_${product.productId}`;
  productItem.innerHTML += `
                    <img src="${product.image}" id="listImg">
                    <div class="item-description d-flex flex-column">
                        <h5 class="fs-6">${product.name}</h5>
                        <h6 class="price">${
                          product.type == "Vegetables" ? 'לק"ג' : "ליחידה"
                        } ${product.price}₪</h6>
                    </div>
                    <div class="card-list-buttons d-flex">
                        <button class="list-btn bg-secondary-subtle text-danger d-flex justify-content-center fs-6 addItemCount" onclick="increaseItemQty('${
                          product.productId
                        }')">+</button>
                        <div class="item-count" id="qty_${
                          product.productId
                        }">0.0</div>
                        <button class="list-btn bg-secondary-subtle text-danger d-flex justify-content-center fs-6 removeItemCount" onclick="decreaseItemQty('${
                          product.productId
                        }')">-</button>
                    </div>
      `;
  shoppingList.appendChild(productItem);
}

function increaseItemQty(idOfProduct) {
  let product = cart.find((prodId) => prodId.productId == idOfProduct);
  let quantityDiv = document.getElementById(`qty_${idOfProduct}`);
  let currentQty = Number(quantityDiv.innerHTML);
  if (currentQty >= product.maxQty) {
    alert("הגעת לכמות המקסימלית של הרכישות ממוצר זה");
    return;
  } else {
    let total = 0;
    product.subType == "weight" ? (currentQty += 0.5) : (currentQty += 1);
    total += currentQty * product.price;
    product.qty = currentQty;
    quantityDiv.innerHTML = currentQty;
    showTotalPrice.innerHTML = total.toFixed(2);
    updateTotalCount();
  }
}

function decreaseItemQty(idOfProduct) {
  let product = cart.find((prodId) => prodId.productId == idOfProduct);
  let quantityDiv = document.getElementById(`qty_${idOfProduct}`);
  let currentQty = Number(quantityDiv.innerHTML);
  if (currentQty <= 0) {
    if (confirm("האם ברצונך להסיר מוצר זה מהרשימה?")) {
      removeProductFromList(idOfProduct);
      cartCount--;
      updateCount(total);
    }
    return;
  }
  let total = 0;
  product.subType == "weight" ? (currentQty -= 0.5) : (currentQty -= 1);
  total += currentQty * product.price;
  product.qty = currentQty;
  quantityDiv.innerHTML = currentQty;
  showTotalPrice.innerHTML = total.toFixed(2);
  updateTotalCount();
}

function updateTotalCount() {
  let total = 0;
  cart.forEach((item) => (total += item.qty * item.price));
  showTotalPrice.innerHTML = total.toFixed(2);
}

function removeProductFromList(prodId) {
  let productToRemove = document.getElementById(`prodToRemove_${prodId}`);
  productToRemove.remove();
  cart = cart.filter((p) => p.id !== prodId);
  console.log(cart);
}

function hamburgerToggle() {
  let categoryBtn = document.getElementById("categoryBtn");
  let shopCart = document.getElementById("shopCart");
  if (categoryBtn.style.display == "block") {
    categoryBtn.style.display = "none";
    shopCart.style.top = "10%";
    shopCart.style.right = "6px";
    shopCart.style.zIndex = "1";
  } else {
    categoryBtn.style.display = "block";
    shopCart.style.top = "10%";
    shopCart.style.right = "200px";
    shopCart.style.zIndex = "100";
  }
}

//פוקציה שמפלטרת מוצרים לפי קטגוריות אם
function filterProductsByCategory(category) {
  notFound.style.display = "none";
  if (category == "all") {
    items.forEach((item) => {
      allItems = document.getElementById(item.id);
      allItems.style.display = "flex";
      message.style.display = "none";
    });
  } else {
    let filterItems = items.filter((filterItem) => filterItem.type == category);
    if (filterItems.length == 0) {
      createDivToMessage();
      notFoundMessage("flex", "dontFromCategory");
    } else {
      notFound.style.display == "none";
    }
    items.forEach((item) => {
      let showItems = document.getElementById(item.id);
      if (filterItems.some((product) => product.id == item.id)) {
        notFound.style.display = "none";
        showItems.style.display = "flex";
      } else {
        showItems.style.display = "none";
      }
    });
  }
}

function searchProducts() {
  notFound.style.display = "none";
  let searchBar = document.getElementById("searchBar");
  let filterItems = items.filter((item) => item.name.includes(searchBar.value));
  if (filterItems.length == 0) {
    createDivToMessage();
    notFoundMessage("flex", "textExist");
  } else {
    notFound.style.display = "none";
  }
  items.forEach((item) => {
    let hideProducts = document.getElementById(item.id);
    if (!filterItems.some((product) => product.id == item.id)) {
      hideProducts.style.display = "none";
    } else {
      hideProducts.style.display = "block";
    }
  });
}

// הוספת אייקון של טבלת קניות שמופיע במצב רספונסיבי
function showTable() {
  let tableCart = document.getElementsByClassName("myList-items");
  for (let i = 0; i < tableCart.length; i++) {
    tableCart[i].id = "listProducts";
    tableCart[i].style.display =
      tableCart[i].style.display == "block"
        ? (tableCart[i].style.display = "none")
        : (tableCart[i].style.display = "block");
  }
}

//  עדכון המחיר הכולל לפי המוצרים שהלקוח הוסיף לעגלת קניות
function updateCount() {
  let count = document.getElementById("cartCount");
  count.innerHTML = cartCount;
}

function windowSize() {
  let categoryBtn = document.getElementById("categoryBtn");
  if (window.innerWidth > 1023) {
    categoryBtn.style.display = "flex";
  } else {
    categoryBtn.style.display = "none";
  }
}

window.addEventListener("resize", windowSize);
