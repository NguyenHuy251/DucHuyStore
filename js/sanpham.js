// Lấy sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
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
        
        container.innerHTML = filteredProducts.map(product => `
            <div class="hot-product-card">
                <div class="hot-product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="hot-product-info">
                    <h3 class="hot-product-name">${product.name}</h3>
                    <p class="hot-product-price">${product.price.toLocaleString('vi-VN')}đ</p>
                    <div class="hot-product-actions">
                        <button class="btn-add-cart" onclick="checkLoginAndAddToCart('${product.name}', ${product.price}, '${product.image}')">
                            <i class="fa-solid fa-cart-plus"></i> Thêm giỏ
                        </button>
                        <button class="btn-view-detail" onclick="viewProductDetail('${product.name}', ${product.price}, '${product.image}')">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
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
