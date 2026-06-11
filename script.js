let cart = [];

/* المنتجات */

const products = [

{
id:1,
name:"Joyroom JR-CCN05 Car Charger",
price:350,
image:"1.jpg",
category:"Chargers"
},

{
id:2,
name:"Joyroom JR-CCN16 Car Charger",
price:230,
image:"2.jpg",
category:"Chargers"
},

{
id:3,
name:"oraimo car charger OCC73D 48w",
price:330,
image:"3.jpg",
category:"Chargers"
},

{
id:4,
name:"Joyroom JR-OK3 mobile car Holder",
price:225,
image:"4.jpg",
category:"Holders"
},

{
id:5,
name:"rotating phone holder for desk 360 d",
price:140,
image:"5.jpg",
category:"Holders"
},

{
id:6,
name:"Flexible Clip Holder",
price:140,
image:"6.jpg",
category:"Holders"
},

{
id:7,
name:"Joyroom Car Charger",
price:370,
image:"7.jpg",
category:"Chargers"
},

{
id:8,
name:"Joyroom JR-PBF12 Power Bank 10000mAh",
price:550,
image:"8.jpg",
category:"Power Banks"
},

{
id:9,
name:"choetech B791 Power Bank 10000mAh",
price:299,
image:"9.jpg",
category:"Power Banks"
},

{
id:10,
name:"HIKSEMI Flash Drive 32GB USB 3.0",
price:380,
image:"21.jpg",
category:"Flash Drives"
},

{
id:11,
name:"HIKSEMI Flash Drive 16GB",
price:250,
image:"11.jpg",
category:"Flash Drives"
},

{
id:12,
name:"HIKSEMI Flash Drive 8GB",
price:200,
image:"12.jpg",
category:"Flash Drives"
},

{
id:13,
name:"Kingston DataTraveler Exodia S 64GB",
price:350,
image:"13.jpg",
category:"Flash Drives"
},

{
id:14,
name:"wiwu Power Bank 10000mAh",
price:430,
image:"14.jpg",
category:"Power Banks"
},

{
id:15,
name:"Rotating Phone Holder",
price:100,
image:"15.jpg",
category:"Holders"
},

{
id:16,
name:"Earldom EH161 Holder",
price:90,
image:"16.jpg",
category:"Holders"
},

{
id:17,
name:"Joyroom S-A18 3 In 1 Cable",
price:240,
image:"22.jpg",
category:"Cables"
},

{
id:18,
name:"oraimo type c charging head with  cable from type c to lightning",
price:370,
image:"18.jpg",
category:"Power Banks"
},

{
id:19,
name:"XKCZ 4 In 1 Cable",
price:130,
image:"24.jpg",
category:"Cables"
},

{
id:20,
name:" Samsung 45W Type-C Charger With Cable",
price:280,
image:"20.jpg",
category:"Chargers"
},

{
id:21,
name:"samsung 25W Type-C Charger",
price:450,
image:"21.jpg",
category:"Chargers"
},

{
id:22,
name:"45W PD QC3.0 Charger",
price:350,
image:"17.jpg",
category:"Chargers"
},

{
id:23,
name:"Joyroom Micro USB Cable",
price:110,
image:"23.jpg",
category:"Cables"
},

{
id:24,
name:"4 In 1 Spring Cable 65W",
price:99,
image:"24.jpg",
category:"Cables"
}

];

/* عرض المنتجات */

function displayProducts(list = products){

const container =
document.getElementById("products");

container.innerHTML = "";

list.forEach(product=>{

container.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.price + 50} EGP</p>

<div class="product-buttons">

<button class="order-btn"
onclick="orderNow(${product.id})">

Order Now

</button>

<button class="add-btn"
onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

</div>

`;

});

}

/* فلترة المنتجات */

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

cart.forEach(item=>{

total +=
(item.price + 50)
*
item.quantity;

count +=
item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<strong>${item.name}</strong>

<p>${item.price + 50} EGP</p>

<div class="qty-controls">

<button onclick="decreaseQuantity(${item.id})">
-
</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${item.id})">
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

/* السلة */

function toggleCart(){

document
.getElementById("cart-sidebar")
.classList.toggle("active");

}

/* نموذج الطلب */

function showOrderForm(){

document
.getElementById("orderModal")
.style.display = "block";

}

/* ملاحظة الدفع */

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

/* الثيمات */

function setTheme(theme){

document.body.classList.remove(
"white-theme",
"black-theme",
"rgb-theme"
);

if(theme==="white"){
document.body.classList.add("white-theme");
}

if(theme==="black"){
document.body.classList.add("black-theme");
}

if(theme==="rgb"){
document.body.classList.add("rgb-theme");
}

}
/* إرسال الطلب */

async function sendOrder(){

const name =
document.getElementById("customerName").value;

const email =
document.getElementById("customerEmail").value;

const phone =
document.getElementById("customerPhone").value;

const address =
document.getElementById("customerAddress").value;

const payment =
document.getElementById("paymentMethod").value;

if(
!name ||
!email ||
!phone ||
!address
){

alert("Please fill all fields");

return;

}

let orderDetails = "";

cart.forEach(item => {

orderDetails +=
`${item.name} x${item.quantity} = ${((item.price + 50) * item.quantity)} EGP\n`;

});

const productsTotal =
cart.reduce(
(sum,item)=>
sum + ((item.price + 50) * item.quantity),
0
);

const delivery = 70;

const cashFee =
payment === "Cash On Delivery"
? 12
: 0;

const total =
productsTotal +
delivery +
cashFee;

try{

/* حفظ الطلب في Supabase */

await fetch(
"https://qdyhhjxhxzcmlvzifslg.supabase.co/rest/v1/orders",
{
method:"POST",

headers:{
"Content-Type":"application/json",
"apikey":"sb_publishable_SHJBzoX8F4ahjDtoW_G9ng_C4mF6txi",
"Authorization":"Bearer sb_publishable_SHJBzoX8F4ahjDtoW_G9ng_C4mF6txi"
},

body:JSON.stringify({

customer_name:name,
customer_email:email,
customer_phone:phone,
customer_address:address,
payment_method:payment,
products:orderDetails,
total:total,
status:"pending"

})

}
);

/* إرسال Email */

await emailjs.send(
"service_d4eyvig",
"template_9lhv397",
{
customer_name: name,
customer_email: email,
total: total
}
);
alert(
`✅ Order Sent

Total: ${total} EGP

Waiting For Admin Confirmation`
);

cart = [];

updateCart();

document.getElementById(
"orderModal"
).style.display = "none";

}catch(error){

console.log(error);

alert(
error.text ||
error.message ||
JSON.stringify(error)
);

}

} // <-- دي قفلة الدالة sendOrder

/* تشغيل الموقع */

window.onload = function(){

displayProducts(products);

};
