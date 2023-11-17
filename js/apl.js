document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
      items: [
        {id: 1, name: 'Headphone', img: '1.jpg'", price: 20000},
        {id: 2, name: 'Earphone', img: '2.jpg', price: 20000},
        {id: 3, name: 'Casing', img: '3.jpeg', price: 20000},
        {id: 4, name: 'Usb', img: '4.jpg', price: 20000},
        {id: 5, name: 'Speaker Lamp', img: '5.jpg', price: 20000},
      ],
    }));
});

// konverensi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number)
}