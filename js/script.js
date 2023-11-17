
document.addEventListener('DOMContentLoaded', function () {
  // Data produk
  const products = [
      { id: 1, name: 'Headphone', img: './../img/products/headphone.jpg', price: 20000 },
      { id: 2, name: 'Earphone', img: './../img/products/earphone.jpg', price: 20000 },
      { id: 3, name: 'Casing', img: './../img/products/casing.jpeg', price: 20000 },
      { id: 4, name: 'Usb', img: './../img/products/usb.jpg', price: 20000 },
      { id: 5, name: 'Speaker Lamp', img: './../img/products/speaker-lamp.jpg', price: 20000 },
  ];

  // Fungsi untuk membuat elemen produk
  // function createProductElement(product) {
  //   const productCard = document.createElement('div');
  //   productCard.classList.add('product-card');
  
  //   productCard.innerHTML = `
  //     <div class="product-icons">
  //       <a href="#" class="add-to-cart-button" data-product-id="${product.id}"><i data-feather="shopping-cart"></i></a>
  //       <a href="#" class="item-detail-button"><i data-feather="eye"></i></a>
  //     </div>
  //     <div class="product-image">
  //       <img src="${product.img}" alt="${product.name}">
  //     </div>
  //     <div class="product-content">
  //       <h3>${product.name}</h3>
  //       <div class="product-price">IDR ${product.price}</div>
  //     </div>
  //   `;
  
  //   const addToCartButton = productCard.querySelector('.add-to-cart-button');
  //   addToCartButton.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     const productId = parseInt(event.target.getAttribute('data-product-id'));
  //     const selectedProduct = products.find((prod) => prod.id === productId);
  //     if (selectedProduct) {
  //       addToCart(selectedProduct);
  //     } else {
  //       console.error('Product not found');
  //     }
  //   });
  
  //     return productCard;
  // }

  // Fungsi untuk menambahkan produk ke dalam DOM
  function renderProducts() {
      const productContainer = document.getElementById('product-container');

      products.forEach(product => {
          const productElement = createProductElement(product);
          productContainer.appendChild(productElement);
      });
  }

  renderProducts(); // Memanggil fungsi untuk menampilkan produk
});
let shoppingCartItems = [];

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
// ... (kode sebelumnya)

// Fungsi untuk menampilkan total harga belanja
const renderTotalPrice = () => {
  const totalPriceElement = document.querySelector('.total-price');
  const totalPrice = shoppingCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  totalPriceElement.textContent = `Total: ${rupiah(totalPrice)}`;
};

// Function to add to cart
const addToCart = (productId) => {
  const selectedProduct = products.find(product => product.id === productId);

  if (selectedProduct) {
    const existingProduct = shoppingCartItems.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      shoppingCartItems.push({ ...selectedProduct, quantity: 1 });
    }

    renderShoppingCart();
  } else {
    console.error('Product not found');
  }
};

// Function to remove from cart
const removeFromCart = (productId) => {
  const index = shoppingCartItems.findIndex(item => item.id === productId);

  if (index !== -1) {
    if (shoppingCartItems[index].quantity > 1) {
      shoppingCartItems[index].quantity--;
    } else {
      shoppingCartItems.splice(index, 1);
    }

    renderShoppingCart();
  }
};

// Function to clear cart
const clearCart = () => {
  shoppingCartItems = [];
  renderShoppingCart();
};

// Function to render shopping cart
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
          <p>Price: IDR ${item.price} | Quantity: ${item.quantity}</p>
          <button class="remove-item" data-product-id="${item.id}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(cartItem);
    });
  }

  renderTotalPrice();
};

// Function to render total price
// const renderTotalPrice = () => {
//   const totalPriceElement = document.querySelector('.total-price');
//   const totalPrice = shoppingCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//   totalPriceElement.textContent = `Total: IDR ${totalPrice}`;
// };

// Event listener for removing from cart
document.querySelectorAll('.remove-item').forEach(removeButton => {
  const productId = parseInt(removeButton.dataset.productId);

  removeButton.addEventListener('click', () => {
    removeFromCart(productId);
  });
});

// Event listener for clearing cart
document.querySelector('.clear-cart-button').addEventListener('click', () => {
  clearCart();
});

// Render the initial shopping cart on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderShoppingCart();
});