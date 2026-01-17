const orders = JSON.parse(localStorage.getItem("orders")) || [];
const container = document.getElementById("ordersList");

if (orders.length === 0) {
  container.innerHTML = "<p>No orders yet.</p>";
} else {
  orders.forEach((o) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.style.marginBottom = "12px";

    div.innerHTML = `
      <h3>Order on ${o.date}</h3>
      <p><strong>Total:</strong> ₹${o.total}</p>
      <p><strong>Payment:</strong> ${o.payment}</p>
      <p><strong>Address:</strong> ${o.address}</p>
      <p><strong>Items:</strong></p>
      <ul>
        ${o.items.map(i => `<li>${i.name} × ${i.qty}</li>`).join("")}
      </ul>
    `;

    container.appendChild(div);
  });
}
