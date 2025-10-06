// Ürün listesi (örnek veri)
const products = [
  { id: 1, name: "Kablosuz Kulaklık", price: 899, image: "https://via.placeholder.com/250x200?text=Kulaklik" },
  { id: 2, name: "Akıllı Saat", price: 1299, image: "https://via.placeholder.com/250x200?text=Akilli+Saat" },
  { id: 3, name: "Bluetooth Hoparlör", price: 749, image: "https://via.placeholder.com/250x200?text=Hoparlor" },
  { id: 4, name: "Oyuncu Klavyesi", price: 599, image: "https://via.placeholder.com/250x200?text=Klavye" },
  { id: 5, name: "Laptop Soğutucu", price: 349, image: "https://via.placeholder.com/250x200?text=Soğutucu" },
];

let cart = [];

const productList = document.getElementById("product-list");
const cartContainer = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

// Ürünleri ekrana yazdır
products.forEach(prod => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
    <img src="${prod.image}" alt="${prod.name}">
    <h3>${prod.name}</h3>
    <p>${prod.price}₺</p>
    <button onclick="addToCart(${prod.id})">Sepete Ekle</button>
  `;
  productList.appendChild(div);
});

// Sepete ekleme
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

// Sepeti güncelle
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>${item.price}₺ x ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${item.id})">❌</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total + "₺";
  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
}

// Sepetten kaldırma
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Sepet panelini aç/kapat
function toggleCart() {
  cartContainer.classList.toggle("open");
}

// Satın al
function checkout() {
  if (cart.length === 0) {
    alert("Sepetiniz boş!");
  } else {
    alert("Siparişiniz alındı! 🛍️");
    cart = [];
    updateCart();
  }
}
