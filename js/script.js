// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector('.navbar-nav');

document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// Toggle class active untuk search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
};

// Toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#shopping-cart-button').onclick = (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
};

// Klik di luar elemen
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function (e) {
  if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});

// Jika klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
};

// Jika klik di luar modal
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

// Menyimpan produk di dalam keranjang belanja
let shoppingCartItems = [];

// Fungsi konversi ke format mata uang Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

// Fungsi untuk menambah produk ke dalam keranjang belanja
const addToCart = (product) => {
  const existingProductIndex = shoppingCartItems.findIndex((item) => item.id === product.id);

  if (existingProductIndex !== -1) {
    shoppingCartItems[existingProductIndex].quantity++;
  } else {
    shoppingCartItems.push({ ...product, quantity: 1 });
  }

  renderShoppingCart();
};

// Fungsi untuk menghapus produk dari keranjang belanja
const removeFromCart = (productId) => {
  shoppingCartItems = shoppingCartItems.filter((item) => item.id !== productId);
  renderShoppingCart();
};

// Fungsi untuk memperbarui tampilan keranjang belanja
const renderShoppingCart = () => {
  const cartContainer = document.querySelector('.cart-items');
  cartContainer.innerHTML = '';

  if (shoppingCartItems.length === 0) {
    cartContainer.innerHTML = '<p>Keranjang belanja kosong.</p>';
  } else {
    shoppingCartItems.forEach((item) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div>
          <h4>${item.name}</h4>
          <p>${rupiah(item.price)} x ${item.quantity}</p>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(cartItem);

      const removeButtons = cartItem.querySelectorAll('.remove-item');
      removeButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const productId = parseInt(button.getAttribute('data-id'));
          removeFromCart(productId);
        });
      });
    });
  }

  renderTotalPrice();
};

// Fungsi untuk menampilkan total harga belanja
const renderTotalPrice = () => {
  const totalPriceElement = document.querySelector('.total-price');
  const totalPrice = shoppingCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  totalPriceElement.textContent = `Total: ${rupiah(totalPrice)}`;
};

// Initialize Alpine.js data
document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      { id: 1, name: 'Headphone', img: '1.jpg', price: 20000 },
      { id: 2, name: 'Earphone', img: '2.jpg', price: 20000 },
      { id: 3, name: 'Casing', img: '3.jpeg', price: 20000 },
      { id: 4, name: 'Usb', img: '4.jpg', price: 20000 },
      { id: 5, name: 'Speaker Lamp', img: '5.jpg', price: 20000 },
    ],
  }));
});
