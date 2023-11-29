document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.getElementById('cartButton');
    const cartSection = document.getElementById('cart');
    const checkoutButton = document.getElementById('checkout');
    const productButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    let cartItems = [];

    // Event listener para exibir/esconder o carrinho
    cartButton.addEventListener('click', function () {
        cartSection.classList.toggle('hidden');
    });

    // Event listener para adicionar itens ao carrinho
    productButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const product = button.parentNode;
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h3').innerText;
            const productPrice = parseFloat(product.querySelector('.price').innerText.replace('$', ''));
            
            addToCart(productId, productName, productPrice);
            updateCart();
        });
    });

    // Event listener para finalizar a compra
    checkoutButton.addEventListener('click', function () {
        alert('Compra finalizada! Total: $' + getTotal().toFixed(2));
        cartItems = [];
        updateCart();
    });

    // Função para adicionar itens ao carrinho
    function addToCart(id, name, price) {
        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ id, name, price, quantity: 1 });
        }
    }

    // Função para atualizar o carrinho na interface
    function updateCart() {
        cartItemsList.innerHTML = '';

        cartItems.forEach(function (item) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.name} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
            cartItemsList.appendChild(listItem);
        });

        const total = getTotal();
        document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
    }

    // Função para calcular o total do carrinho
    function getTotal() {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
});
