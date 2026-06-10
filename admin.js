const SUPABASE_URL =
  "https://qdyhhjxhxzcmlvzifslg.supabase.co";

const API_KEY =
  "sb_publishable_SHJBzoX8F4ahjDtoW_G9ng_C4mF6txi";

emailjs.init("QT7Y3j-Cx9P0acoWL");

loadOrders();

/* =========================
   LOAD ORDERS (FIXED)
========================= */

async function loadOrders() {
  try {
    console.log("🔄 Loading orders...");

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?select=*&order=id.desc`,
      {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    console.log("📡 Status:", res.status);

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    const orders = await res.json();

    console.log("📦 Orders:", orders);

    const container = document.getElementById("orders");

    if (!container) {
      throw new Error("Orders container not found in HTML");
    }

    container.innerHTML = "";

    if (!orders.length) {
      container.innerHTML = "<p>No orders found</p>";
      return;
    }

    orders.forEach(order => {
      container.innerHTML += `
        <div class="order">
          <h3>${order.customer_name}</h3>
          <p>${order.customer_phone}</p>
          <p>${order.customer_address}</p>
          <p>${order.products}</p>
          <p>${order.total} EGP</p>

          <button class="confirm" onclick="confirmOrder(${Number(order.id)})">
            Confirm
          </button>

          <button class="delete" onclick="deleteOrder(${Number(order.id)})">
            Delete
          </button>
        </div>
      `;
    });

  } catch (error) {
    console.log("❌ LOAD ERROR:", error);

    document.getElementById("orders").innerHTML =
      `<p style="color:red;">Failed to load orders</p>`;
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
    alert(error?.message || JSON.stringify(error));
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

    await emailjs.send(
      "service_d4eyvig",
      "template_9lhv397",
      {
        customer_name: order.customer_name,
        customer_email: order.customer_email
      }
    );

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

    alert("Order Deleted");

    loadOrders();

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    alert(error?.message || JSON.stringify(error));
  }
}
