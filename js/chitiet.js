function loadProductDetails() {
    // Lấy thông tin từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Sản phẩm không xác định';
    const image = urlParams.get('image') || '/image/default.png';
    const priceString = urlParams.get('price') || '0 VNĐ';

    // Cập nhật thông tin sản phẩm vào trang
    document.getElementById('product-name').innerText = name;
    document.getElementById('product-image').src = image;
    document.getElementById('product-price').innerText = priceString;

    // Thêm giá vào thuộc tính của nút mua hàng
    const price = parseFloat(priceString.replace(/\./g, '').replace('đ', '').trim());
    document.getElementById('buy-button').setAttribute('data-price', price);
}

function addToCart(name, priceString, imageUrl) {
    // Chuyển đổi giá thành số
    const price = parseFloat(priceString.replace(/\./g, '').replace('đ', '').trim());
    
    // Tạo đối tượng sản phẩm
    let product = {
        name: name,
        price: price, // Lưu giá trị số
        imageUrl: imageUrl,
        quantity :1

    };
    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Thêm sản phẩm vào giỏ hàng
    cart.push(product);

    // Cập nhật lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} đã được thêm vào giỏ hàng.`);

    // Cập nhật số lượng trên div giỏ hàng
    updateCartCount();
}

function updateCartCount() {
    // Lấy dữ liệu giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Tính tổng số lượng sản phẩm
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Cập nhật tổng số lượng sản phẩm vào phần tử hiển thị
    document.getElementById("cart-count").innerText = totalQuantity;
  }
