
document.addEventListener('DOMContentLoaded', function () {
  // Data produk
  const products = [
      { id: 1, name: 'Headphone', img: './../img/products/headphone.jpg', price: 150000 },
      { id: 2, name: 'Earphone', img: './../img/products/earphone.jpg', price: 20000 },
      { id: 3, name: 'Casing', img: './../img/products/casing.jpeg', price: 20000 },
      { id: 4, name: 'Usb', img: './../img/products/usb.jpg', price: 20000 },
      { id: 5, name: 'Speaker Lamp', img: './../img/products/speaker-lamp.jpg', price: 20000 },
      { id: 5, name: 'Speaker Lamp', img: './../img/products/speaker-lamp.jpg', price: 20000 },
      { id: 5, name: 'Speaker Lamp', img: './../img/products/speaker-lamp.jpg', price: 20000 },
  ];

  // Fungsi untuk membuat elemen produk
  function createProductElement(product) {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
          <div class="product-icons">
              <a href="#"><i data-feather="shopping-cart"></i></a>
              <a href="#" class="item-detail-button"><i data-feather="eye"></i></a>
          </div>
          <div class="product-image">
              <img src="${product.img}" alt="${product.name}">
          </div>
          <div class="product-content">
              <h3>${product.name}</h3>
              <div class="product-price">IDR ${product.price}</div>
          </div>
      `;

      return productCard;
  }

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
