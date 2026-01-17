let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProducts = products;

// Render products
function renderProducts(list) {
  const container = document.getElementById("productList");
  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div>
        <span class="badge">10% OFF</span>
        <img src="${p.image}" style="width=100px; height:120px; object-fit:contain; margin-bottom:8px;" />
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <p style="font-size: 0.8rem; opacity: 0.7;">${p.category}</p>
      </div>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;

    container.appendChild(card);
  });
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  const existing = cart.find(p => p.id === id);

  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = total;
}

// Category filter
function filterCategory(cat) {
  if (cat === "All") currentProducts = products;
  else currentProducts = products.filter(p => p.category === cat);

  renderProducts(currentProducts);
}

window.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  updateCartCount();

  const search = document.getElementById("searchInput");
  if (search) {
    search.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = currentProducts.filter(p =>
        p.name.toLowerCase().includes(q)
      );
      renderProducts(filtered);
    });
  }
});






// for dark mode toggle
const darkToggle = document.getElementById("darkToggle");

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  });

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
  }
}
