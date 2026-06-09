const SUPABASE_URL =
"https://qdyhhjxhxzcmlvzifslg.supabase.co";

const API_KEY =
"sb_publishable_SHJBzoX8F4ahjDtoW_G9ng_C4mF6txi";

loadOrders();

async function loadOrders(){

const res =
await fetch(

`${SUPABASE_URL}/rest/v1/orders?select=*`,

{
headers:{

apikey:API_KEY,

Authorization:
`Bearer ${API_KEY}`

}

}

);

const orders =
await res.json();

const container =
document.getElementById("orders");

container.innerHTML = "";

orders.forEach(order=>{

container.innerHTML += `

<div class="order">

<h3>

${order.customer_name}

</h3>

<p>

${order.customer_phone}

</p>

<p>

${order.customer_address}

</p>

<p>

${order.total} EGP

</p>

<p>

Status:
${order.status}

</p>

<button
class="confirm"
onclick="confirmOrder(${order.id})">

Confirm

</button>

<button
class="delete"
onclick="deleteOrder(${order.id})">

Delete

</button>

</div>

`;

});

}