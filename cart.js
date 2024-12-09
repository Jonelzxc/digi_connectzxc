// Function to update the cart display on the cart page
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    // Get the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Loop through the cart and display each item
    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Price: ₱${item.price}</p>
                <p>Quantity: 
                    <button class="qty-btn" onclick="changeQuantity(${index}, 'decrease')">-</button>
                    <span id="quantity-${index}">${item.quantity}</span>
                    <button class="qty-btn" onclick="changeQuantity(${index}, 'increase')">+</button>
                </p>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update the total price
    totalAmount.textContent = totalPrice.toFixed(2);

    // Store the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to change the quantity of a product in the cart
function changeQuantity(index, action) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (action === 'increase') {
        cart[index].quantity++;
    } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCart();
}

// Function to remove an item from the cart
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item from the cart array
    cart.splice(index, 1);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCart();
}

// Function to handle the checkout process
function handleCheckout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty! Please add items to the cart before checking out.');
        return;
    }

    // Show a success notification (e.g., alert)
    alert('Your order has been successfully placed! Thank you for shopping with us!');

    // Optionally clear the cart after checkout
    localStorage.removeItem('cart');

    // Optionally, you can redirect to an order confirmation page
    // window.location.href = '/order-confirmation.html'; // Example redirect
}

// Initialize the cart when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateCart();  // Update the cart display

    // Add event listener for the "Proceed to Checkout" button
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
});
