// Biến toàn cục lưu thông tin sản phẩm
let currentProduct = {
    name: '',
    price: 0,
    image: '',
    color: 'Trắng',
    quantity: 1
};

// Khởi tạo trang
$(document).ready(function() {
    updateCartCount();
    loadProductDetails();
});

function loadProductDetails() {
    // Lấy thông tin từ localStorage (cách hiện đại)
    const productData = localStorage.getItem('currentProduct');
    
    if (productData) {
        // Parse dữ liệu từ localStorage
        const product = JSON.parse(productData);
        const name = product.name || 'Sản phẩm không xác định';
        const image = product.image || './image/default.png';
        const price = product.price || 0;
        
        // Chuyển đổi giá
        const formattedPrice = price.toLocaleString('vi-VN') + 'đ';
        const originalPrice = Math.round(price * 1.18).toLocaleString('vi-VN') + 'đ'; // Giá gốc cao hơn 18%
        
        // Lưu thông tin sản phẩm
        currentProduct.name = name;
        currentProduct.price = price;
        currentProduct.image = image;
        
        // Cập nhật thông tin vào trang
        document.getElementById('product-name').innerText = name;
        document.getElementById('main-product-image').src = image;
        document.getElementById('product-price').innerText = formattedPrice;
        
        // Cập nhật tất cả thumbnails với cùng hình ảnh
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.src = image;
        });
        
       
    } else {
        // Fallback: Nếu không có dữ liệu trong localStorage, thử lấy từ URL (backward compatibility)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('name')) {
            const name = urlParams.get('name') || 'Sản phẩm không xác định';
            const image = urlParams.get('image') || './image/default.png';
            const priceString = urlParams.get('price') || '0';
            const price = parseFloat(priceString.toString().replace(/\./g, '').replace('đ', '').replace(',', '').trim());
            
            const formattedPrice = price.toLocaleString('vi-VN') + 'đ';
            const originalPrice = Math.round(price * 1.18).toLocaleString('vi-VN') + 'đ';
            
            currentProduct.name = name;
            currentProduct.price = price;
            currentProduct.image = image;
            
            document.getElementById('product-name').innerText = name;
            document.getElementById('main-product-image').src = image;
            document.getElementById('product-price').innerText = formattedPrice;
            
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.src = image;
            });
            
            
        } else {
            // Không có dữ liệu, chuyển về trang chủ
            alert('Không tìm thấy thông tin sản phẩm!');
            window.location.href = 'index.html';
        }
    }
}

// Thay đổi hình ảnh chính
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = thumbnail.src;
    
    // Xóa class active khỏi tất cả thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Thêm class active vào thumbnail được click
    thumbnail.classList.add('active');
}

// Mở modal zoom ảnh
function openImageZoom() {
    const modal = document.getElementById('image-zoom-modal');
    const zoomedImg = document.getElementById('zoomed-image');
    const mainImg = document.getElementById('main-product-image');
    
    modal.style.display = 'block';
    zoomedImg.src = mainImg.src;
}

// Đóng modal zoom
function closeImageZoom() {
    document.getElementById('image-zoom-modal').style.display = 'none';
}

// Tăng số lượng
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity < 99) {
        quantityInput.value = quantity + 1;
        currentProduct.quantity = quantity + 1;
    }
}

// Giảm số lượng
function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
        currentProduct.quantity = quantity - 1;
    }
}

// Chọn màu sắc
document.addEventListener('DOMContentLoaded', function() {
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentProduct.color = this.getAttribute('data-color');
        });
    });
});

// Thêm vào giỏ hàng với số lượng
function addToCartWithQuantity() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        openModal('modal-login');
        return;
    }
    
    const quantity = parseInt(document.getElementById('quantity').value);
    
    let product = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        imageUrl: currentProduct.image,
        color: currentProduct.color,
        quantity: quantity
    };
    
    // Lấy giỏ hàng của user
    let cart = getUserCart();
    
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(item => 
        (item.id === product.id || item.name === product.name) && item.color === product.color
    );
    
    if (existingProductIndex > -1) {
        // Nếu đã có, tăng số lượng
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Nếu chưa có, thêm mới
        cart.push(product);
    }
    
    // Cập nhật giỏ hàng của user
    setUserCart(cart);
    
    alert(`Đã thêm ${quantity} ${product.name} (${product.color}) vào giỏ hàng!`);
    updateCartCount();
}

// Mua ngay
function buyNow() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        alert("Bạn cần đăng nhập để mua hàng!");
        openModal('modal-login');
        return;
    }
    
    addToCartWithQuantity();
    setTimeout(() => {
        window.location.href = 'gioHang.html';
    }, 500);
}

// Toggle wishlist
function toggleWishlist() {
    const btn = document.querySelector('.btn-wishlist i');
    if (btn.classList.contains('fa-regular')) {
        btn.classList.remove('fa-regular');
        btn.classList.add('fa-solid');
        alert('Đã thêm vào danh sách yêu thích!');
    } else {
        btn.classList.remove('fa-solid');
        btn.classList.add('fa-regular');
        alert('Đã xóa khỏi danh sách yêu thích!');
    }
}

// Chuyển đổi tabs
function openTab(tabName) {
    // Hide all tab panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab panel
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.closest('.tab-btn').classList.add('active');
}

// Load sản phẩm tương tự
function loadRelatedProducts() {
    const relatedProducts = [
        {
            name: 'Quạt bàn',
            price: 650000,
            image: 'https://www.mitre10.com.au/media/catalog/category/thumbnail/desk-fan-mitre-10.jpg'
        },
        {
            name: 'Quạt trần thông minh',
            price: 3500000,
            image: 'https://www.crompton.co.in/cdn/shop/files/SilentproBlossomsmart_Denimblue_1_angle_1.png?v=1702372703'
        },
        {
            name: 'Quạt trần Venus',
            price: 4000000,
            image: 'https://www.venushomeappliances.com/storage/app/product_type/20210107063528adorana-product.png'
        },
        {
            name: 'Quạt cầm tay',
            price: 250000,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwOY9kTug5W7SyEbnAik7UMN_mnXwbjxSRA&s'
        }
    ];
    
    const container = document.getElementById('related-products-container');
    container.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = `
            <div class="col-s-6 col-m-4 col-x-3">
                <img src="${product.image}" alt="${product.name}">
                <p><strong>${product.name}</strong></p>
                <p class="gia"><strong>${product.price.toLocaleString('vi-VN')}đ</strong></p>
                <div class="giohang">
                    <a class="themgio">
                        <input type="submit" onclick="checkLoginAndAddToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')" value="THÊM VÀO GIỞ">
                    </a>
                    <a onclick="viewProductDetail('${product.name}', ${product.price}, '${product.image}')" class="xemct" style="cursor: pointer;">
                        <input type="submit" value="Xem Chi Tiết">
                    </a>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

// Cập nhật số lượng sản phẩm trong giỏ hàng (theo số loại sản phẩm)
function updateCartCount() {
    let cart = getUserCart();
    // Đếm số lượng loại sản phẩm thay vì tổng số lượng
    let productCount = cart.length;
    document.getElementById("cart-count").innerText = productCount;
}

function checkLoginAndAddToCart(id, name, price, imageUrl) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        let product = {
            id: id,
            name: name,
            price: price,
            imageUrl: imageUrl,
            quantity: 1
        };
        
        let cart = getUserCart();
        const existingProductIndex = cart.findIndex(item => item.id === id || item.name === product.name);
        
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }
        
        setUserCart(cart);
        alert(`${name} đã được thêm vào giỏ hàng.`);
        updateCartCount();
    } else {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        openModal('modal-login');
    }
}

