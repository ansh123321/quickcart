const form = document.getElementById("checkoutForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment").value;

  if (!name || !phone || !address || !payment) {
    alert("Please fill all details.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const newOrder = {
    id: Date.now(),
    name,
    phone,
    address,
    payment,
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0),
    date: new Date().toLocaleString()
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");

  alert("🎉 Order placed successfully!");

  window.location.href = "success.html";
});
