const SUPABASE_URL =
  "https://qdyhhjxhxzcmlvzifslg.supabase.co";

const API_KEY =
  "sb_publishable_SHJBzoX8F4ahjDtoW_G9ng_C4mF6txi";

emailjs.init("QT7Y3j-Cx9P0acoWL");

loadOrders();

/* =========================
   LOAD ORDERS
========================= */

async function loadOrders() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=*&order=id.desc`,
      {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    const orders = await res.json();

    const container = document.getElementById("orders");
    container.innerHTML = "";

    orders.forEach(order => {
      container.innerHTML += `
        <div class="order">
          <h3>${order.customer_name}</h3>
          <p>${order.customer_phone}</p>
          <p>${order.customer_address}</p>
          <p>${order.products}</p>
          <p>${order.total} EGP</p>

          <button class="confirm" onclick="confirmOrder(${order.id})">
            Confirm
          </button>

          <button class="delete" onclick="deleteOrder(${order.id})">
            Delete
          </button>
        </div>
      `;
    });

  } catch (error) {
    console.log("LOAD ERROR:", error);
  }
}

/* =========================
   CONFIRM ORDER + EMAIL
========================= */

async function confirmOrder(id) {
  try {
    const orderRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${id}&select=*`,
      {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    const orderData = await orderRes.json();

    if (!orderData.length) {
      alert("Order Not Found");
      return;
    }

    const order = orderData[0];

    if (!order.customer_email) {
      alert("No customer email found!");
      return;
    }

    // 🔥 SEND EMAIL
    const response = await emailjs.send(
      "service_d4eyvig",
      "template_7xn81bb",
      {
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        customer_address: order.customer_address,
        products: order.products,
        total: order.total
      }
    );

    console.log("EMAIL SUCCESS:", response);

    alert("Confirmation Email Sent");

    // 🔥 DELETE AFTER SUCCESS ONLY
    await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`,
      {
        method: "DELETE",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    loadOrders();

  } catch (error) {
    console.log("EMAIL ERROR:", error);

    alert(
      error?.text ||
      error?.message ||
      JSON.stringify(error)
    );
  }
}

/* =========================
   DELETE ORDER
========================= */

async function deleteOrder(id) {
  if (!confirm("Delete this order?")) return;

  try {
    const orderRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${id}&select=*`,
      {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    const orderData = await orderRes.json();

    if (!orderData.length) {
      alert("Order Not Found");
      return;
    }

    const order = orderData[0];

    // optional
