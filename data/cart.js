export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },

    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }
];

export function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const selectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(selectorElement.value);

    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        };
    });

    if (matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    };

    saveToStorage();
};

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        };
    });

    cart = newCart;
    saveToStorage();
};

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
};

export function showAddedMessage(productId) {
    const addToCartNotificationEl = document.querySelector(`.js-added-to-cart-${productId}`);
    addToCartNotificationEl.classList
        .add('show-added-to-cart');

    setTimeout(() => {
        addToCartNotificationEl.classList
            .remove('show-added-to-cart');
    }, 2000);
};

export function updateQuantity(productId, newQuantity) {
    let matchingProduct;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingProduct = cartItem;
        };
    });

    if (matchingProduct) {
        matchingProduct.quantity += newQuantity;
        document.querySelector(`.js-quantity-product-${productId}`)
            .innerHTML = matchingProduct.quantity;
    };

    saveToStorage();
    calculateCartQuantity();

}