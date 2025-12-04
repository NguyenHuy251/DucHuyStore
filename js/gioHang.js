// Kiểm tra đăng nhập trước khi vào trang giỏ hàng
function checkLoginBeforeCart() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        alert("Vui lòng đăng nhập để xem giỏ hàng!");
        window.location.href = "index.html";
        // Mở modal đăng nhập sau khi chuyển trang
        setTimeout(() => {
            openModal('modal-login');
        }, 500);
        return false;
    }
    return true;
}

// Cập nhật số lượng sản phẩm trong giỏ hàng (theo số loại sản phẩm)
function updateCartCount() {
    let cart = getUserCart();
    // Đếm số lượng loại sản phẩm thay vì tổng số lượng
    let productCount = cart.length;
    document.getElementById("cart-count").innerText = productCount;
}

// Hiển thị giỏ hàng với giao diện hiện đại
function displayCart() {
    let cart = getUserCart();
    let cartItemsContainer = document.getElementById("cartItemsContainer");
    
    // Kiểm tra nếu giỏ hàng rỗng
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
                <h3>Giỏ hàng trống</h3>
                <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                <a href="sanpham.html" class="shop-now-btn">
                    <i class="fa-solid fa-bag-shopping"></i>
                    Mua sắm ngay
                </a>
            </div>
        `;
        updateSummary(0, 0);
        return;
    }
    
    // Hiển thị từng sản phẩm
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="cart-item-card">
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">${item.price.toLocaleString('vi-VN')}đ</div>
                    <div class="cart-item-controls">
                        <div class="quantity-control">
                            <button class="quantity-btn" onclick="decreaseQuantity(${index})">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <div class="quantity-display">${item.quantity}</div>
                            <button class="quantity-btn" onclick="increaseQuantity(${index})">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="cart-item-actions">
                    <button class="remove-btn" onclick="removeFromCart(${index})" title="Xóa sản phẩm">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <div class="item-total">${itemTotal.toLocaleString('vi-VN')}đ</div>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    updateSummary(subtotal, cart.length);
}

// Cập nhật tóm tắt đơn hàng
function updateSummary(subtotal, itemCount) {
    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    const discountAmount = parseFloat(sessionStorage.getItem("discountAmount")) || 0;
    const total = subtotal + shippingFee - discountAmount;
    
    document.getElementById("total-items").innerText = itemCount;
    document.getElementById("subtotal").innerText = subtotal.toLocaleString('vi-VN') + 'đ';
    document.getElementById("shipping-fee").innerText = shippingFee === 0 ? 'Miễn phí' : shippingFee.toLocaleString('vi-VN') + 'đ';
    document.getElementById("total-amount").innerText = total.toLocaleString('vi-VN') + 'đ';
    
    // Hiển thị giảm giá nếu có
    if (discountAmount > 0) {
        document.getElementById("discount-row").style.display = "flex";
        document.getElementById("discount-amount").innerText = '-' + discountAmount.toLocaleString('vi-VN') + 'đ';
    } else {
        document.getElementById("discount-row").style.display = "none";
    }
}


// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    let cart = getUserCart();
    const itemName = cart[index].name;
    
    if (confirm(`Bạn có chắc muốn xóa "${itemName}" khỏi giỏ hàng?`)) {
        cart.splice(index, 1);
        setUserCart(cart);
        updateCartCount();
        displayCart();
        
        // Hiển thị thông báo
        showNotification('Đã xóa sản phẩm khỏi giỏ hàng', 'success');
    }
}

// Tăng số lượng sản phẩm
function increaseQuantity(index) {
    let cart = getUserCart();
    cart[index].quantity += 1;
    setUserCart(cart);
    updateCartCount();
    displayCart();
}

// Giảm số lượng sản phẩm
function decreaseQuantity(index) {
    let cart = getUserCart();
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        setUserCart(cart);
        updateCartCount();
        displayCart();
    } else {
        removeFromCart(index);
    }
}

// Xóa toàn bộ giỏ hàng
function clearCart() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
        const username = getCurrentUsername();
        localStorage.removeItem(`cart_${username}`);
        sessionStorage.removeItem('discountAmount');
        sessionStorage.removeItem('promoCode');
        updateCartCount();
        displayCart();
        showNotification('Đã xóa toàn bộ giỏ hàng', 'success');
    }
}

// Áp dụng mã giảm giá
function applyPromo() {
    const promoInput = document.getElementById('promo-input');
    const promoCode = promoInput.value.trim().toUpperCase();
    
    if (!promoCode) {
        showNotification('Vui lòng nhập mã giảm giá', 'error');
        return;
    }
    
    // Danh sách mã giảm giá
    const promoCodes = {
        'DUCHUY10': { discount: 0.1, minOrder: 200000, description: 'Giảm 10%' },
        'DUCHUY20': { discount: 0.2, minOrder: 500000, description: 'Giảm 20%' },
        'FREESHIP': { discount: 30000, minOrder: 0, description: 'Miễn phí ship' },
        'WELCOME50': { discount: 50000, minOrder: 100000, description: 'Giảm 50k' }
    };
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (promoCodes[promoCode]) {
        const promo = promoCodes[promoCode];
        
        if (subtotal < promo.minOrder) {
            showNotification(`Đơn hàng tối thiểu ${promo.minOrder.toLocaleString('vi-VN')}đ để sử dụng mã này`, 'error');
            return;
        }
        
        let discountAmount = promo.discount < 1 ? subtotal * promo.discount : promo.discount;
        sessionStorage.setItem('discountAmount', discountAmount);
        sessionStorage.setItem('promoCode', promoCode);
        
        displayCart();
        showNotification(`Đã áp dụng mã "${promoCode}" - ${promo.description}`, 'success');
        promoInput.value = '';
    } else {
        showNotification('Mã giảm giá không hợp lệ', 'error');
    }
}

// Thanh toán
function checkout() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (!isLoggedIn) {
        if (confirm("Bạn cần đăng nhập để thực hiện thanh toán. Chuyển đến trang đăng nhập?")) {
            window.location.href = "index.html";
        }
        return;
    }
    
    let cart = getUserCart();
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống', 'error');
        return;
    }
    
    // Kiểm tra thông tin tài khoản đầy đủ
    const username = localStorage.getItem('username');
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const account = accounts.find(acc => acc.username === username);
    
    if (!account || !account.phone || !account.address) {
        if (confirm('Vui lòng cập nhật đầy đủ số điện thoại và địa chỉ giao hàng trước khi thanh toán!\n\nBấm OK để cập nhật thông tin.')) {
            openModal('modal-account');
        }
        return;
    }
    
    // Tạo đơn hàng bán
    const orderId = 'DH' + Date.now();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingFee = subtotal >= 500000 ? 0 : 30000;
    const discountAmount = parseFloat(sessionStorage.getItem("discountAmount")) || 0;
    const total = subtotal + shippingFee - discountAmount;
    
    const salesOrder = {
        id: orderId,
        username: username, // Lưu username để phân quyền đơn hàng
        customerId: account.email, // Dùng email làm customer identifier
        customerName: account.displayName,
        customerPhone: account.phone,
        customerAddress: account.address,
        orderDate: new Date().toISOString().split('T')[0],
        products: cart.map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        shippingFee: shippingFee,
        discount: discountAmount,
        totalAmount: total,
        status: 'pending',
        paymentMethod: 'COD',
        notes: sessionStorage.getItem('promoCode') ? `Mã giảm giá: ${sessionStorage.getItem('promoCode')}` : ''
    };
    
    // Giảm tồn kho cho các sản phẩm trong đơn hàng
    decreaseProductStock(cart);
    
    // Lưu đơn hàng
    const salesOrders = JSON.parse(localStorage.getItem('salesOrders')) || [];
    salesOrders.push(salesOrder);
    localStorage.setItem('salesOrders', JSON.stringify(salesOrders));
    
    // Đồng bộ với customers
    syncAccountToCustomerOnCheckout(account);
    
    // Dispatch event để admin page cập nhật ngay lập tức
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'salesOrders',
        newValue: JSON.stringify(salesOrders),
        url: window.location.href
    }));
    
    // Thông báo thành công
    setTimeout(() => {
        alert(`✅ Đặt hàng thành công!\n\nMã đơn hàng: ${orderId}\nTổng tiền: ${total.toLocaleString('vi-VN')}đ\n\nCảm ơn bạn đã mua hàng tại DucHuy Store.\nChúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.`);
        const username = getCurrentUsername();
        localStorage.removeItem(`cart_${username}`);
        sessionStorage.removeItem('discountAmount');
        sessionStorage.removeItem('promoCode');
        updateCartCount();
        displayCart();
    }, 500);
}

// Đồng bộ thông tin khách hàng khi checkout
function syncAccountToCustomerOnCheckout(account) {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    let customerIndex = customers.findIndex(c => c.email === account.email);
    
    if (customerIndex !== -1) {
        customers[customerIndex].name = account.displayName;
        customers[customerIndex].phone = account.phone;
        customers[customerIndex].address = account.address;
        customers[customerIndex].notes = `Tài khoản: ${account.username}`;
    } else {
        const newCustomer = {
            id: Date.now(),
            name: account.displayName,
            phone: account.phone,
            email: account.email,
            address: account.address,
            birthDate: '',
            gender: 'Khác',
            joinDate: new Date().toISOString().split('T')[0],
            notes: `Tài khoản: ${account.username}`
        };
        customers.push(newCustomer);
    }
    
    localStorage.setItem('customers', JSON.stringify(customers));
}

// Giảm tồn kho khi đặt hàng
function decreaseProductStock(cart) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    cart.forEach(cartItem => {
        const productIndex = products.findIndex(p => p.id === cartItem.id);
        if (productIndex !== -1) {
            products[productIndex].stock -= cartItem.quantity;
            if (products[productIndex].stock < 0) {
                products[productIndex].stock = 0;
            }
        }
    });
    
    localStorage.setItem('products', JSON.stringify(products));
    
    // Trigger event để cập nhật UI nếu có
    window.dispatchEvent(new Event('productsUpdated'));
}

// Hiển thị thông báo
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.innerHTML = `
        <i class="fa-solid fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Tải giỏ hàng khi trang được mở
window.onload = function () {
    // Kiểm tra đăng nhập trước khi hiển thị giỏ hàng
    if (!checkLoginBeforeCart()) {
        return;
    }
    
    displayCart();
    updateCartCount();
    
    // Thêm animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
};

