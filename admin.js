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

    const container = document.getElementById("orders");

    if (!container) {
      throw new Error("Orders container not found in HTML");
    }

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    const orders = await res.json();

    console.log("📦 Orders:", orders);

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

          <button class="confirm"
            onclick="confirmOrder(${Number(order.id)}, this)">
            Confirm
          </button>

          <button class="delete"
            onclick="deleteOrder(${Number(order.id)}, this)">
            Delete
          </button>
        </div>
      `;
    });

  } catch (error) {
    console.log("❌ LOAD ERROR:", error);

    const container = document.getElementById("orders");

    if (container) {
      container.innerHTML =
        `<p style="color:red;">Failed to load orders</p>`;
    }/* =========================
   CONFIRM ORDER
========================= */

async function confirmOrder(id, btn) {
  try {
    btn.disabled = true;
    btn.innerText = "Sending...";

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

    if (!response || response.status !== 200) {
      throw new Error("Email failed to send");
    }

    const deleteRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`,
      {
        method: "DELETE",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    console.log("DELETE STATUS:", deleteRes.status);

    if (!deleteRes.ok) {
      const errorText = await deleteRes.text();
      console.log("DELETE ERROR:", errorText);
      alert("Delete failed");
      return;
    }

    alert("Order Confirmed & Deleted ✅");

    loadOrders();

  } catch (error) {
    console.log("EMAIL ERROR:", error);
    alert(
      error?.message ||
      JSON.stringify(error)
    );

  } finally {
    btn.disabled = false;
    btn.innerText = "Confirm";
  }
}
    /* =========================
   DELETE ORDER
========================= */

async function deleteOrder(id, btn) {
  if (!confirm("Delete this order?")) return;

  try {
    if (btn) {
      btn.disabled = true;
      btn.innerText = "Deleting...";
    }

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

    // إرسال إيميل الرفض (اختياري)
    if (order.customer_email) {
      try {
        await emailjs.send(
          "service_d4eyvig",
          "template_9lhv397",
          {
            customer_name: order.customer_name,
            customer_email: order.customer_email
          }
        );

        console.log("REJECTION EMAIL SENT");
      } catch (emailError) {
        console.log("EMAIL FAILED:", emailError);
      }
    }

    const deleteRes = await fetch(
      `${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`,
      {
        method: "DELETE",
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`
        }
      }
    );

    console.log("DELETE STATUS:", deleteRes.status);

    if (!deleteRes.ok) {
      const errorText = await deleteRes.text();
      console.log("DELETE ERROR:", errorText);
      alert("Delete failed");
      return;
    }

    alert("Order Deleted ✅");

    loadOrders();

  } catch (error) {
    console.log("DELETE ERROR:", error);

    alert(
      error?.message ||
      JSON.stringify(error)
    );

  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "Delete";
    }
  }
}
  }
}
