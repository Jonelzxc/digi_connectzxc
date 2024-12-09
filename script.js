// Toggle the hamburger menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Add smooth scroll and fade-in animations for sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');

    // Function to check if the section is in view
    function checkInView() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                section.classList.add('visible');
            }
        });
    }

    // Trigger the checkInView function when scrolling
    window.addEventListener('scroll', checkInView);
    // Initial check for sections that are in view
    checkInView();
});

// Function to add products to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        // If product already exists, increase the quantity
        cart[existingProductIndex].quantity++;
    } else {
        // Otherwise, add the product with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optionally, you can alert the user that the product was added
    alert('Product added to cart!');
}

// Event listener to handle "Add to Cart" button clicks
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const product = {
            id: productCard.getAttribute('data-id'),
            name: productCard.getAttribute('data-name'),
            price: parseFloat(productCard.getAttribute('data-price')),
            image: productCard.getAttribute('data-image')
        };

        addToCart(product);  // Add the product to the cart
    });
});
