// Quản lý Sản phẩm
let isEditingProduct = false;
let editingProductId = null;

// Xử lý hiển thị form thêm sản phẩm
document.addEventListener('DOMContentLoaded', function () {
    const addProductButton = document.getElementById('addProduct');
    const productForm = document.getElementById('productForm');
    
    if (addProductButton && productForm) {
        addProductButton.addEventListener('click', function () {
            isEditingProduct = false;
            editingProductId = null;
            productForm.reset();
            document.getElementById('productFormTitle').innerHTML = '<i class="fa-solid fa-box-open"></i> Thêm Sản Phẩm Mới';
            productForm.style.display = productForm.style.display === 'none' || productForm.style.display === '' ? 'block' : 'none';
        });
    }

    // Xử lý search sản phẩm
    const productSearch = document.getElementById('productSearch');
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            filterProducts();
        });
    }

    // Xử lý filter category sản phẩm
    const productCategory = document.getElementById('productCategory');
    if (productCategory) {
        productCategory.addEventListener('change', function() {
            filterProducts();
        });
    }

    // Xử lý sort sản phẩm
    const productSort = document.getElementById('productSort');
    if (productSort) {
        productSort.addEventListener('change', function() {
            filterProducts();
        });
    }

    // Xử lý submit form sản phẩm
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isEditingProduct) {
                updateProduct();
            } else {
                addProduct();
            }
        });
    }

    // Quản lý Tin tức
    const addNewsButton = document.getElementById('addNews');
    const newsForm = document.getElementById('newsForm');

    if (addNewsButton && newsForm) {
        addNewsButton.addEventListener('click', function () {
            isEditingNews = false;
            editingNewsId = null;
            newsForm.reset();
            document.getElementById('newsFormTitle').innerHTML = '<i class="fa-solid fa-newspaper"></i> Thêm Tin Tức Mới';
            newsForm.style.display = newsForm.style.display === 'none' || newsForm.style.display === '' ? 'block' : 'none';
        });
    }

    // Xử lý search tin tức
    const newsSearch = document.getElementById('newsSearch');
    if (newsSearch) {
        newsSearch.addEventListener('input', function() {
            filterNews();
        });
    }

    // Xử lý filter category tin tức
    const newsCategory = document.getElementById('newsCategory');
    if (newsCategory) {
        newsCategory.addEventListener('change', function() {
            filterNews();
        });
    }

    // Xử lý sort tin tức
    const newsSort = document.getElementById('newsSort');
    if (newsSort) {
        newsSort.addEventListener('change', function() {
            filterNews();
        });
    }

    // Xử lý submit form tin tức
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isEditingNews) {
                updateNews();
            } else {
                addNews();
            }
        });
    }
});

