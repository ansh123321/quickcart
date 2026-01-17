let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  const container = document.getElementById("cartItems");
  const totalSpan = document.getElementById("totalAmount");

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalSpan.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.style.marginBottom = "16px";

    div.innerHTML = `
      <img src="${item.image}">
      <div style="flex:1">
        <h3>${item.name}</h3>
        <p>₹${item.price} × ${item.qty} = ₹${item.price * item.qty}</p>
        <div class="qty-controls">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  totalSpan.textContent = total;
}

function changeQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();
