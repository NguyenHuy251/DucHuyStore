// Lấy sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Tính số lượng đã bán cho từng sản phẩm từ đơn hàng hoàn thành
function calculateSoldQuantities() {
    const salesOrders = JSON.parse(localStorage.getItem('salesOrders')) || [];
    const soldMap = {};
    
    // Chỉ lấy đơn hàng đã hoàn thành
    const completedOrders = salesOrders.filter(order => order.status === 'completed');
    
    completedOrders.forEach(order => {
        if (order.products && Array.isArray(order.products)) {
            order.products.forEach(item => {
                const productId = item.id || item.productId;
                const quantity = parseInt(item.quantity) || 0;
                
                if (productId) {
                    soldMap[productId] = (soldMap[productId] || 0) + quantity;
                }
            });
        }
    });
    
    return soldMap;
}

let currentCategory = 'all';
let currentSort = 'default';

// Hiển thị sản phẩm
function displayProducts() {
    const container = document.getElementById('productsContainer');
    const noProducts = document.getElementById('noProducts');
    
    const productsData = getProducts();
    
    // Lọc sản phẩm
    let filteredProducts = currentCategory === 'all' 
        ? [...productsData] 
        : productsData.filter(p => p.category === currentCategory);
    
    // Sắp xếp sản phẩm
    if (currentSort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'name-asc') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }
    
    // Hiển thị
    if (filteredProducts.length === 0) {
        container.style.display = 'none';
        noProducts.style.display = 'flex';
    } else {
        container.style.display = 'grid';
        noProducts.style.display = 'none';
        
        // Tính số lượng đã bán cho mỗi sản phẩm
        const soldQuantities = calculateSoldQuantities();
        
        container.innerHTML = filteredProducts.map(product => {
            const soldQty = soldQuantities[product.id] || 0;
            const remainingStock = product.stock || 0;
            
            return `
            <div class="hot-product-card">
                <div class="hot-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="hot-product-info">
                    <h3 class="hot-product-name">${product.name}</h3>
                    <p class="hot-product-price">${product.price.toLocaleString('vi-VN')}đ</p>
                    <div class="product-stock-info">
                        <span class="stock-sold">Đã bán: ${soldQty}</span>
                    </div>
                    <div class="hot-product-actions">
                        <button class="btn-add-cart" onclick="checkLoginAndAddToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">
                            <i class="fa-solid fa-cart-plus"></i> Thêm giỏ
                        </button>
                        <button class="btn-view-detail" onclick="viewProductDetail('${product.name}', ${product.price}, '${product.image}')">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        }).join('');
    }
}

// Các nút lọc sản phẩm
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-category');
            displayProducts();
        });
    });

    // Chọn sắp xếp
    document.getElementById('sortProducts').addEventListener('change', function() {
        currentSort = this.value;
        displayProducts();
    });

    // Khởi tạo
    displayProducts();
    
    // Lắng nghe sự kiện cập nhật sản phẩm từ admin
    window.addEventListener('storage', function(e) {
        if (e.key === 'products') {
            displayProducts();
        }
    });
    
    // Lắng nghe custom event từ cùng tab
    window.addEventListener('productsUpdated', function() {
        displayProducts();
    });
});