// Hàm filter sản phẩm
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const category = document.getElementById('productCategory').value;
    const sortBy = document.getElementById('productSort').value;
    
    const table = document.getElementById('productTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    let visibleCount = 0;
    
    // Filter rows
    rows.forEach(row => {
        const productName = row.querySelector('.column-product-name').textContent.toLowerCase();
        const productCategory = row.querySelector('.column-product-category .category-badge').textContent.toLowerCase();
        
        const matchesSearch = productName.includes(searchTerm);
        const matchesCategory = category === 'all' || productCategory.includes(category.replace(/-/g, ' '));
        
        if (matchesSearch && matchesCategory) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Sort visible rows
    const visibleRows = rows.filter(row => row.style.display !== 'none');
    visibleRows.sort((a, b) => {
        const nameA = a.querySelector('.column-product-name').textContent;
        const nameB = b.querySelector('.column-product-name').textContent;
        const priceA = parseInt(a.querySelector('.column-product-price').textContent.replace(/[^\d]/g, ''));
        const priceB = parseInt(b.querySelector('.column-product-price').textContent.replace(/[^\d]/g, ''));
        
        switch(sortBy) {
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
            case 'price-asc':
                return priceA - priceB;
            case 'price-desc':
                return priceB - priceA;
            default:
                return 0;
        }
    });
    
    // Re-append sorted rows
    visibleRows.forEach(row => tbody.appendChild(row));
    
    // Update count
    document.getElementById('productCount').textContent = visibleCount;
}

// Hàm filter tin tức
function filterNews() {
    const searchTerm = document.getElementById('newsSearch').value.toLowerCase();
    const category = document.getElementById('newsCategory').value;
    const sortBy = document.getElementById('newsSort').value;
    
    const table = document.getElementById('newsTable');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    let visibleCount = 0;
    
    // Filter rows
    rows.forEach(row => {
        const newsTitle = row.querySelector('.column-news-title').textContent.toLowerCase();
        const newsCategory = row.querySelector('.column-news-category .category-badge').textContent.toLowerCase();
        
        const matchesSearch = newsTitle.includes(searchTerm);
        const matchesCategory = category === 'all' || newsCategory.includes(category.replace(/-/g, ' '));
        
        if (matchesSearch && matchesCategory) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Sort visible rows
    const visibleRows = rows.filter(row => row.style.display !== 'none');
    visibleRows.sort((a, b) => {
        const titleA = a.querySelector('.column-news-title').textContent;
        const titleB = b.querySelector('.column-news-title').textContent;
        const dateA = a.querySelector('.column-news-date').textContent;
        const dateB = b.querySelector('.column-news-date').textContent;
        
        switch(sortBy) {
            case 'title-asc':
                return titleA.localeCompare(titleB);
            case 'title-desc':
                return titleB.localeCompare(titleA);
            case 'date-asc':
                return dateA.localeCompare(dateB);
            case 'date-desc':
                return dateB.localeCompare(dateA);
            default:
                return 0;
        }
    });
    
    // Re-append sorted rows
    visibleRows.forEach(row => tbody.appendChild(row));
    
    // Update count
    document.getElementById('newsCount').textContent = visibleCount;
}

// Hàm hủy form sản phẩm
function cancelProductForm() {
    const productForm = document.getElementById('productForm');
    productForm.style.display = 'none';
    productForm.reset();
    isEditingProduct = false;
    editingProductId = null;
}

// Hàm hủy form tin tức
function cancelNewsForm() {
    const newsForm = document.getElementById('newsForm');
    newsForm.style.display = 'none';
    newsForm.reset();
    isEditingNews = false;
    editingNewsId = null;
}

// Hàm thêm sản phẩm
function addProduct() {
    const productId = document.getElementById('productID').value;
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productStock = document.getElementById('productStock').value;
    const productImageURL = document.getElementById('productImageURL').value;
    const productCategory = document.getElementById('productCategoryInput').value;
    
    // Hiển thị thông báo thành công
    alert('Đã thêm sản phẩm: ' + productName);
    
    // Reset form và ẩn
    cancelProductForm();
}

// Hàm sửa sản phẩm
function editProduct(productId) {
    isEditingProduct = true;
    editingProductId = productId;
    
    const productForm = document.getElementById('productForm');
    document.getElementById('productFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Sản Phẩm';
    
    // Tìm dữ liệu sản phẩm từ bảng (demo)
    alert('Chức năng chỉnh sửa sản phẩm: ' + productId);
    
    // Hiển thị form
    productForm.style.display = 'block';
    
    // Scroll to form
    productForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hàm cập nhật sản phẩm
function updateProduct() {
    const productId = document.getElementById('productID').value;
    const productName = document.getElementById('productName').value;
    
    alert('Đã cập nhật sản phẩm: ' + productName);
    cancelProductForm();
}

// Hàm xóa sản phẩm
function deleteProduct(productId) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
        alert('Đã xóa sản phẩm: ' + productId);
        // Xóa hàng trong bảng
        // Code xóa thực tế sẽ được implement ở đây
    }
}

// Quản lý Tin tức
let isEditingNews = false;
let editingNewsId = null;

// Hàm thêm tin tức
function addNews() {
    const newsId = document.getElementById('newsID').value;
    const newsTitle = document.getElementById('newsTitle').value;
    
    alert('Đã thêm tin tức: ' + newsTitle);
    cancelNewsForm();
}

// Hàm sửa tin tức
function editNews(newsId) {
    isEditingNews = true;
    editingNewsId = newsId;
    
    const newsForm = document.getElementById('newsForm');
    document.getElementById('newsFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Tin Tức';
    
    alert('Chức năng chỉnh sửa tin tức: ' + newsId);
    
    newsForm.style.display = 'block';
    newsForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hàm cập nhật tin tức
function updateNews() {
    const newsId = document.getElementById('newsID').value;
    const newsTitle = document.getElementById('newsTitle').value;
    
    alert('Đã cập nhật tin tức: ' + newsTitle);
    cancelNewsForm();
}

// Hàm xóa tin tức
function deleteNews(newsId) {
    if (confirm('Bạn có chắc chắn muốn xóa tin tức này?')) {
        alert('Đã xóa tin tức: ' + newsId);
    }
}