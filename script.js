let cart = [];

/* المنتجات */

const products = [

{
id:1,
name:"Joyroom Car Charger USB + Type-C",
price:350,
image:"1.jpg",
category:"Chargers"
},

{
id:2,
name:"Joyroom Mini Car Charger",
price:250,
image:"2.jpg",
category:"Chargers"
},

{
id:3,
name:"Oraimo Car Charger",
  /* تشغيل المنتجات تلقائياً عند فتح الموقع */

document.addEventListener("DOMContentLoaded", function () {

displayProducts(products);

});
price:300,
image:"3.jpg",
category:"Chargers"
},

{
id:4,
name:"Joyroom Car Phone Holder",
price:300,
image:"4.jpg",
category:"Holders"
},

{
id:5,
name:"Metal Desktop Phone Stand",
price:120,
image:"5.jpg",
category:"Holders"
},

{
id:6,
name:"Flexible Mobile Holder",
price:150,
image:"6.jpg",
category:"Holders"
},

{
id:7,
name:"Joyroom Fast Car Charger",
price:220,
image:"7.jpg",
category:"Chargers"
},

{
id:8,
name:"Joyroom Power Bank",
price:500,
image:"8.jpg",
category:"Power Banks"
},

{
id:9,
name:"WIWU Power Bank 10000mAh",
price:350,
image:"9.jpg",
category:"Power Banks"
},

{
id:10,
name:"HIKSEMI Flash Drive 32GB",
price:360,
image:"21.jpg",
category:"Flash Drives"
},

{
id:11,
name:"HIKSEMI Flash Drive 16GB",
price:230,
image:"11.jpg",
category:"Flash Drives"
},

{
id:12,
name:"HIKSEMI Flash Drive 8GB",
price:130,
image:"12.jpg",
category:"Flash Drives"
},

{
id:13,
name:"Kingston Flash Drive 64GB",
price:350,
image:"13.jpg",
category:"Flash Drives"
},

{
id:14,
name:"Joyroom Power Bank 10000mAh",
price:450,
image:"14.jpg",
category:"Power Banks"
},

{
id:15,
name:"Laptop Stand",
price:370,
image:"15.jpg",
category:"Holders"
},

{
id:16,
name:"Adjustable Phone Stand",
price:674,
image:"16.jpg",
category:"Holders"
},

{
id:17,
name:"45W Fast Charger With Type-C Cable",
price:500,
image:"17.jpg",
category:"Chargers"
},

{
id:18,
name:"45W PD/QC3.0 Fast Charger",
price:300,
image:"18.jpg",
category:"Chargers"
},

{
id:19,
name:"45W PD Adapter",
price:420,
image:"20.jpg",
category:"Chargers"
},

{
id:20,
name:"25W Type-C Charger",
price:230,
image:"21.jpg",
category:"Chargers"
},

{
id:21,
name:"4 In 1 Spring Cable 65W",
price:170,
image:"22.jpg",
category:"Cables"
},

{
id:22,
name:"Joyroom 4 In 1 Cable",
price:250,
image:"23.jpg",
category:"Cables"
},

{
id:23,
name:"Joyroom Micro USB Cable",
price:130,
image:"24.jpg",
category:"Cables"
},

{
id:24,
name:"PD 27W Fast Charging Cable",
price:180,
image:"25.jpg",
category:"Cables"
}

];
/* عرض المنتجات */

function displayProducts(list = products){

const container =
document.getElementById("products");

container.innerHTML = "";

list.forEach(product => {

container.innerHTML += `

<div class="product-card">

<img
src="${product.image}"
alt="${product.name}">

<h3>
${product.name}
</h3>

<p>
${product.price + 50} EGP
</p>

<div class="product-buttons">

<button
class="order-btn"
onclick="orderNow(${product.id})">

Order Now

</button>

<button
class="add-btn"
onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

</div>

`;

});

}

/* الفلاتر */

function filterCategory(category){

const filtered =
products.filter(
p => p.category === category
);

displayProducts(filtered);

}

/* إضافة للسلة */

function addToCart(id){

const existing =
cart.find(
item => item.id === id
);

if(existing){

existing.quantity++;

}else{

const product =
products.find(
p => p.id === id
);

cart.push({

...product,

quantity:1

});

}

updateCart();

}

/* زيادة الكمية */

function increaseQuantity(id){

const item =
cart.find(
p => p.id === id
);

if(item){

item.quantity++;

}

updateCart();

}

/* تقليل الكمية */

function decreaseQuantity(id){

const item =
cart.find(
p => p.id === id
);

if(!item) return;

item.quantity--;

if(item.quantity <= 0){

cart =
cart.filter(
p => p.id !== id
);

}

updateCart();

}

/* تحديث السلة */

function updateCart(){

const cartItems =
document.getElementById("cart-items");

const cartCount =
document.getElementById("cart-count");

const cartTotal =
document.getElementById("cart-total");

let total = 0;

let count = 0;

cartItems.innerHTML = "";

cart.forEach(item => {

total +=
(item.price + 50)
*
item.quantity;

count +=
item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<strong>
${item.name}
</strong>

<p>
${item.price + 50} EGP
</p>

<div class="qty-controls">

<button
onclick="decreaseQuantity(${item.id})">

-

</button>

<span>
${item.quantity}
</span>

<button
onclick="increaseQuantity(${item.id})">

+

</button>

</div>

</div>

`;

});

cartCount.innerText = count;

cartTotal.innerText = total;

}
/* شراء مباشر */

function orderNow(id){

cart = [];

const product =
products.find(
p => p.id === id
);

cart.push({
...product,
quantity:1
});

updateCart();

showOrderForm();

}

/* فتح وإغلاق السلة */

function toggleCart(){

document
.getElementById("cart-sidebar")
.classList.toggle("active");

}

/* فتح نموذج الطلب */

function showOrderForm(){

document
.getElementById("orderModal")
.style.display = "block";

}

/* إظهار ملاحظة التحويل */

function togglePaymentNote(){

const method =
document.getElementById(
"paymentMethod"
).value;

const note =
document.getElementById(
"payment-note"
);

if(
method === "Instapay" ||
method === "Vodafone Cash"
){

note.style.display = "block";

}else{

note.style.display = "none";

}

}

/* تغيير الثيم */

function setTheme(theme){

document.body.classList.remove(
"white-theme",
"black-theme",
"rgb-theme"
);

if(theme === "white"){

document.body.classList.add(
"white-theme"
);

}

if(theme === "black"){

document.body.classList.add(
"black-theme"
);

}
/* تشغيل المنتجات تلقائياً عند فتح الموقع *

displayProducts(products);

});
if(theme === "rgb"){

document.body.classList.add(
"rgb-theme"
);

}

}
