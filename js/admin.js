// Quản lý Sản phẩm
let isEditingProduct = false;
let editingProductId = null;

// Khởi tạo dữ liệu sản phẩm mặc định
function initializeProducts() {
    const existingProducts = localStorage.getItem('products');
    if (!existingProducts) {
        const defaultProducts = [
            {id: 'P001', name: 'Quạt trần điện cơ 91 QT1400', price: 820000, image: 'https://st.meta.vn/Data/image/2021/07/19/quat-tran-dien-co-91-qt1400-a.jpg', category: 'quat-tran', supplier: 'NCC001', stock: 25, description: 'Quạt trần điện cơ chất lượng cao'},
            {id: 'P002', name: 'Quạt trần thông minh', price: 3500000, image: 'https://www.crompton.co.in/cdn/shop/files/SilentproBlossomsmart_Denimblue_1_angle_1.png?v=1702372703', category: 'quat-tran', supplier: 'NCC002', stock: 5, description: 'Quạt trần điều khiển từ xa, nhiều chế độ'},
            {id: 'P003', name: 'Quạt trần Venus', price: 4000000, image: 'https://www.venushomeappliances.com/storage/app/product_type/20210107063528adorana-product.png', category: 'quat-tran', supplier: 'NCC003', stock: 15, description: 'Quạt trần cao cấp thương hiệu Venus'},
            {id: 'P004', name: 'Quạt đèn ốp trần', price: 4000000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeLSbMGdTO1tBRccKLpwVj7WiqOjCNxH6DSE_eYTAKxR9dnePC13mkpWYqG6FuvOmyWME&usqp=CAU', category: 'quat-tran', supplier: 'NCC001', stock: 0, description: 'Quạt tích hợp đèn chiếu sáng'},
            {id: 'P005', name: 'Quạt trần trang trí 5 cánh', price: 2000000, image: 'https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lmix0nh0asin74.webp', category: 'quat-tran', supplier: 'NCC002', stock: 20, description: 'Quạt trần trang trí hiện đại'},
            {id: 'P006', name: 'Quạt trần treo mini', price: 900000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiOd3Es0M4WO_4x503KRteRqEXnI2jWpNRyrlc9pO8Mr6SIg-yJcm4WfuC7bXgAddHkPU&usqp=CAU', category: 'quat-tran', supplier: 'NCC001', stock: 30, description: 'Quạt trần mini tiết kiệm điện'},
            {id: 'P007', name: 'Quạt đứng Senko LT1639', price: 850000, image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKD4sH1p3xaq_W2ty8mqJq_U4aK3tqu_ZiPxlEML5NuJe_MWsVcIDh94c7ir3KNFvxNXXUoi3cDnS_J32cpvekl0VIOGHFu8isauNB54pcnCYQLAQKP_kT9TCFne-Z9_ftOfznHw&usqp=CAc', category: 'quat-dung', supplier: 'NCC002', stock: 40, description: 'Quạt đứng Senko hiệu suất cao'},
            {id: 'P008', name: 'Quạt đứng Toshiba F-LSA10', price: 1500000, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR9eXieYBg8JoG_9oOQlxLV9lxTn5LK2jM3t1vrOJQr0agqh9o3g3_WC2QJvvFu-eDzo0fF8hlPLY7fxeZ6-XNTtFUts9Qp79GpINJwBSB6eiRYiG3YCU6Hkl4Y4A20eolK2EE0Kjg&usqp=CAc', category: 'quat-dung', supplier: 'NCC003', stock: 18, description: 'Quạt đứng Toshiba chính hãng'},
            {id: 'P009', name: 'Quạt đứng Panasonic F-409UGO', price: 1800000, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQBpg3PKl4E-ZynY43jS3WQGolFjjF8EpyTdjrNFNT6t3h96HUYgsyId-5QGk8wrFmnhPp6Dk0SQbNaXkX3Un8XsZcCnMOm_cXM5-ioXsyrq44sD9deaLkA5A&usqp=CAc', category: 'quat-dung', supplier: 'NCC003', stock: 12, description: 'Quạt đứng Panasonic tiết kiệm điện'},
            {id: 'P010', name: 'Quạt đứng Mitsubishi R16A-RV', price: 2200000, image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQ7ERp6vZqiJof5W8lUrCdo2yLgMdeEkJd8AV3DjGjQVFZyiacboK1qSRbaF5Fq6lc2SWzCqQc7gt4ThS9Ow_iJ8XZxs1RjYYfBhoiwfIgNlUFTGQrZlvXlwvskRJT6-sVTtslMbo&usqp=CAc', category: 'quat-dung', supplier: 'NCC002', stock: 8, description: 'Quạt đứng Mitsubishi cao cấp'},
            {id: 'P011', name: 'Quạt bàn', price: 650000, image: 'https://www.mitre10.com.au/media/catalog/category/thumbnail/desk-fan-mitre-10.jpg', category: 'quat-ban', supplier: 'NCC001', stock: 35, description: 'Quạt bàn tiện dụng'},
            {id: 'P012', name: 'Quạt bàn mini USB', price: 150000, image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSTQKUKCPZTVKZ0ZyV_fyuaw5XSxkkw-jSiRp5mnE4b3AWCi-yRgsd7kmEVDySV_mL9nigwJtJZfZwrqv5VLomtVCPOc-ateG2Za4qmdlcZxnrIuUVz9cO4z7xFb3b68wzF1zkAXw&usqp=CAc', category: 'quat-ban', supplier: 'NCC001', stock: 100, description: 'Quạt mini cắm USB tiện lợi'},
            {id: 'P013', name: 'Quạt bàn Hatari HT-S14M3', price: 580000, image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRRNZ6K40BhUmN-Xh_gqqICz_QjXAr-Zx2KxlHOhFFBMWvSkPZbDA3mIHo--Onqmdl-JDGfJWOCxg0mVS32m8UgY_Sj6U5rj3RI3YrX1yo&usqp=CAc', category: 'quat-ban', supplier: 'NCC002', stock: 22, description: 'Quạt bàn Hatari mạnh mẽ'},
            {id: 'P014', name: 'Quạt hơi nước Kangaroo', price: 1500000, image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRbYY35W7Qerq1ToJl-pPVbLnYSQIyoQtYo4F0SLhBNd3excOPDbBEXKXlX8YvcuUQ9CMQFhsuEyOT7VYqh22L3gTueJUwl6ujqxMoI7wI5twZz_DkFcPylLD0U&usqp=CAc', category: 'quat-hoi-nuoc', supplier: 'NCC003', stock: 15, description: 'Quạt hơi nước Kangaroo làm mát nhanh'},
            {id: 'P015', name: 'Quạt điều hòa Sunhouse SHD7540', price: 2500000, image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvFDOJlvoNBTkX5BIu065Yn6BLUkP0onmyLjqkxrjf-CRFDRzHywUa6HYhkBXFIVwzG8FENJEn6N1fwDGwKLOQW7MZwwTWTP1yhj3rb3tC2nCXgbUlkoiyIXlFLc4epuE6EELAMQY&usqp=CAc', category: 'quat-hoi-nuoc', supplier: 'NCC004', stock: 10, description: 'Quạt điều hòa Sunhouse tiết kiệm điện'},
            {id: 'P016', name: 'Quạt hơi nước Asia ACF50-A10', price: 1800000, image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSH_pUolIVJwZ503pEKs5CEBtXacze7b_Hs2JY77J06ocryWPoAYy1XYiT1FExZkMfOm3BRz9uaecgDT2Rk94K2b9Ju3BM4y9G2K_rOuxXPJHpqg6D4yzHdzQ3B0lndUKtIEdOd24I&usqp=CAc', category: 'quat-hoi-nuoc', supplier: 'NCC003', stock: 14, description: 'Quạt hơi nước Asia hiệu quả'}
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}

// Lấy danh sách sản phẩm từ localStorage
function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

// Lưu danh sách sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
    // Trigger event để các trang khác cập nhật
    window.dispatchEvent(new Event('productsUpdated'));
}

// Render bảng sản phẩm
function renderProductTable() {
    const products = getProducts();
    const tbody = document.querySelector('#productTable tbody');
    
    if (!tbody) return;
    
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">Chưa có sản phẩm nào</td></tr>';
        document.getElementById('productCount').textContent = '0';
        return;
    }
    
    tbody.innerHTML = products.map(product => {
        const categoryMap = {
            'quat-tran': 'Quạt trần',
            'quat-dung': 'Quạt đứng',
            'quat-ban': 'Quạt bàn',
            'quat-hoi-nuoc': 'Quạt hơi nước'
        };
        
        let stockClass = 'stock-available';
        if (product.stock === 0) stockClass = 'stock-out';
        else if (product.stock < 10) stockClass = 'stock-low';
        
        return `
            <tr data-product-id="${product.id}">
                <td class="column-product-id">${product.id}</td>
                <td class="column-product-image">
                    <img src="${product.image}" alt="${product.name}" class="np-image" />
                </td>
                <td class="column-product-name">${product.name}</td>
                <td class="column-product-category"><span class="category-badge">${categoryMap[product.category] || product.category}</span></td>
                <td class="column-product-price">${product.price.toLocaleString('vi-VN')}đ</td>
                <td class="column-product-stock"><span class="stock-badge ${stockClass}">${product.stock}</span></td>
                <td class="column-product-actions">
                    <button class="btn-edit" onclick="editProduct('${product.id}')" title="Chỉnh sửa">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')" title="Xóa">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('productCount').textContent = products.length;
}

// Xử lý hiển thị form thêm sản phẩm
document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo dữ liệu sản phẩm
    initializeProducts();
    renderProductTable();
    
    // Khởi tạo dữ liệu tin tức
    initializeNews();
    renderNewsTable();
    
    // Khởi tạo dữ liệu khách hàng
    initializeCustomers();
    renderCustomerTable();
    
    // Khởi tạo dữ liệu đơn hàng
    initializeSalesOrders();
    renderSalesOrderTable();
    loadSalesOrderOptions();
    
    initializePurchaseOrders();
    renderPurchaseOrderTable();
    loadPurchaseOrderOptions();
    
    // Cập nhật dashboard và báo cáo
    updateDashboard();
    loadProductFilterOptions();
    updateSalesReport();
    updatePurchaseOrdersReport();
    
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

    // Quản lý Nhà cung cấp
    const addSupplierButton = document.getElementById('addSupplier');
    const supplierForm = document.getElementById('supplierForm');
    const cancelSupplierBtn = document.getElementById('cancelSupplierBtn');

    if (addSupplierButton && supplierForm) {
        addSupplierButton.addEventListener('click', function () {
            isEditingSupplier = false;
            editingSupplierIndex = null;
            supplierForm.reset();
            document.getElementById('supplierFormTitle').innerHTML = '<i class="fa-solid fa-truck"></i> Thêm Nhà Cung Cấp Mới';
            supplierForm.style.display = supplierForm.style.display === 'none' || supplierForm.style.display === '' ? 'block' : 'none';
        });
    }

    if (cancelSupplierBtn) {
        cancelSupplierBtn.addEventListener('click', function() {
            cancelSupplierForm();
        });
    }

    // Xử lý search nhà cung cấp
    const supplierSearch = document.getElementById('supplierSearch');
    if (supplierSearch) {
        supplierSearch.addEventListener('input', function() {
            filterSuppliers();
        });
    }

    // Xử lý filter status nhà cung cấp
    const supplierStatusFilter = document.getElementById('supplierStatusFilter');
    if (supplierStatusFilter) {
        supplierStatusFilter.addEventListener('change', function() {
            filterSuppliers();
        });
    }

    // Xử lý sort nhà cung cấp
    const supplierSort = document.getElementById('supplierSort');
    if (supplierSort) {
        supplierSort.addEventListener('change', function() {
            filterSuppliers();
        });
    }

    // Xử lý submit form nhà cung cấp
    if (supplierForm) {
        supplierForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isEditingSupplier) {
                updateSupplier();
            } else {
                addSupplier();
            }
        });
    }

    // Xử lý các nút edit/delete trong bảng nhà cung cấp
    const supplierTableBody = document.getElementById('supplierTableBody');
    if (supplierTableBody) {
        supplierTableBody.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;

            const row = btn.closest('tr');
            const index = parseInt(row.getAttribute('data-index'));

            if (btn.classList.contains('btn-edit')) {
                editSupplier(index);
            } else if (btn.classList.contains('btn-delete')) {
                deleteSupplier(index);
            }
        });
    }

    // Quản lý Nhân viên
    const addEmployeeButton = document.getElementById('addEmployee');
    const employeeForm = document.getElementById('employeeForm');
    const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');

    if (addEmployeeButton && employeeForm) {
        addEmployeeButton.addEventListener('click', function () {
            isEditingEmployee = false;
            editingEmployeeIndex = null;
            employeeForm.reset();
            document.getElementById('employeeFormTitle').innerHTML = '<i class="fa-solid fa-users"></i> Thêm Nhân Viên Mới';
            employeeForm.style.display = employeeForm.style.display === 'none' || employeeForm.style.display === '' ? 'block' : 'none';
        });
    }

    if (cancelEmployeeBtn) {
        cancelEmployeeBtn.addEventListener('click', function() {
            cancelEmployeeForm();
        });
    }

    // Xử lý search nhân viên
    const employeeSearch = document.getElementById('employeeSearch');
    if (employeeSearch) {
        employeeSearch.addEventListener('input', function() {
            filterEmployees();
        });
    }

    // Xử lý filter chức vụ nhân viên
    const employeePositionFilter = document.getElementById('employeePositionFilter');
    if (employeePositionFilter) {
        employeePositionFilter.addEventListener('change', function() {
            filterEmployees();
        });
    }

    // Xử lý filter trạng thái nhân viên
    const employeeStatusFilter = document.getElementById('employeeStatusFilter');
    if (employeeStatusFilter) {
        employeeStatusFilter.addEventListener('change', function() {
            filterEmployees();
        });
    }

    // Xử lý sort nhân viên
    const employeeSort = document.getElementById('employeeSort');
    if (employeeSort) {
        employeeSort.addEventListener('change', function() {
            filterEmployees();
        });
    }

    // Xử lý submit form nhân viên
    if (employeeForm) {
        employeeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isEditingEmployee) {
                updateEmployee();
            } else {
                addEmployee();
            }
        });
    }

    // Xử lý các nút edit/delete trong bảng nhân viên
    const employeeTableBody = document.getElementById('employeeTableBody');
    if (employeeTableBody) {
        employeeTableBody.addEventListener('click', function(e) {
            const btn = e.target.closest('button');
            if (!btn) return;

            const row = btn.closest('tr');
            const index = parseInt(row.getAttribute('data-index'));

            if (btn.classList.contains('btn-edit')) {
                editEmployee(index);
            } else if (btn.classList.contains('btn-delete')) {
                deleteEmployee(index);
            }
        });
    }
    
    // Quản lý Khách hàng
    const addCustomerButton = document.getElementById('addCustomer');
    const customerForm = document.getElementById('customerForm');

    if (addCustomerButton && customerForm) {
        addCustomerButton.addEventListener('click', function () {
            isEditingCustomer = false;
            editingCustomerId = null;
            customerForm.reset();
            document.getElementById('customerFormTitle').innerHTML = '<i class="fa-solid fa-user-plus"></i> Thêm Khách Hàng Mới';
            customerForm.style.display = customerForm.style.display === 'none' || customerForm.style.display === '' ? 'block' : 'none';
        });
    }

    // Xử lý search khách hàng
    const customerSearch = document.getElementById('customerSearch');
    if (customerSearch) {
        customerSearch.addEventListener('input', function() {
            filterCustomers();
        });
    }

    // Xử lý filter status khách hàng
    const customerStatusFilter = document.getElementById('customerStatusFilter');
    if (customerStatusFilter) {
        customerStatusFilter.addEventListener('change', function() {
            filterCustomers();
        });
    }

    // Xử lý sort khách hàng
    const customerSort = document.getElementById('customerSort');
    if (customerSort) {
        customerSort.addEventListener('change', function() {
            filterCustomers();
        });
    }

    // Xử lý submit form khách hàng
    if (customerForm) {
        customerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isEditingCustomer) {
                updateCustomer();
            } else {
                addCustomer();
            }
        });
    }

    // Quản lý Đơn hàng bán
    const addSalesOrderButton = document.getElementById('addSalesOrder');
    const salesOrderForm = document.getElementById('salesOrderForm');

    if (addSalesOrderButton && salesOrderForm) {
        addSalesOrderButton.addEventListener('click', function () {
            isEditingSalesOrder = false;
            editingSalesOrderId = null;
            salesOrderForm.reset();
            loadSalesOrderOptions();
            document.getElementById('salesOrderFormTitle').innerHTML = '<i class="fa-solid fa-cart-plus"></i> Thêm Đơn Hàng Bán';
            salesOrderForm.style.display = salesOrderForm.style.display === 'none' || salesOrderForm.style.display === '' ? 'block' : 'none';
        });
    }

    // Xử lý submit form đơn hàng bán (tách riêng để hoạt động khi không có nút thêm)
    if (salesOrderForm) {
        salesOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isEditingSalesOrder) {
                updateSalesOrder();
            } else {
                addSalesOrder();
            }
        });
    }

    // Xử lý search đơn hàng bán
    const salesOrderSearch = document.getElementById('salesOrderSearch');
    if (salesOrderSearch) {
        salesOrderSearch.addEventListener('input', function() {
            filterSalesOrders();
        });
    }

    // Xử lý filter status đơn hàng bán
    const salesOrderStatusFilter = document.getElementById('salesOrderStatusFilter');
    if (salesOrderStatusFilter) {
        salesOrderStatusFilter.addEventListener('change', function() {
            filterSalesOrders();
        });
    }

    // Xử lý sort đơn hàng bán
    const salesOrderSort = document.getElementById('salesOrderSort');
    if (salesOrderSort) {
        salesOrderSort.addEventListener('change', function() {
            filterSalesOrders();
        });
    }

    // Xử lý thay đổi sản phẩm để tự động điền giá
    const salesOrderProduct = document.getElementById('salesOrderProduct');
    if (salesOrderProduct) {
        salesOrderProduct.addEventListener('change', function() {
            const selectedOption = this.selectedOptions[0];
            if (selectedOption && selectedOption.dataset.price) {
                document.getElementById('salesOrderPrice').value = selectedOption.dataset.price;
                calculateSalesOrderTotal();
            }
        });
    }

    // Xử lý thay đổi số lượng
    const salesOrderQuantity = document.getElementById('salesOrderQuantity');
    if (salesOrderQuantity) {
        salesOrderQuantity.addEventListener('input', function() {
            calculateSalesOrderTotal();
        });
    }

    // Quản lý Đơn hàng nhập
    const addPurchaseOrderButton = document.getElementById('addPurchaseOrder');
    const purchaseOrderForm = document.getElementById('purchaseOrderForm');

    if (addPurchaseOrderButton && purchaseOrderForm) {
        addPurchaseOrderButton.addEventListener('click', function () {
            isEditingPurchaseOrder = false;
            editingPurchaseOrderId = null;
            purchaseOrderForm.reset();
            loadPurchaseOrderOptions();
            document.getElementById('purchaseOrderFormTitle').innerHTML = '<i class="fa-solid fa-truck-loading"></i> Thêm Đơn Hàng Nhập';
            purchaseOrderForm.style.display = purchaseOrderForm.style.display === 'none' || purchaseOrderForm.style.display === '' ? 'block' : 'none';
        });
    }

    // Xử lý search đơn hàng nhập
    const purchaseOrderSearch = document.getElementById('purchaseOrderSearch');
    if (purchaseOrderSearch) {
        purchaseOrderSearch.addEventListener('input', function() {
            filterPurchaseOrders();
        });
    }

    // Xử lý filter status đơn hàng nhập
    const purchaseOrderStatusFilter = document.getElementById('purchaseOrderStatusFilter');
    if (purchaseOrderStatusFilter) {
        purchaseOrderStatusFilter.addEventListener('change', function() {
            filterPurchaseOrders();
        });
    }

    // Xử lý sort đơn hàng nhập
    const purchaseOrderSort = document.getElementById('purchaseOrderSort');
    if (purchaseOrderSort) {
        purchaseOrderSort.addEventListener('change', function() {
            filterPurchaseOrders();
        });
    }

    // Xử lý thay đổi số lượng và giá để tính tổng tiền
    const purchaseOrderQuantity = document.getElementById('purchaseOrderQuantity');
    const purchaseOrderPrice = document.getElementById('purchaseOrderPrice');
    
    if (purchaseOrderQuantity) {
        purchaseOrderQuantity.addEventListener('input', function() {
            calculatePurchaseOrderTotal();
        });
    }
    
    if (purchaseOrderPrice) {
        purchaseOrderPrice.addEventListener('input', function() {
            calculatePurchaseOrderTotal();
        });
    }

    // Xử lý submit form đơn hàng nhập
    if (purchaseOrderForm) {
        purchaseOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (isEditingPurchaseOrder) {
                updatePurchaseOrder();
            } else {
                addPurchaseOrder();
            }
        });
    }

    // Lắng nghe sự kiện storage từ các tab khác
    window.addEventListener('storage', function(e) {
        if (e.key === 'products') {
            renderProductTable();
            updateDashboard();
        } else if (e.key === 'news') {
            renderNewsTable();
        } else if (e.key === 'customers') {
            renderCustomerTable();
            updateDashboard();
        } else if (e.key === 'salesOrders') {
            renderSalesOrderTable();
            updateDashboard();
            updateSalesReport();
        } else if (e.key === 'purchaseOrders') {
            renderPurchaseOrderTable();
            updateDashboard();
            updatePurchaseOrdersReport();
        } else if (e.key === 'accounts') {
            // Khi có tài khoản mới đăng ký, đồng bộ vào customers
            syncAccountsToCustomers();
            renderCustomerTable();
            updateDashboard();
        }
    });
    
    // Lắng nghe sự kiện cập nhật trong cùng tab
    window.addEventListener('productsUpdated', function() {
        renderProductTable();
        updateDashboard();
    });
    
    window.addEventListener('newsUpdated', function() {
        renderNewsTable();
    });
    
    window.addEventListener('customersUpdated', function() {
        renderCustomerTable();
        updateDashboard();
    });
    
    window.addEventListener('salesOrdersUpdated', function() {
        renderSalesOrderTable();
        updateDashboard();
        updateSalesReport();
    });
    
    window.addEventListener('purchaseOrdersUpdated', function() {
        renderPurchaseOrderTable();
        updateDashboard();
        updatePurchaseOrdersReport();
    });
});

// Hàm filter sản phẩm
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const category = document.getElementById('productCategory').value;
    const sortBy = document.getElementById('productSort').value;
    
    let products = getProducts();
    
    // Filter
    products = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.id.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || product.category === category;
        return matchesSearch && matchesCategory;
    });
    
    // Sort
    products.sort((a, b) => {
        switch(sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name, 'vi');
            case 'name-desc':
                return b.name.localeCompare(a.name, 'vi');
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            default:
                return 0;
        }
    });
    
    // Render filtered products
    const tbody = document.querySelector('#productTable tbody');
    if (!tbody) return;
    
    const categoryMap = {
        'quat-tran': 'Quạt trần',
        'quat-dung': 'Quạt đứng',
        'quat-ban': 'Quạt bàn',
        'quat-hoi-nuoc': 'Quạt hơi nước'
    };
    
    tbody.innerHTML = products.map(product => {
        let stockClass = 'stock-available';
        if (product.stock === 0) stockClass = 'stock-out';
        else if (product.stock < 10) stockClass = 'stock-low';
        
        return `
            <tr data-product-id="${product.id}">
                <td class="column-product-id">${product.id}</td>
                <td class="column-product-image">
                    <img src="${product.image}" alt="${product.name}" class="np-image" />
                </td>
                <td class="column-product-name">${product.name}</td>
                <td class="column-product-category"><span class="category-badge">${categoryMap[product.category] || product.category}</span></td>
                <td class="column-product-price">${product.price.toLocaleString('vi-VN')}đ</td>
                <td class="column-product-stock"><span class="stock-badge ${stockClass}">${product.stock}</span></td>
                <td class="column-product-actions">
                    <button class="btn-edit" onclick="editProduct('${product.id}')" title="Chỉnh sửa">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')" title="Xóa">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('productCount').textContent = products.length;
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
    document.getElementById('productID').readOnly = false;
    isEditingProduct = false;
    editingProductId = null;
}

// Hàm thêm sản phẩm
function addProduct() {
    const productId = document.getElementById('productID').value.trim();
    const productName = document.getElementById('productName').value.trim();
    const productPrice = parseInt(document.getElementById('productPrice').value);
    const productStock = parseInt(document.getElementById('productStock').value) || 0;
    const productImageURL = document.getElementById('productImageURL').value.trim();
    const productCategory = document.getElementById('productCategoryInput').value;
    const productSupplier = document.getElementById('productSupplier').value;
    const productDescription = document.getElementById('productDescription').value.trim();
    
    // Validation
    if (!productId || !productName || !productPrice || !productImageURL || !productCategory) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    const products = getProducts();
    
    // Kiểm tra trùng ID
    if (products.some(p => p.id === productId)) {
        alert('Mã sản phẩm đã tồn tại!');
        return;
    }
    
    const newProduct = {
        id: productId,
        name: productName,
        price: productPrice,
        stock: productStock,
        image: productImageURL,
        category: productCategory,
        supplier: productSupplier,
        description: productDescription
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    alert('Đã thêm sản phẩm: ' + productName);
    
    renderProductTable();
    cancelProductForm();
}

// Hàm sửa sản phẩm
function editProduct(productId) {
    isEditingProduct = true;
    editingProductId = productId;
    
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }
    
    // Điền dữ liệu vào form
    document.getElementById('productID').value = product.id;
    document.getElementById('productID').readOnly = true; // Không cho sửa ID
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productImageURL').value = product.image;
    document.getElementById('productCategoryInput').value = product.category;
    document.getElementById('productSupplier').value = product.supplier || '';
    document.getElementById('productDescription').value = product.description || '';
    
    const productForm = document.getElementById('productForm');
    document.getElementById('productFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Sản Phẩm';
    
    productForm.style.display = 'block';
    productForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hàm cập nhật sản phẩm
function updateProduct() {
    const productId = document.getElementById('productID').value.trim();
    const productName = document.getElementById('productName').value.trim();
    const productPrice = parseInt(document.getElementById('productPrice').value);
    const productStock = parseInt(document.getElementById('productStock').value) || 0;
    const productImageURL = document.getElementById('productImageURL').value.trim();
    const productCategory = document.getElementById('productCategoryInput').value;
    const productSupplier = document.getElementById('productSupplier').value;
    const productDescription = document.getElementById('productDescription').value.trim();
    
    if (!productName || !productPrice || !productImageURL || !productCategory) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    const products = getProducts();
    const index = products.findIndex(p => p.id === productId);
    
    if (index === -1) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }
    
    products[index] = {
        id: productId,
        name: productName,
        price: productPrice,
        stock: productStock,
        image: productImageURL,
        category: productCategory,
        supplier: productSupplier,
        description: productDescription
    };
    
    saveProducts(products);
    
    alert('Đã cập nhật sản phẩm: ' + productName);
    
    renderProductTable();
    cancelProductForm();
}

// Hàm xóa sản phẩm
function deleteProduct(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Không tìm thấy sản phẩm!');
        return;
    }
    
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm: ' + product.name + '?')) {
        const newProducts = products.filter(p => p.id !== productId);
        saveProducts(newProducts);
        
        alert('Đã xóa sản phẩm: ' + product.name);
        renderProductTable();
    }
}

// ===== QUẢN LÝ TIN TỨC =====
let isEditingNews = false;
let editingNewsId = null;

// Khởi tạo dữ liệu tin tức mặc định
function initializeNews() {
    const existingNews = localStorage.getItem('news');
    if (!existingNews) {
        const defaultNews = [
            {id: 'N001', title: 'Mẹo dùng quạt điện mát như điều hòa', description: 'Với một số mẹo nhỏ, quạt điện sẽ làm mát phòng nhanh và mạnh như điều hòa, đặc biệt hữu ích trong ngày nắng nóng.', image: 'https://i1-giadinh.vnecdn.net/2023/06/10/quat33-1686384087-6994-1686385266.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=fVvzXkcFLWEk4VPGO2RGUA', category: 'meo-hay', author: 'Nguyễn Văn A', date: '15/11/2024', views: 1250, comments: 45, readTime: '5 phút'},
            {id: 'N002', title: 'Khác biệt giữa quạt hơi nước và quạt điều hòa', description: 'Hai loại quạt có cơ chế hoạt động khác nhau nên hiệu quả làm mát, giá bán và trải nghiệm sử dụng khác biệt.', image: 'https://i1-sohoa.vnecdn.net/2023/05/17/top-1684258810-4869-1684258834.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=ms39de9tGRTzyUNXe7YlTQ', category: 'tin-cong-nghe', author: 'Trần Thị B', date: '12/11/2024', views: 980, comments: 30, readTime: '7 phút'},
            {id: 'N003', title: 'Video làm sạch cánh quạt không cần tháo khung', description: 'Video hướng dẫn làm sạch cánh quạt bằng dung dịch muối, baking soda và dấm được chia sẻ mạnh trên mạng xã hội.', image: 'https://i1-sohoa.vnecdn.net/2019/11/01/thu-thuat-don-gian-de-ve-sinh-quat-dien-1572575833.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=1jlr2_hjTJPjJPFgkiOgPA', category: 'huong-dan', author: 'Lê Văn C', date: '08/11/2024', views: 2100, comments: 77, readTime: '4 phút'}
        ];
        localStorage.setItem('news', JSON.stringify(defaultNews));
    }
}

// Lấy danh sách tin tức từ localStorage
function getNews() {
    return JSON.parse(localStorage.getItem('news')) || [];
}

// Lưu danh sách tin tức vào localStorage
function saveNews(news) {
    localStorage.setItem('news', JSON.stringify(news));
    window.dispatchEvent(new Event('newsUpdated'));
}

// Render bảng tin tức
function renderNewsTable() {
    const news = getNews();
    const tbody = document.querySelector('#newsTable tbody');
    
    if (!tbody) return;
    
    if (news.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px;">Chưa có tin tức nào</td></tr>';
        document.getElementById('newsCount').textContent = '0';
        return;
    }
    
    const categoryMap = {
        'khuyen-mai': 'Khuyến mãi',
        'meo-hay': 'Mẹo hay',
        'tin-cong-nghe': 'Công nghệ',
        'huong-dan': 'Hướng dẫn'
    };
    
    tbody.innerHTML = news.map(item => `
        <tr data-news-id="${item.id}">
            <td class="column-news-image">
                <img src="${item.image}" alt="${item.title}" class="np-image" />
            </td>
            <td class="column-news-title">${item.title}</td>
            <td class="column-news-category"><span class="category-badge">${categoryMap[item.category] || item.category}</span></td>
            <td class="column-news-author">${item.author}</td>
            <td class="column-news-date">${item.date}</td>
            <td class="column-news-actions">
                <button class="btn-edit" onclick="editNews('${item.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteNews('${item.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('newsCount').textContent = news.length;
}

// Hàm filter tin tức
function filterNews() {
    const searchTerm = document.getElementById('newsSearch').value.toLowerCase();
    const category = document.getElementById('newsCategory').value;
    const sortBy = document.getElementById('newsSort').value;
    
    let news = getNews();
    
    // Filter
    news = news.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.id.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || item.category === category;
        return matchesSearch && matchesCategory;
    });
    
    // Sort
    news.sort((a, b) => {
        switch(sortBy) {
            case 'title-asc':
                return a.title.localeCompare(b.title, 'vi');
            case 'title-desc':
                return b.title.localeCompare(a.title, 'vi');
            case 'date-asc':
                return a.date.localeCompare(b.date);
            case 'date-desc':
                return b.date.localeCompare(a.date);
            default:
                return 0;
        }
    });
    
    // Render filtered news
    const tbody = document.querySelector('#newsTable tbody');
    if (!tbody) return;
    
    const categoryMap = {
        'khuyen-mai': 'Khuyến mãi',
        'meo-hay': 'Mẹo hay',
        'tin-cong-nghe': 'Công nghệ',
        'huong-dan': 'Hướng dẫn'
    };
    
    tbody.innerHTML = news.map(item => `
        <tr data-news-id="${item.id}">
            <td class="column-news-id">${item.id}</td>
            <td class="column-news-image">
                <img src="${item.image}" alt="${item.title}" class="np-image" />
            </td>
            <td class="column-news-title">${item.title}</td>
            <td class="column-news-category"><span class="category-badge">${categoryMap[item.category] || item.category}</span></td>
            <td class="column-news-date">${item.date}</td>
            <td class="column-news-actions">
                <button class="btn-edit" onclick="editNews('${item.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteNews('${item.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('newsCount').textContent = news.length;
}

// Hàm hủy form tin tức
function cancelNewsForm() {
    const newsForm = document.getElementById('newsForm');
    newsForm.style.display = 'none';
    newsForm.reset();
    document.getElementById('newsID').readOnly = false;
    isEditingNews = false;
    editingNewsId = null;
}

// Hàm thêm tin tức
function addNews() {
    const newsId = document.getElementById('newsID').value.trim();
    const newsTitle = document.getElementById('newsTitle').value.trim();
    const newsCategory = document.getElementById('newsCategoryInput').value;
    const newsAuthor = document.getElementById('newsAuthor').value.trim() || 'Admin';
    const newsImage = document.getElementById('newsImageURL').value.trim();
    const newsExcerpt = document.getElementById('newsExcerpt').value.trim();
    const newsContent = document.getElementById('newsContent').value.trim();
    
    if (!newsId || !newsTitle || !newsCategory || !newsImage || !newsContent) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    const news = getNews();
    
    if (news.some(n => n.id === newsId)) {
        alert('Mã tin tức đã tồn tại!');
        return;
    }
    
    // Tạo ngày hiện tại theo định dạng DD/MM/YYYY
    const today = new Date();
    const newsDate = String(today.getDate()).padStart(2, '0') + '/' + 
                     String(today.getMonth() + 1).padStart(2, '0') + '/' + 
                     today.getFullYear();
    
    const newNews = {
        id: newsId,
        title: newsTitle,
        category: newsCategory,
        author: newsAuthor,
        date: newsDate,
        image: newsImage,
        description: newsExcerpt,
        content: newsContent,
        views: 0,
        comments: 0,
        readTime: '5 phút'
    };
    
    news.push(newNews);
    saveNews(news);
    
    alert('Đã thêm tin tức: ' + newsTitle);
    renderNewsTable();
    cancelNewsForm();
}

// Hàm sửa tin tức
function editNews(newsId) {
    isEditingNews = true;
    editingNewsId = newsId;
    
    const news = getNews();
    const item = news.find(n => n.id === newsId);
    
    if (!item) {
        alert('Không tìm thấy tin tức!');
        return;
    }
    
    document.getElementById('newsID').value = item.id;
    document.getElementById('newsID').readOnly = true;
    document.getElementById('newsTitle').value = item.title;
    document.getElementById('newsCategoryInput').value = item.category;
    document.getElementById('newsAuthor').value = item.author;
    document.getElementById('newsImageURL').value = item.image;
    document.getElementById('newsExcerpt').value = item.description || '';
    document.getElementById('newsContent').value = item.content || '';
    
    const newsForm = document.getElementById('newsForm');
    document.getElementById('newsFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Tin Tức';
    
    newsForm.style.display = 'block';
    newsForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hàm cập nhật tin tức
function updateNews() {
    const newsId = document.getElementById('newsID').value.trim();
    const newsTitle = document.getElementById('newsTitle').value.trim();
    const newsCategory = document.getElementById('newsCategoryInput').value;
    const newsAuthor = document.getElementById('newsAuthor').value.trim() || 'Admin';
    const newsImage = document.getElementById('newsImageURL').value.trim();
    const newsExcerpt = document.getElementById('newsExcerpt').value.trim();
    const newsContent = document.getElementById('newsContent').value.trim();
    
    if (!newsTitle || !newsCategory || !newsImage || !newsContent) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    const news = getNews();
    const index = news.findIndex(n => n.id === newsId);
    
    if (index === -1) {
        alert('Không tìm thấy tin tức!');
        return;
    }
    
    news[index] = {
        ...news[index],
        title: newsTitle,
        category: newsCategory,
        author: newsAuthor,
        image: newsImage,
        description: newsExcerpt,
        content: newsContent
    };
    
    saveNews(news);
    
    alert('Đã cập nhật tin tức: ' + newsTitle);
    renderNewsTable();
    cancelNewsForm();
}

// Hàm xóa tin tức
function deleteNews(newsId) {
    const news = getNews();
    const item = news.find(n => n.id === newsId);
    
    if (!item) {
        alert('Không tìm thấy tin tức!');
        return;
    }
    
    if (confirm('Bạn có chắc chắn muốn xóa tin tức: ' + item.title + '?')) {
        const newNews = news.filter(n => n.id !== newsId);
        saveNews(newNews);
        
        alert('Đã xóa tin tức: ' + item.title);
        renderNewsTable();
    }
}

// ===== QUẢN LÝ KHÁCH HÀNG =====
let isEditingCustomer = false;
let editingCustomerId = null;

// Khởi tạo dữ liệu khách hàng mặc định
function initializeCustomers() {
    const existingCustomers = localStorage.getItem('customers');
    if (!existingCustomers) {
        const defaultCustomers = [
            {id: 'KH001', name: 'Nguyễn Văn A', phone: '0336113905', email: 'nguyenvana@gmail.com', address: 'Hà Nội', birthDate: '1990-05-15', gender: 'Nam', joinDate: '2024-01-15', notes: 'Khách hàng thân thiết'},
            {id: 'KH002', name: 'Trần Thị B', phone: '0987654321', email: 'tranthib@gmail.com', address: 'Hưng Yên', birthDate: '1985-08-20', gender: 'Nữ', joinDate: '2024-03-20', notes: ''},
            {id: 'KH003', name: 'Lê Minh C', phone: '0912345678', email: 'leminhc@gmail.com', address: 'Hà Nội', birthDate: '1992-11-10', gender: 'Nam', joinDate: '2024-06-10', notes: ''}
        ];
        localStorage.setItem('customers', JSON.stringify(defaultCustomers));
    }
    
    // Đồng bộ tài khoản từ accounts vào customers
    syncAccountsToCustomers();
}

// Đồng bộ tất cả tài khoản đã đăng ký vào danh sách khách hàng
function syncAccountsToCustomers() {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    
    let hasNewCustomer = false;
    
    accounts.forEach(account => {
        // Kiểm tra xem đã có khách hàng với email này chưa
        const existingCustomer = customers.find(c => c.email === account.email);
        
        if (!existingCustomer) {
            // Tạo khách hàng mới từ tài khoản
            const newCustomer = {
                id: Date.now() + Math.random(), // Unique ID
                name: account.displayName,
                phone: account.phone || '',
                email: account.email,
                address: account.address || '',
                birthDate: '',
                gender: 'Khác',
                joinDate: account.createdAt ? account.createdAt.split(',')[0].split('/').reverse().join('-') : new Date().toISOString().split('T')[0],
                notes: `Tài khoản: ${account.username}`
            };
            customers.push(newCustomer);
            hasNewCustomer = true;
        } else {
            // Cập nhật thông tin nếu có thay đổi
            if (account.phone && existingCustomer.phone !== account.phone) {
                existingCustomer.phone = account.phone;
                hasNewCustomer = true;
            }
            if (account.address && existingCustomer.address !== account.address) {
                existingCustomer.address = account.address;
                hasNewCustomer = true;
            }
            if (existingCustomer.name !== account.displayName) {
                existingCustomer.name = account.displayName;
                hasNewCustomer = true;
            }
        }
    });
    
    if (hasNewCustomer) {
        localStorage.setItem('customers', JSON.stringify(customers));
    }
}

// Lấy danh sách khách hàng từ localStorage
function getCustomers() {
    return JSON.parse(localStorage.getItem('customers')) || [];
}

// Lưu danh sách khách hàng vào localStorage
function saveCustomers(customers) {
    localStorage.setItem('customers', JSON.stringify(customers));
    window.dispatchEvent(new Event('customersUpdated'));
}

// Render bảng khách hàng
function renderCustomerTable() {
    const customers = getCustomers();
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const tbody = document.querySelector('#customerTable tbody');
    
    if (!tbody) return;
    
    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 30px;">Chưa có khách hàng nào</td></tr>';
        document.getElementById('customerCount').textContent = '0';
        return;
    }
    
    tbody.innerHTML = customers.map(customer => {
        // Tìm account tương ứng với customer
        let account = null;
        if (customer.notes && customer.notes.includes('Tài khoản:')) {
            const username = customer.notes.replace('Tài khoản:', '').trim();
            account = accounts.find(acc => acc.username === username);
        }
        
        return `
        <tr data-customer-id="${customer.id}">
            <td class="column-customer-name">${customer.name}</td>
            <td class="column-customer-email">${customer.email || 'N/A'}</td>
            <td class="column-customer-phone">${customer.phone || 'N/A'}</td>
            <td class="column-customer-address">${customer.address || 'N/A'}</td>
            <td class="column-customer-account">${account ? account.username : 'N/A'}</td>
            <td class="column-customer-password">
                ${account ? '<span style="cursor: pointer;" onclick="showPassword(this, \'' + account.password + '\')">••••••••</span>' : 'N/A'}
            </td>
            <td class="column-customer-join">${customer.joinDate}</td>
            <td class="column-customer-actions">
                <button class="btn-edit" onclick="editCustomer('${customer.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteCustomer('${customer.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');
    
    document.getElementById('customerCount').textContent = customers.length;
}

// Hiển thị/ẩn mật khẩu
function showPassword(element, password) {
    if (element.textContent === '••••••••') {
        element.textContent = password;
        element.style.color = '#007bff';
    } else {
        element.textContent = '••••••••';
        element.style.color = '';
    }
}

// Hàm filter khách hàng
function filterCustomers() {
    const searchTerm = document.getElementById('customerSearch').value.toLowerCase();
    const sortBy = document.getElementById('customerSort').value;
    
    let customers = getCustomers();
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Filter
    customers = customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchTerm) || 
               (customer.email && customer.email.toLowerCase().includes(searchTerm)) ||
               (customer.phone && customer.phone.includes(searchTerm));
    });
    
    // Sort
    customers.sort((a, b) => {
        switch(sortBy) {
            case 'name-asc':
                return a.name.localeCompare(b.name, 'vi');
            case 'name-desc':
                return b.name.localeCompare(a.name, 'vi');
            case 'date-asc':
                return a.joinDate.localeCompare(b.joinDate);
            case 'date-desc':
                return b.joinDate.localeCompare(a.joinDate);
            default:
                return 0;
        }
    });
    
    // Render filtered customers
    const tbody = document.querySelector('#customerTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = customers.map(customer => {
        let account = null;
        if (customer.notes && customer.notes.includes('Tài khoản:')) {
            const username = customer.notes.replace('Tài khoản:', '').trim();
            account = accounts.find(acc => acc.username === username);
        }
        
        return `
        <tr data-customer-id="${customer.id}">
            <td class="column-customer-name">${customer.name}</td>
            <td class="column-customer-email">${customer.email || 'N/A'}</td>
            <td class="column-customer-phone">${customer.phone || 'N/A'}</td>
            <td class="column-customer-address">${customer.address || 'N/A'}</td>
            <td class="column-customer-account">${account ? account.username : 'N/A'}</td>
            <td class="column-customer-password">
                ${account ? '<span style="cursor: pointer;" onclick="showPassword(this, \'' + account.password + '\')">••••••••</span>' : 'N/A'}
            </td>
            <td class="column-customer-join">${customer.joinDate}</td>
            <td class="column-customer-actions">
                <button class="btn-edit" onclick="editCustomer('${customer.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteCustomer('${customer.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');
    
    document.getElementById('customerCount').textContent = customers.length;
}

// Hàm hủy form khách hàng
function cancelCustomerForm() {
    const customerForm = document.getElementById('customerForm');
    customerForm.style.display = 'none';
    customerForm.reset();
    isEditingCustomer = false;
    editingCustomerId = null;
}

// Hàm thêm khách hàng
function addCustomer() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const customerBirthDate = document.getElementById('customerBirthDate').value;
    const customerGender = document.getElementById('customerGender').value;
    const customerNotes = document.getElementById('customerNotes').value.trim();
    
    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    // Validate phone
    if (!/^[0-9]{10,11}$/.test(customerPhone)) {
        alert('Số điện thoại phải có 10-11 chữ số!');
        return;
    }
    
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        alert('Email không hợp lệ!');
        return;
    }
    
    const customers = getCustomers();
    
    // Kiểm tra email đã tồn tại
    if (customers.some(c => c.email === customerEmail)) {
        alert('Email đã tồn tại!');
        return;
    }
    
    const newCustomer = {
        id: Date.now(),
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
        birthDate: customerBirthDate,
        gender: customerGender,
        joinDate: new Date().toISOString().split('T')[0],
        notes: customerNotes
    };
    
    customers.push(newCustomer);
    saveCustomers(customers);
    
    alert('Đã thêm khách hàng: ' + customerName);
    renderCustomerTable();
    cancelCustomerForm();
}

// Hàm sửa khách hàng
function editCustomer(customerId) {
    isEditingCustomer = true;
    editingCustomerId = customerId;
    
    const customers = getCustomers();
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const customer = customers.find(c => c.id == customerId);
    
    if (!customer) {
        alert('Không tìm thấy khách hàng!');
        return;
    }
    
    // Tìm account tương ứng
    let account = null;
    if (customer.notes && customer.notes.includes('Tài khoản:')) {
        const username = customer.notes.replace('Tài khoản:', '').trim();
        account = accounts.find(acc => acc.username === username);
    }
    
    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerEmail').value = customer.email || '';
    document.getElementById('customerPhone').value = customer.phone || '';
    document.getElementById('customerAddress').value = customer.address || '';
    document.getElementById('customerAccount').value = account ? account.username : '';
    document.getElementById('customerPassword').value = account ? account.password : '';
    document.getElementById('customerBirthDate').value = customer.birthDate || '';
    document.getElementById('customerGender').value = customer.gender || '';
    document.getElementById('customerJoinDate').value = customer.joinDate;
    document.getElementById('customerNotes').value = customer.notes || '';
    
    const customerForm = document.getElementById('customerForm');
    document.getElementById('customerFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Khách Hàng';
    
    customerForm.style.display = 'block';
    customerForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hàm cập nhật khách hàng
function updateCustomer() {
    const customerName = document.getElementById('customerName').value.trim();
    const customerEmail = document.getElementById('customerEmail').value.trim();
    const customerPhone = document.getElementById('customerPhone').value.trim();
    const customerAddress = document.getElementById('customerAddress').value.trim();
    const customerBirthDate = document.getElementById('customerBirthDate').value;
    const customerGender = document.getElementById('customerGender').value;
    const customerNotes = document.getElementById('customerNotes').value.trim();
    
    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    // Validate phone
    if (!/^[0-9]{10,11}$/.test(customerPhone)) {
        alert('Số điện thoại phải có 10-11 chữ số!');
        return;
    }
    
    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        alert('Email không hợp lệ!');
        return;
    }
    
    const customers = getCustomers();
    const index = customers.findIndex(c => c.id == editingCustomerId);
    
    if (index === -1) {
        alert('Không tìm thấy khách hàng!');
        return;
    }
    
    // Kiểm tra email trùng với khách hàng khác
    const emailExists = customers.some(c => c.id != editingCustomerId && c.email === customerEmail);
    if (emailExists) {
        alert('Email đã được sử dụng bởi khách hàng khác!');
        return;
    }
    
    customers[index] = {
        ...customers[index],
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
        birthDate: customerBirthDate,
        gender: customerGender,
        notes: customerNotes
    };
    
    saveCustomers(customers);
    
    // Đồng bộ với account nếu có
    if (customerNotes && customerNotes.includes('Tài khoản:')) {
        const username = customerNotes.replace('Tài khoản:', '').trim();
        const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        const accountIndex = accounts.findIndex(acc => acc.username === username);
        
        if (accountIndex !== -1) {
            accounts[accountIndex].displayName = customerName;
            accounts[accountIndex].email = customerEmail;
            accounts[accountIndex].phone = customerPhone;
            accounts[accountIndex].address = customerAddress;
            localStorage.setItem('accounts', JSON.stringify(accounts));
        }
    }
    
    alert('Đã cập nhật khách hàng: ' + customerName);
    renderCustomerTable();
    cancelCustomerForm();
}

// Hàm xóa khách hàng
function deleteCustomer(customerId) {
    const customers = getCustomers();
    const customer = customers.find(c => c.id === customerId);
    
    if (!customer) {
        alert('Không tìm thấy khách hàng!');
        return;
    }
    
    if (confirm('Bạn có chắc chắn muốn xóa khách hàng: ' + customer.name + '?')) {
        const newCustomers = customers.filter(c => c.id !== customerId);
        saveCustomers(newCustomers);
        
        alert('Đã xóa khách hàng: ' + customer.name);
        renderCustomerTable();
    }
}

// ===== QUẢN LÝ ĐỜN HÀNG BÁN =====
let isEditingSalesOrder = false;
let editingSalesOrderId = null;

// Khởi tạo dữ liệu đơn hàng bán mặc định
function initializeSalesOrders() {
    const existingOrders = localStorage.getItem('salesOrders');
    if (!existingOrders) {
        const defaultOrders = [
            {id: 'DH001', customerId: 'KH001', customerName: 'Nguyễn Văn A', productId: 'P001', productName: 'Quạt trần thông minh', quantity: 2, price: 3500000, total: 7000000, date: '2024-11-25', status: 'completed', notes: 'Giao hàng thành công'},
            {id: 'DH002', customerId: 'KH002', customerName: 'Trần Thị B', productId: 'P005', productName: 'Quạt đứng', quantity: 1, price: 1200000, total: 1200000, date: '2024-11-28', status: 'shipping', notes: 'Đang giao hàng'},
            {id: 'DH003', customerId: 'KH003', customerName: 'Lê Minh C', productId: 'P003', productName: 'Quạt bàn', quantity: 3, price: 500000, total: 1500000, date: '2024-12-01', status: 'processing', notes: ''}
        ];
        localStorage.setItem('salesOrders', JSON.stringify(defaultOrders));
    }
}

// Lấy danh sách đơn hàng bán
function getSalesOrders() {
    return JSON.parse(localStorage.getItem('salesOrders')) || [];
}

// Lưu đơn hàng bán
function saveSalesOrders(orders) {
    localStorage.setItem('salesOrders', JSON.stringify(orders));
    window.dispatchEvent(new Event('salesOrdersUpdated'));
}

// Load khách hàng và sản phẩm vào select
function loadSalesOrderOptions() {
    const customers = getCustomers();
    const products = getProducts();
    
    const customerSelect = document.getElementById('salesOrderCustomer');
    const productSelect = document.getElementById('salesOrderProduct');
    
    if (customerSelect) {
        customerSelect.innerHTML = '<option value="">-- Chọn khách hàng --</option>' +
            customers.map(c => `<option value="${c.id}" data-name="${c.name}">${c.name} - ${c.phone}</option>`).join('');
    }
    
    if (productSelect) {
        productSelect.innerHTML = '<option value="">-- Chọn sản phẩm --</option>' +
            products.map(p => `<option value="${p.id}" data-name="${p.name}" data-price="${p.price}">${p.name} - ${p.price.toLocaleString('vi-VN')}đ</option>`).join('');
    }
}

// Render bảng đơn hàng bán
function renderSalesOrderTable() {
    const orders = getSalesOrders();
    const tbody = document.querySelector('#salesOrderTable tbody');
    
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 30px;">Chưa có đơn hàng nào</td></tr>';
        document.getElementById('salesOrderCount').textContent = '0';
        return;
    }
    
    const statusMap = {
        'pending': '<span class="badge badge-warning">Chờ xử lý</span>',
        'processing': '<span class="badge badge-info">Đang xử lý</span>',
        'shipping': '<span class="badge badge-primary">Đang giao</span>',
        'completed': '<span class="badge badge-success">Hoàn thành</span>',
        'cancelled': '<span class="badge badge-danger">Đã hủy</span>'
    };
    
    tbody.innerHTML = orders.map(order => {
        // Bảng DonHang - chỉ hiển thị: id, idKhachHang (customerName), ngayDatHang, tongTien, trangThai, ghiChu
        const totalAmount = order.totalAmount || order.total || 0;
        const orderDate = order.orderDate || order.date || '';
        const notes = order.notes || '';
        
        return `
        <tr data-order-id="${order.id}">
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${orderDate}</td>
            <td>${totalAmount.toLocaleString('vi-VN')}đ</td>
            <td>${statusMap[order.status]}</td>
            <td>${notes || '-'}</td>
            <td>
                <button class="btn-view" onclick="viewSalesOrderDetail('${order.id}')" title="Xem chi tiết">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn-edit" onclick="editSalesOrder('${order.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteSalesOrder('${order.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');
    
    document.getElementById('salesOrderCount').textContent = orders.length;
}

// Xem chi tiết đơn hàng - Hiển thị trong modal
function viewSalesOrderDetail(orderId) {
    const orders = getSalesOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }
    
    // Render Chi Tiết Đơn Hàng (bảng ChiTietDonHang)
    let chiTietHTML = '';
    if (order.products && Array.isArray(order.products)) {
        chiTietHTML = order.products.map((p, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${p.productName}</td>
                <td>${p.quantity}</td>
                <td>${p.price.toLocaleString('vi-VN')}đ</td>
                <td style="font-weight: 600;">${p.total.toLocaleString('vi-VN')}đ</td>
            </tr>
        `).join('');
    } else {
        // Format cũ
        chiTietHTML = `
            <tr>
                <td>1</td>
                <td>${order.productName || 'N/A'}</td>
                <td>${order.quantity || 0}</td>
                <td>${order.price ? order.price.toLocaleString('vi-VN') : 'N/A'}đ</td>
                <td style="font-weight: 600;">${order.total ? order.total.toLocaleString('vi-VN') : 'N/A'}đ</td>
            </tr>
        `;
    }
    
    const subtotal = order.subtotal || order.total || 0;
    const shippingFee = order.shippingFee || 0;
    const discount = order.discount || 0;
    const totalAmount = order.totalAmount || order.total || 0;
    
    const statusText = {
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'shipping': 'Đang giao',
        'completed': 'Hoàn thành',
        'cancelled': 'Đã hủy'
    };
    
    const statusBadge = {
        'pending': '<span class="badge badge-warning">Chờ xử lý</span>',
        'processing': '<span class="badge badge-info">Đang xử lý</span>',
        'shipping': '<span class="badge badge-primary">Đang giao</span>',
        'completed': '<span class="badge badge-success">Hoàn thành</span>',
        'cancelled': '<span class="badge badge-danger">Đã hủy</span>'
    };
    
    const modalContent = `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 15px 0; color: #2c3e50;">
                <i class="fa-solid fa-receipt"></i> Thông Tin Đơn Hàng
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div>
                    <strong>Mã đơn hàng:</strong><br>
                    <span style="color: #007bff; font-size: 1.1em;">${order.id}</span>
                </div>
                <div>
                    <strong>Ngày đặt hàng:</strong><br>
                    ${order.orderDate || order.date || 'N/A'}
                </div>
                <div>
                    <strong>Trạng thái:</strong><br>
                    ${statusBadge[order.status]}
                </div>
                <div>
                    <strong>Phương thức thanh toán:</strong><br>
                    ${order.paymentMethod || 'N/A'}
                </div>
            </div>
        </div>

        <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
            <h3 style="margin: 0 0 15px 0; color: #856404;">
                <i class="fa-solid fa-user"></i> Thông Tin Khách Hàng
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                <div>
                    <strong>Họ và tên:</strong><br>
                    ${order.customerName}
                </div>
                <div>
                    <strong>Số điện thoại:</strong><br>
                    ${order.customerPhone || 'N/A'}
                </div>
                <div style="grid-column: 1 / -1;">
                    <strong>Địa chỉ giao hàng:</strong><br>
                    ${order.customerAddress || 'N/A'}
                </div>
            </div>
        </div>

        <div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #17a2b8;">
            <h3 style="margin: 0 0 15px 0; color: #0c5460;">
                <i class="fa-solid fa-box-open"></i> Chi Tiết Sản Phẩm
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: #17a2b8; color: white;">
                        <th style="padding: 10px; text-align: left;">STT</th>
                        <th style="padding: 10px; text-align: left;">Tên sản phẩm</th>
                        <th style="padding: 10px; text-align: center;">Số lượng</th>
                        <th style="padding: 10px; text-align: right;">Đơn giá</th>
                        <th style="padding: 10px; text-align: right;">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    ${chiTietHTML}
                </tbody>
            </table>
        </div>

        <div style="background: #d4edda; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
            <h3 style="margin: 0 0 15px 0; color: #155724;">
                <i class="fa-solid fa-calculator"></i> Tổng Kết Thanh Toán
            </h3>
            <table style="width: 100%; font-size: 1.05em;">
                <tr>
                    <td style="padding: 8px 0;"><strong>Tạm tính:</strong></td>
                    <td style="text-align: right; padding: 8px 0;">${subtotal.toLocaleString('vi-VN')}đ</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0;"><strong>Phí vận chuyển:</strong></td>
                    <td style="text-align: right; padding: 8px 0;">${shippingFee === 0 ? '<span style="color: #28a745;">Miễn phí</span>' : shippingFee.toLocaleString('vi-VN') + 'đ'}</td>
                </tr>
                ${discount > 0 ? `
                <tr>
                    <td style="padding: 8px 0;"><strong>Giảm giá:</strong></td>
                    <td style="text-align: right; padding: 8px 0; color: #dc3545;">-${discount.toLocaleString('vi-VN')}đ</td>
                </tr>
                ` : ''}
                <tr style="border-top: 2px solid #28a745; font-size: 1.2em; font-weight: 700; color: #28a745;">
                    <td style="padding: 12px 0;"><strong>TỔNG CỘNG:</strong></td>
                    <td style="text-align: right; padding: 12px 0;">${totalAmount.toLocaleString('vi-VN')}đ</td>
                </tr>
            </table>
        </div>

        ${order.notes ? `
        <div style="background: #f8d7da; padding: 15px; border-radius: 8px; border-left: 4px solid #dc3545; margin-top: 20px;">
            <strong style="color: #721c24;"><i class="fa-solid fa-sticky-note"></i> Ghi chú:</strong><br>
            <span style="color: #721c24;">${order.notes}</span>
        </div>
        ` : ''}
    `;
    
    document.getElementById('orderDetailContent').innerHTML = modalContent;
    document.getElementById('orderDetailModal').style.display = 'flex';
}

// Đóng modal chi tiết đơn hàng
function closeOrderDetailModal() {
    document.getElementById('orderDetailModal').style.display = 'none';
}

// Filter đơn hàng bán
function filterSalesOrders() {
    const searchTerm = document.getElementById('salesOrderSearch').value.toLowerCase();
    const statusFilter = document.getElementById('salesOrderStatusFilter').value;
    const sortBy = document.getElementById('salesOrderSort').value;
    
    let orders = getSalesOrders();
    
    orders = orders.filter(order => {
        let productMatch = false;
        if (order.products && Array.isArray(order.products)) {
            productMatch = order.products.some(p => p.productName.toLowerCase().includes(searchTerm));
        } else if (order.productName) {
            productMatch = order.productName.toLowerCase().includes(searchTerm);
        }
        
        const matchesSearch = order.id.toLowerCase().includes(searchTerm) || 
                            order.customerName.toLowerCase().includes(searchTerm) ||
                            productMatch;
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    
    orders.sort((a, b) => {
        switch(sortBy) {
            case 'date-asc': 
                return (a.orderDate || a.date).localeCompare(b.orderDate || b.date);
            case 'date-desc': 
                return (b.orderDate || b.date).localeCompare(a.orderDate || a.date);
            case 'total-asc': 
                return (a.totalAmount || a.total) - (b.totalAmount || b.total);
            case 'total-desc': 
                return (b.totalAmount || b.total) - (a.totalAmount || a.total);
            default: return 0;
        }
    });
    
    const tbody = document.querySelector('#salesOrderTable tbody');
    if (!tbody) return;
    
    const statusMap = {
        'pending': '<span class="badge badge-warning">Chờ xử lý</span>',
        'processing': '<span class="badge badge-info">Đang xử lý</span>',
        'shipping': '<span class="badge badge-primary">Đang giao</span>',
        'completed': '<span class="badge badge-success">Hoàn thành</span>',
        'cancelled': '<span class="badge badge-danger">Đã hủy</span>'
    };
    
    tbody.innerHTML = orders.map(order => {
        // Bảng DonHang - chỉ hiển thị: id, idKhachHang, ngayDatHang, tongTien, trangThai, ghiChu
        const totalAmount = order.totalAmount || order.total || 0;
        const orderDate = order.orderDate || order.date || '';
        const notes = order.notes || '';
        
        return `
        <tr data-order-id="${order.id}">
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${orderDate}</td>
            <td>${totalAmount.toLocaleString('vi-VN')}đ</td>
            <td>${statusMap[order.status]}</td>
            <td>${notes || '-'}</td>
            <td>
                <button class="btn-view" onclick="viewSalesOrderDetail('${order.id}')" title="Xem chi tiết">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button class="btn-edit" onclick="editSalesOrder('${order.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteSalesOrder('${order.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }).map(order => `
        <tr data-order-id="${order.id}">
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>${order.total.toLocaleString('vi-VN')}đ</td>
            <td>${order.date}</td>
            <td>${statusMap[order.status]}</td>
            <td>
                <button class="btn-edit" onclick="editSalesOrder('${order.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteSalesOrder('${order.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('salesOrderCount').textContent = orders.length;
}

// Hủy form đơn hàng bán
function cancelSalesOrderForm() {
    const form = document.getElementById('salesOrderForm');
    form.style.display = 'none';
    form.reset();
    document.getElementById('salesOrderID').readOnly = false;
    isEditingSalesOrder = false;
    editingSalesOrderId = null;
    
    // Reset field visibility for add mode
    document.getElementById('salesOrderAddFields').style.display = '';
    document.getElementById('salesOrderProductFields').style.display = '';
    document.getElementById('salesOrderPriceFields').style.display = '';
    document.getElementById('salesOrderDateFields').style.display = '';
    document.getElementById('salesOrderEditIDField').style.display = 'none';
    
    // Restore required attributes for add mode
    document.getElementById('salesOrderID').setAttribute('required', 'required');
    document.getElementById('salesOrderCustomer').setAttribute('required', 'required');
    document.getElementById('salesOrderProduct').setAttribute('required', 'required');
    document.getElementById('salesOrderQuantity').setAttribute('required', 'required');
    document.getElementById('salesOrderPrice').setAttribute('required', 'required');
    document.getElementById('salesOrderDate').setAttribute('required', 'required');
}

// Tính tổng tiền đơn hàng bán
function calculateSalesOrderTotal() {
    const quantity = parseInt(document.getElementById('salesOrderQuantity').value) || 0;
    const price = parseInt(document.getElementById('salesOrderPrice').value) || 0;
    const total = quantity * price;
    document.getElementById('salesOrderTotal').value = total.toLocaleString('vi-VN') + 'đ';
    return total;
}

// Thêm đơn hàng bán
function addSalesOrder() {
    const orderId = document.getElementById('salesOrderID').value.trim();
    const customerId = document.getElementById('salesOrderCustomer').value;
    const customerName = document.getElementById('salesOrderCustomer').selectedOptions[0]?.dataset.name || '';
    const productId = document.getElementById('salesOrderProduct').value;
    const productName = document.getElementById('salesOrderProduct').selectedOptions[0]?.dataset.name || '';
    const quantity = parseInt(document.getElementById('salesOrderQuantity').value);
    const price = parseInt(document.getElementById('salesOrderPrice').value);
    const total = calculateSalesOrderTotal();
    const date = document.getElementById('salesOrderDate').value;
    const status = document.getElementById('salesOrderStatus').value;
    const notes = document.getElementById('salesOrderNotes').value.trim();
    
    if (!orderId || !customerId || !productId || !quantity || !date) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    const orders = getSalesOrders();
    
    if (orders.some(o => o.id === orderId)) {
        alert('Mã đơn hàng đã tồn tại!');
        return;
    }
    
    const newOrder = {
        id: orderId,
        customerId,
        customerName,
        productId,
        productName,
        quantity,
        price,
        total,
        date,
        status,
        notes
    };
    
    orders.push(newOrder);
    saveSalesOrders(orders);
    
    alert('Đã thêm đơn hàng: ' + orderId);
    renderSalesOrderTable();
    cancelSalesOrderForm();
}

// Sửa đơn hàng bán
function editSalesOrder(orderId) {
    isEditingSalesOrder = true;
    editingSalesOrderId = orderId;
    
    const orders = getSalesOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }
    
    // Hide add-mode fields, show edit-mode fields
    document.getElementById('salesOrderAddFields').style.display = 'none';
    document.getElementById('salesOrderProductFields').style.display = 'none';
    document.getElementById('salesOrderPriceFields').style.display = 'none';
    document.getElementById('salesOrderDateFields').style.display = 'none';
    document.getElementById('salesOrderEditIDField').style.display = 'block';
    
    // Remove required attributes from hidden fields
    document.getElementById('salesOrderID').removeAttribute('required');
    document.getElementById('salesOrderCustomer').removeAttribute('required');
    document.getElementById('salesOrderProduct').removeAttribute('required');
    document.getElementById('salesOrderQuantity').removeAttribute('required');
    document.getElementById('salesOrderPrice').removeAttribute('required');
    document.getElementById('salesOrderDate').removeAttribute('required');
    
    // Only populate editable fields
    document.getElementById('salesOrderEditID').value = order.id;
    document.getElementById('salesOrderStatus').value = order.status || 'pending';
    document.getElementById('salesOrderNotes').value = order.notes || '';
    
    // Keep original ID in hidden field for reference
    document.getElementById('salesOrderID').value = order.id;
    
    const form = document.getElementById('salesOrderForm');
    document.getElementById('salesOrderFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Đơn Hàng';
    
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Cập nhật đơn hàng bán
function updateSalesOrder() {
    const orderId = editingSalesOrderId || document.getElementById('salesOrderID').value.trim();
    const status = document.getElementById('salesOrderStatus').value;
    const notes = document.getElementById('salesOrderNotes').value.trim();
    
    if (!orderId) {
        alert('Không tìm thấy mã đơn hàng!');
        return;
    }
    
    const orders = getSalesOrders();
    const index = orders.findIndex(o => o.id === orderId);
    
    if (index === -1) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }
    
    // Only update status and notes, keep all other fields unchanged
    orders[index] = {
        ...orders[index],
        status,
        notes
    };
    
    saveSalesOrders(orders);
    
    alert('Đã cập nhật đơn hàng: ' + orderId);
    renderSalesOrderTable();
    cancelSalesOrderForm();
}

// Xóa đơn hàng bán
function deleteSalesOrder(orderId) {
    const orders = getSalesOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }
    
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng: ' + orderId + '?')) {
        const newOrders = orders.filter(o => o.id !== orderId);
        saveSalesOrders(newOrders);
        
        alert('Đã xóa đơn hàng: ' + orderId);
        renderSalesOrderTable();
    }
}

// ===== QUẢN LÝ ĐƠN HÀNG NHẬP =====
let isEditingPurchaseOrder = false;
let editingPurchaseOrderId = null;

// Khởi tạo dữ liệu đơn hàng nhập mặc định
function initializePurchaseOrders() {
    const existingOrders = localStorage.getItem('purchaseOrders');
    if (!existingOrders) {
        const defaultOrders = [
            {id: 'DN001', supplier: 'Công ty TNHH Điện tử ABC', productId: 'P001', productName: 'Quạt trần thông minh', quantity: 50, price: 2500000, total: 125000000, date: '2024-11-20', status: 'completed', notes: 'Đã nhận hàng đầy đủ'},
            {id: 'DN002', supplier: 'Nhà máy Quạt Việt Nam', productId: 'P005', productName: 'Quạt đứng', quantity: 30, price: 800000, total: 24000000, date: '2024-11-25', status: 'approved', notes: 'Chờ giao hàng'}
        ];
        localStorage.setItem('purchaseOrders', JSON.stringify(defaultOrders));
    }
}

// Lấy danh sách đơn hàng nhập
function getPurchaseOrders() {
    return JSON.parse(localStorage.getItem('purchaseOrders')) || [];
}

// Lưu đơn hàng nhập
function savePurchaseOrders(orders) {
    localStorage.setItem('purchaseOrders', JSON.stringify(orders));
    window.dispatchEvent(new Event('purchaseOrdersUpdated'));
}

// Load sản phẩm vào select
function loadPurchaseOrderOptions() {
    const products = getProducts();
    
    const productSelect = document.getElementById('purchaseOrderProduct');
    
    if (productSelect) {
        productSelect.innerHTML = '<option value="">-- Chọn sản phẩm --</option>' +
            products.map(p => `<option value="${p.id}" data-name="${p.name}">${p.name}</option>`).join('');
    }
}

// Render bảng đơn hàng nhập
function renderPurchaseOrderTable() {
    const orders = getPurchaseOrders();
    const tbody = document.querySelector('#purchaseOrderTable tbody');
    
    if (!tbody) return;
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 30px;">Chưa có đơn nhập nào</td></tr>';
        document.getElementById('purchaseOrderCount').textContent = '0';
        return;
    }
    
    const statusMap = {
        'pending': '<span class="badge badge-warning">Chờ duyệt</span>',
        'approved': '<span class="badge badge-info">Đã duyệt</span>',
        'receiving': '<span class="badge badge-primary">Đang nhận</span>',
        'completed': '<span class="badge badge-success">Hoàn thành</span>',
        'cancelled': '<span class="badge badge-danger">Đã hủy</span>'
    };
    
    tbody.innerHTML = orders.map(order => `
        <tr data-order-id="${order.id}">
            <td>${order.id}</td>
            <td>${order.supplier}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>${order.total.toLocaleString('vi-VN')}đ</td>
            <td>${order.date}</td>
            <td>${statusMap[order.status]}</td>
            <td>
                <button class="btn-edit" onclick="editPurchaseOrder('${order.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deletePurchaseOrder('${order.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('purchaseOrderCount').textContent = orders.length;
}

// Filter đơn hàng nhập
function filterPurchaseOrders() {
    const searchTerm = document.getElementById('purchaseOrderSearch').value.toLowerCase();
    const statusFilter = document.getElementById('purchaseOrderStatusFilter').value;
    const sortBy = document.getElementById('purchaseOrderSort').value;
    
    let orders = getPurchaseOrders();
    
    orders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm) || 
                            order.supplier.toLowerCase().includes(searchTerm) ||
                            order.productName.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    
    orders.sort((a, b) => {
        switch(sortBy) {
            case 'date-asc': return a.date.localeCompare(b.date);
            case 'date-desc': return b.date.localeCompare(a.date);
            case 'total-asc': return a.total - b.total;
            case 'total-desc': return b.total - a.total;
            default: return 0;
        }
    });
    
    const tbody = document.querySelector('#purchaseOrderTable tbody');
    if (!tbody) return;
    
    const statusMap = {
        'pending': '<span class="badge badge-warning">Chờ duyệt</span>',
        'approved': '<span class="badge badge-info">Đã duyệt</span>',
        'receiving': '<span class="badge badge-primary">Đang nhận</span>',
        'completed': '<span class="badge badge-success">Hoàn thành</span>',
        'cancelled': '<span class="badge badge-danger">Đã hủy</span>'
    };
    
    tbody.innerHTML = orders.map(order => `
        <tr data-order-id="${order.id}">
            <td>${order.id}</td>
            <td>${order.supplier}</td>
            <td>${order.productName}</td>
            <td>${order.quantity}</td>
            <td>${order.total.toLocaleString('vi-VN')}đ</td>
            <td>${order.date}</td>
            <td>${statusMap[order.status]}</td>
            <td>
                <button class="btn-edit" onclick="editPurchaseOrder('${order.id}')" title="Chỉnh sửa">
                    <i class="fa-solid fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deletePurchaseOrder('${order.id}')" title="Xóa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    document.getElementById('purchaseOrderCount').textContent = orders.length;
}

// Hủy form đơn hàng nhập
function cancelPurchaseOrderForm() {
    const form = document.getElementById('purchaseOrderForm');
    form.style.display = 'none';
    form.reset();
    document.getElementById('purchaseOrderID').readOnly = false;
    isEditingPurchaseOrder = false;
    editingPurchaseOrderId = null;
}

// Tính tổng tiền đơn hàng nhập
function calculatePurchaseOrderTotal() {
    const quantity = parseInt(document.getElementById('purchaseOrderQuantity').value) || 0;
    const price = parseInt(document.getElementById('purchaseOrderPrice').value) || 0;
    const total = quantity * price;
    document.getElementById('purchaseOrderTotal').value = total.toLocaleString('vi-VN') + 'đ';
    return total;
}

// Thêm đơn hàng nhập
function addPurchaseOrder() {
    const orderId = document.getElementById('purchaseOrderID').value.trim();
    const supplier = document.getElementById('purchaseOrderSupplier').value.trim();
    const productId = document.getElementById('purchaseOrderProduct').value;
    const productName = document.getElementById('purchaseOrderProduct').selectedOptions[0]?.dataset.name || '';
    const quantity = parseInt(document.getElementById('purchaseOrderQuantity').value);
    const price = parseInt(document.getElementById('purchaseOrderPrice').value);
    const total = calculatePurchaseOrderTotal();
    const date = document.getElementById('purchaseOrderDate').value;
    const status = document.getElementById('purchaseOrderStatus').value;
    const notes = document.getElementById('purchaseOrderNotes').value.trim();
    
    if (!orderId || !supplier || !productId || !quantity || !price || !date) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    const orders = getPurchaseOrders();
    
    if (orders.some(o => o.id === orderId)) {
        alert('Mã đơn nhập đã tồn tại!');
        return;
    }
    
    const newOrder = {
        id: orderId,
        supplier,
        productId,
        productName,
        quantity,
        price,
        total,
        date,
        status,
        notes
    };
    
    orders.push(newOrder);
    savePurchaseOrders(orders);
    
    alert('Đã thêm đơn nhập: ' + orderId);
    renderPurchaseOrderTable();
    cancelPurchaseOrderForm();
}

// Sửa đơn hàng nhập
function editPurchaseOrder(orderId) {
    isEditingPurchaseOrder = true;
    editingPurchaseOrderId = orderId;
    
    const orders = getPurchaseOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Không tìm thấy đơn nhập!');
        return;
    }
    
    document.getElementById('purchaseOrderID').value = order.id;
    document.getElementById('purchaseOrderID').readOnly = true;
    document.getElementById('purchaseOrderSupplier').value = order.supplier;
    document.getElementById('purchaseOrderProduct').value = order.productId;
    document.getElementById('purchaseOrderQuantity').value = order.quantity;
    document.getElementById('purchaseOrderPrice').value = order.price;
    document.getElementById('purchaseOrderTotal').value = order.total.toLocaleString('vi-VN') + 'đ';
    document.getElementById('purchaseOrderDate').value = order.date;
    document.getElementById('purchaseOrderStatus').value = order.status;
    document.getElementById('purchaseOrderNotes').value = order.notes || '';
    
    const form = document.getElementById('purchaseOrderForm');
    document.getElementById('purchaseOrderFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Đơn Nhập';
    
    form.style.display = 'block';
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Cập nhật đơn hàng nhập
function updatePurchaseOrder() {
    const orderId = document.getElementById('purchaseOrderID').value.trim();
    const supplier = document.getElementById('purchaseOrderSupplier').value.trim();
    const productId = document.getElementById('purchaseOrderProduct').value;
    const productName = document.getElementById('purchaseOrderProduct').selectedOptions[0]?.dataset.name || '';
    const quantity = parseInt(document.getElementById('purchaseOrderQuantity').value);
    const price = parseInt(document.getElementById('purchaseOrderPrice').value);
    const total = calculatePurchaseOrderTotal();
    const date = document.getElementById('purchaseOrderDate').value;
    const status = document.getElementById('purchaseOrderStatus').value;
    const notes = document.getElementById('purchaseOrderNotes').value.trim();
    
    if (!supplier || !productId || !quantity || !price || !date) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
        return;
    }
    
    const orders = getPurchaseOrders();
    const index = orders.findIndex(o => o.id === orderId);
    
    if (index === -1) {
        alert('Không tìm thấy đơn nhập!');
        return;
    }
    
    orders[index] = {
        ...orders[index],
        supplier,
        productId,
        productName,
        quantity,
        price,
        total,
        date,
        status,
        notes
    };
    
    savePurchaseOrders(orders);
    
    alert('Đã cập nhật đơn nhập: ' + orderId);
    renderPurchaseOrderTable();
    cancelPurchaseOrderForm();
}

// Xóa đơn hàng nhập
function deletePurchaseOrder(orderId) {
    const orders = getPurchaseOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (!order) {
        alert('Không tìm thấy đơn nhập!');
        return;
    }
    
    if (confirm('Bạn có chắc chắn muốn xóa đơn nhập: ' + orderId + '?')) {
        const newOrders = orders.filter(o => o.id !== orderId);
        savePurchaseOrders(newOrders);
        
        alert('Đã xóa đơn nhập: ' + orderId);
        renderPurchaseOrderTable();
    }
}

// ===== QUẢN LÝ NHÀ CUNG CẤP =====
let isEditingSupplier = false;
let editingSupplierIndex = null;

// Hàm filter nhà cung cấp
function filterSuppliers() {
    const searchTerm = document.getElementById('supplierSearch').value.toLowerCase();
    const statusFilter = document.getElementById('supplierStatusFilter').value;
    const sortBy = document.getElementById('supplierSort').value;
    
    const tbody = document.getElementById('supplierTableBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    let visibleCount = 0;
    
    // Filter rows
    rows.forEach(row => {
        const supplierCode = row.children[0].textContent.toLowerCase();
        const supplierName = row.children[1].textContent.toLowerCase();
        const supplierStatus = row.children[5].querySelector('.badge').classList.contains('badge-success') ? 'active' : 'inactive';
        
        const matchesSearch = supplierCode.includes(searchTerm) || supplierName.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || supplierStatus === statusFilter;
        
        if (matchesSearch && matchesStatus) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Sort visible rows
    const visibleRows = rows.filter(row => row.style.display !== 'none');
    visibleRows.sort((a, b) => {
        const codeA = a.children[0].textContent;
        const codeB = b.children[0].textContent;
        const nameA = a.children[1].textContent;
        const nameB = b.children[1].textContent;
        
        switch(sortBy) {
            case 'code-asc':
                return codeA.localeCompare(codeB);
            case 'code-desc':
                return codeB.localeCompare(codeA);
            case 'name-asc':
                return nameA.localeCompare(nameB);
            case 'name-desc':
                return nameB.localeCompare(nameA);
            default:
                return 0;
        }
    });
    
    // Re-append sorted rows
    visibleRows.forEach(row => tbody.appendChild(row));
    
    // Update count
    document.getElementById('supplierCount').textContent = visibleCount;
}

// Hàm hủy form nhà cung cấp
function cancelSupplierForm() {
    const supplierForm = document.getElementById('supplierForm');
    supplierForm.style.display = 'none';
    supplierForm.reset();
    isEditingSupplier = false;
    editingSupplierIndex = null;
}

// Hàm thêm nhà cung cấp
function addSupplier() {
    const supplierCode = document.getElementById('supplierCode').value;
    const supplierName = document.getElementById('supplierName').value;
    const supplierPhone = document.getElementById('supplierPhone').value;
    const supplierEmail = document.getElementById('supplierEmail').value;
    const supplierAddress = document.getElementById('supplierAddress').value;
    const supplierContact = document.getElementById('supplierContact').value;
    const supplierTaxCode = document.getElementById('supplierTaxCode').value;
    const supplierStatus = document.getElementById('supplierStatus').value;
    
    // Hiển thị thông báo thành công
    alert('Đã thêm nhà cung cấp: ' + supplierName);
    
    // Cập nhật dropdown trong form sản phẩm
    updateSupplierDropdown();
    
    // Reset form và ẩn
    cancelSupplierForm();
}

// Hàm sửa nhà cung cấp
function editSupplier(index) {
    isEditingSupplier = true;
    editingSupplierIndex = index;
    
    const supplierForm = document.getElementById('supplierForm');
    const tbody = document.getElementById('supplierTableBody');
    const row = tbody.querySelector(`tr[data-index="${index}"]`);
    
    if (!row) return;
    
    // Lấy dữ liệu từ hàng
    const code = row.children[0].textContent;
    const name = row.children[1].textContent;
    const phone = row.children[2].textContent;
    const email = row.children[3].textContent;
    const contact = row.children[4].textContent;
    const statusBadge = row.children[5].querySelector('.badge');
    const status = statusBadge.classList.contains('badge-success') ? 'active' : 'inactive';
    
    // Điền dữ liệu vào form
    document.getElementById('supplierCode').value = code;
    document.getElementById('supplierName').value = name;
    document.getElementById('supplierPhone').value = phone;
    document.getElementById('supplierEmail').value = email;
    document.getElementById('supplierContact').value = contact;
    document.getElementById('supplierStatus').value = status;
    
    document.getElementById('supplierFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Nhà Cung Cấp';
    
    // Hiển thị form
    supplierForm.style.display = 'block';
    
    // Scroll to form
    supplierForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hàm cập nhật nhà cung cấp
function updateSupplier() {
    const supplierCode = document.getElementById('supplierCode').value;
    const supplierName = document.getElementById('supplierName').value;
    
    alert('Đã cập nhật nhà cung cấp: ' + supplierName);
    
    // Cập nhật dropdown trong form sản phẩm
    updateSupplierDropdown();
    
    cancelSupplierForm();
}

// Hàm xóa nhà cung cấp
function deleteSupplier(index) {
    const tbody = document.getElementById('supplierTableBody');
    const row = tbody.querySelector(`tr[data-index="${index}"]`);
    
    if (!row) return;
    
    const supplierName = row.children[1].textContent;
    
    if (confirm('Bạn có chắc chắn muốn xóa nhà cung cấp: ' + supplierName + '?')) {
        alert('Đã xóa nhà cung cấp: ' + supplierName);
        // Trong thực tế, code xóa hàng sẽ được thực hiện ở đây
        // row.remove();
        
        // Cập nhật dropdown trong form sản phẩm
        updateSupplierDropdown();
        
        // Cập nhật số lượng
        filterSuppliers();
    }
}

// Hàm cập nhật dropdown nhà cung cấp trong form sản phẩm
function updateSupplierDropdown() {
    const supplierDropdown = document.getElementById('productSupplier');
    if (!supplierDropdown) return;
    
    const tbody = document.getElementById('supplierTableBody');
    const rows = tbody.querySelectorAll('tr');
    
    // Xóa các option cũ (giữ lại option đầu tiên)
    supplierDropdown.innerHTML = '<option value="">-- Chọn nhà cung cấp --</option>';
    
    // Thêm các option mới từ bảng nhà cung cấp
    rows.forEach(row => {
        const statusBadge = row.children[5].querySelector('.badge');
        const isActive = statusBadge.classList.contains('badge-success');
        
        // Chỉ thêm nhà cung cấp đang hoạt động
        if (isActive) {
            const code = row.children[0].textContent;
            const name = row.children[1].textContent;
            const option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            supplierDropdown.appendChild(option);
        }
    });
}

// ===== QUẢN LÝ NHÂN VIÊN =====
let isEditingEmployee = false;
let editingEmployeeIndex = null;

// Hàm filter nhân viên
function filterEmployees() {
    const searchTerm = document.getElementById('employeeSearch').value.toLowerCase();
    const positionFilter = document.getElementById('employeePositionFilter').value;
    const statusFilter = document.getElementById('employeeStatusFilter').value;
    const sortBy = document.getElementById('employeeSort').value;
    
    const tbody = document.getElementById('employeeTableBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    let visibleCount = 0;
    
    // Filter rows
    rows.forEach(row => {
        const employeeName = row.children[0].textContent.toLowerCase();
        const employeePhone = row.children[3].textContent.toLowerCase();
        const employeePosition = row.children[4].querySelector('.badge').textContent;
        const employeeStatus = row.children[7].querySelector('.badge').classList.contains('badge-success') ? 'active' : 'inactive';
        
        const matchesSearch = employeeName.includes(searchTerm) || employeePhone.includes(searchTerm);
        const matchesPosition = positionFilter === 'all' || employeePosition === positionFilter;
        const matchesStatus = statusFilter === 'all' || employeeStatus === statusFilter;
        
        if (matchesSearch && matchesPosition && matchesStatus) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    // Sort visible rows
    const visibleRows = rows.filter(row => row.style.display !== 'none');
    visibleRows.sort((a, b) => {
        const nameA = a.children[0].textContent;
        const nameB = b.children[0].textContent;
        const salaryA = parseInt(a.children[5].textContent.replace(/[^\d]/g, ''));
        const salaryB = parseInt(b.children[5].textContent.replace(/[^\d]/g, ''));
        const dateA = a.children[6].textContent;
        const dateB = b.children[6].textContent;
        
        switch(sortBy) {
            case 'name-asc':
                return nameA.localeCompare(nameB, 'vi');
            case 'name-desc':
                return nameB.localeCompare(nameA, 'vi');
            case 'salary-asc':
                return salaryA - salaryB;
            case 'salary-desc':
                return salaryB - salaryA;
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
    document.getElementById('employeeCount').textContent = visibleCount;
}

// Hàm hủy form nhân viên
function cancelEmployeeForm() {
    const employeeForm = document.getElementById('employeeForm');
    employeeForm.style.display = 'none';
    employeeForm.reset();
    isEditingEmployee = false;
    editingEmployeeIndex = null;
}

// Hàm thêm nhân viên
function addEmployee() {
    const employeeName = document.getElementById('employeeName').value;
    const employeeBirthDate = document.getElementById('employeeBirthDate').value;
    const employeeGender = document.getElementById('employeeGender').value;
    const employeePhone = document.getElementById('employeePhone').value;
    const employeeAddress = document.getElementById('employeeAddress').value;
    const employeePosition = document.getElementById('employeePosition').value;
    const employeeSalary = document.getElementById('employeeSalary').value;
    const employeeStartDate = document.getElementById('employeeStartDate').value;
    const employeeStatus = document.getElementById('employeeStatus').value;
    
    // Hiển thị thông báo thành công
    alert('Đã thêm nhân viên: ' + employeeName);
    
    // Reset form và ẩn
    cancelEmployeeForm();
}

// Hàm sửa nhân viên
function editEmployee(index) {
    isEditingEmployee = true;
    editingEmployeeIndex = index;
    
    const employeeForm = document.getElementById('employeeForm');
    const tbody = document.getElementById('employeeTableBody');
    const row = tbody.querySelector(`tr[data-index="${index}"]`);
    
    if (!row) return;
    
    // Lấy dữ liệu từ hàng
    const name = row.children[0].textContent;
    const birthDate = row.children[1].textContent;
    const gender = row.children[2].textContent;
    const phone = row.children[3].textContent;
    const position = row.children[4].querySelector('.badge').textContent;
    const salary = row.children[5].textContent.replace(/[^\d]/g, '');
    const startDate = row.children[6].textContent;
    const statusBadge = row.children[7].querySelector('.badge');
    const status = statusBadge.classList.contains('badge-success') ? '1' : '0';
    
    // Chuyển đổi định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD
    const convertDate = (dateStr) => {
        if (!dateStr) return '';
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return '';
    };
    
    // Điền dữ liệu vào form
    document.getElementById('employeeName').value = name;
    document.getElementById('employeeBirthDate').value = convertDate(birthDate);
    document.getElementById('employeeGender').value = gender;
    document.getElementById('employeePhone').value = phone;
    document.getElementById('employeePosition').value = position;
    document.getElementById('employeeSalary').value = salary;
    document.getElementById('employeeStartDate').value = convertDate(startDate);
    document.getElementById('employeeStatus').value = status;
    
    document.getElementById('employeeFormTitle').innerHTML = '<i class="fa-solid fa-edit"></i> Chỉnh Sửa Nhân Viên';
    
    // Hiển thị form
    employeeForm.style.display = 'block';
    
    // Scroll to form
    employeeForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hàm cập nhật nhân viên
function updateEmployee() {
    const employeeName = document.getElementById('employeeName').value;
    
    alert('Đã cập nhật nhân viên: ' + employeeName);
    
    cancelEmployeeForm();
}

// Hàm xóa nhân viên
function deleteEmployee(index) {
    const tbody = document.getElementById('employeeTableBody');
    const row = tbody.querySelector(`tr[data-index="${index}"]`);
    
    if (!row) return;
    
    const employeeName = row.children[0].textContent;
    
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên: ' + employeeName + '?')) {
        alert('Đã xóa nhân viên: ' + employeeName);
        // Trong thực tế, code xóa hàng sẽ được thực hiện ở đây
        // row.remove();
        
        // Cập nhật số lượng
        filterEmployees();
    }
}

// ===== DASHBOARD & REPORT STATISTICS =====

// Cập nhật dashboard với dữ liệu thực
function updateDashboard() {
    const products = getProducts();
    const customers = getCustomers();
    const salesOrders = getSalesOrders();
    const purchaseOrders = getPurchaseOrders();
    
    // Cập nhật số lượng sản phẩm
    const dashboardProducts = document.getElementById('dashboardProducts');
    if (dashboardProducts) {
        dashboardProducts.textContent = products.length;
    }
    
    // Cập nhật số lượng khách hàng
    const dashboardCustomers = document.getElementById('dashboardCustomers');
    if (dashboardCustomers) {
        dashboardCustomers.textContent = customers.length;
    }
    
    // Cập nhật số lượng đơn hàng bán
    const dashboardSalesOrders = document.getElementById('dashboardSalesOrders');
    if (dashboardSalesOrders) {
        dashboardSalesOrders.textContent = salesOrders.length;
    }
    
    // Cập nhật số lượng đơn hàng nhập
    const dashboardPurchaseOrders = document.getElementById('dashboardPurchaseOrders');
    if (dashboardPurchaseOrders) {
        dashboardPurchaseOrders.textContent = purchaseOrders.length;
    }
    
    // Tính tổng doanh thu từ đơn hàng bán đã hoàn thành
    const completedSalesOrders = salesOrders.filter(order => order.status === 'completed');
    const totalRevenue = completedSalesOrders.reduce((sum, order) => {
        return sum + (order.totalAmount || order.total || 0);
    }, 0);
    
    const dashboardRevenue = document.getElementById('dashboardRevenue');
    if (dashboardRevenue) {
        if (totalRevenue >= 1000000) {
            dashboardRevenue.textContent = (totalRevenue / 1000000).toFixed(1) + 'M';
        } else {
            dashboardRevenue.textContent = totalRevenue.toLocaleString('vi-VN') + 'đ';
        }
    }
}

// Cập nhật báo cáo đơn hàng bán
function updateSalesReport() {
    const salesOrders = getSalesOrders();
    const customers = getCustomers();
    const products = getProducts();
    
    // Lọc đơn hàng theo ngày
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    
    let filteredOrders = salesOrders;
    
    if (startDate && endDate) {
        filteredOrders = salesOrders.filter(order => {
            const orderDate = order.orderDate || order.date;
            return orderDate >= startDate && orderDate <= endDate;
        });
    }
    
    // Cập nhật tổng số đơn hàng
    const totalOrders = document.getElementById('totalOrders');
    if (totalOrders) {
        totalOrders.textContent = filteredOrders.length;
    }
    
    // Tính tổng doanh thu (hỗ trợ cả format cũ và mới)
    const totalRevenue = filteredOrders.reduce((sum, order) => {
        return sum + (order.totalAmount || order.total || 0);
    }, 0);
    const totalRevenueElement = document.getElementById('totalRevenue');
    if (totalRevenueElement) {
        totalRevenueElement.textContent = totalRevenue.toLocaleString('vi-VN') + 'đ';
    }
    
    // Hiển thị số đơn hàng đang hiển thị
    const displayedCount = document.getElementById('displayedCount');
    if (displayedCount) {
        displayedCount.textContent = filteredOrders.length;
    }
    
    // Render bảng đơn hàng
    const tbody = document.querySelector('#ordersTable tbody');
    if (tbody) {
        if (filteredOrders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Không có đơn hàng nào</td></tr>';
        } else {
            tbody.innerHTML = filteredOrders.map(order => {
                const customer = customers.find(c => c.id === order.customerId) || { name: order.customerName || 'N/A' };
                
                // Handle both new format (products array) and old format (single product)
                let productDisplay = '';
                if (order.products && order.products.length > 0) {
                    productDisplay = order.products.map(p => p.productName).join(', ');
                } else {
                    const product = products.find(p => p.id === order.productId) || { name: 'N/A' };
                    productDisplay = product.name;
                }
                
                const totalAmount = order.totalAmount || order.total || 0;
                const orderDate = order.orderDate || order.date || '';
                
                let statusClass = 'status-pending';
                let statusText = 'Chờ xử lý';
                
                if (order.status === 'processing') {
                    statusClass = 'status-processing';
                    statusText = 'Đang xử lý';
                } else if (order.status === 'shipping') {
                    statusClass = 'status-shipping';
                    statusText = 'Đang giao';
                } else if (order.status === 'completed') {
                    statusClass = 'status-completed';
                    statusText = 'Hoàn thành';
                } else if (order.status === 'cancelled') {
                    statusClass = 'status-cancelled';
                    statusText = 'Đã hủy';
                }
                
                return `
                    <tr>
                        <td>${order.id}</td>
                        <td>${customer.name}</td>
                        <td>${productDisplay}</td>
                        <td>${totalAmount.toLocaleString('vi-VN')}đ</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>${orderDate}</td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// Load product filter options from localStorage
function loadProductFilterOptions() {
    const productFilter = document.getElementById('productFilter');
    if (!productFilter) return;
    
    const products = getProducts();
    
    // Clear existing options except "Tất cả sản phẩm"
    productFilter.innerHTML = '<option value="all">Tất cả sản phẩm</option>';
    
    // Add options from products in localStorage
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productFilter.appendChild(option);
    });
}

// Lọc đơn hàng bán theo ngày
function filterByDate() {
    updateSalesReport();
}

// Lọc đơn hàng bán theo sản phẩm
function filterByProduct() {
    const productFilter = document.getElementById('productFilter')?.value;
    if (!productFilter) return;
    
    const salesOrders = getSalesOrders();
    const customers = getCustomers();
    const products = getProducts();
    
    let filteredOrders = salesOrders;
    
    // Lọc theo sản phẩm
    if (productFilter && productFilter !== 'all') {
        filteredOrders = salesOrders.filter(order => {
            // Handle new format (products array)
            if (order.products && order.products.length > 0) {
                return order.products.some(p => p.productId === productFilter);
            }
            // Handle old format (single product)
            return order.productId === productFilter;
        });
    }
    
    // Cập nhật tổng số đơn hàng
    const totalOrders = document.getElementById('totalOrders');
    if (totalOrders) {
        totalOrders.textContent = filteredOrders.length;
    }
    
    // Tính tổng doanh thu
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + (order.totalAmount || order.total || 0), 0);
    const totalRevenueElement = document.getElementById('totalRevenue');
    if (totalRevenueElement) {
        totalRevenueElement.textContent = totalRevenue.toLocaleString('vi-VN') + 'đ';
    }
    
    // Hiển thị số đơn hàng đang hiển thị
    const displayedCount = document.getElementById('displayedCount');
    if (displayedCount) {
        displayedCount.textContent = filteredOrders.length;
    }
    
    // Render bảng đơn hàng
    const tbody = document.querySelector('#ordersTable tbody');
    if (tbody) {
        if (filteredOrders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Không có đơn hàng nào</td></tr>';
        } else {
            tbody.innerHTML = filteredOrders.map(order => {
                const customer = customers.find(c => c.id === order.customerId) || { name: order.customerName || 'N/A' };
                
                // Handle both new format (products array) and old format (single product)
                let productDisplay = '';
                if (order.products && order.products.length > 0) {
                    productDisplay = order.products.map(p => p.productName).join(', ');
                } else {
                    const product = products.find(p => p.id === order.productId) || { name: 'N/A' };
                    productDisplay = product.name;
                }
                
                const totalAmount = order.totalAmount || order.total || 0;
                const orderDate = order.orderDate || order.date || '';
                
                let statusClass = 'status-pending';
                let statusText = 'Chờ xử lý';
                
                if (order.status === 'processing') {
                    statusClass = 'status-processing';
                    statusText = 'Đang xử lý';
                } else if (order.status === 'shipping') {
                    statusClass = 'status-shipping';
                    statusText = 'Đang giao';
                } else if (order.status === 'completed') {
                    statusClass = 'status-completed';
                    statusText = 'Hoàn thành';
                } else if (order.status === 'cancelled') {
                    statusClass = 'status-cancelled';
                    statusText = 'Đã hủy';
                }
                
                return `
                    <tr>
                        <td>${order.id}</td>
                        <td>${customer.name}</td>
                        <td>${productDisplay}</td>
                        <td>${totalAmount.toLocaleString('vi-VN')}đ</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>${orderDate}</td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// Cập nhật báo cáo đơn hàng nhập
function updatePurchaseOrdersReport() {
    const purchaseOrders = getPurchaseOrders();
    const products = getProducts();
    
    // Lọc đơn hàng theo ngày
    const startDate = document.getElementById('purchaseStartDate')?.value;
    const endDate = document.getElementById('purchaseEndDate')?.value;
    const statusFilter = document.getElementById('purchaseStatusFilter')?.value;
    
    let filteredOrders = purchaseOrders;
    
    // Lọc theo ngày
    if (startDate && endDate) {
        filteredOrders = filteredOrders.filter(order => {
            return order.date >= startDate && order.date <= endDate;
        });
    }
    
    // Lọc theo trạng thái
    if (statusFilter && statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    // Cập nhật tổng số đơn hàng nhập
    const totalPurchaseOrders = document.getElementById('totalPurchaseOrders');
    if (totalPurchaseOrders) {
        totalPurchaseOrders.textContent = filteredOrders.length;
    }
    
    // Tính tổng giá trị nhập
    const totalValue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalPurchaseValue = document.getElementById('totalPurchaseValue');
    if (totalPurchaseValue) {
        totalPurchaseValue.textContent = totalValue.toLocaleString('vi-VN') + 'đ';
    }
    
    // Hiển thị số đơn hàng đang hiển thị
    const displayedCount = document.getElementById('displayedPurchaseCount');
    if (displayedCount) {
        displayedCount.textContent = filteredOrders.length;
    }
    
    // Render bảng đơn hàng
    const tbody = document.querySelector('#purchaseOrdersReportTable tbody');
    if (tbody) {
        if (filteredOrders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px;">Không có đơn hàng nhập nào</td></tr>';
        } else {
            tbody.innerHTML = filteredOrders.map(order => {
                const product = products.find(p => p.id === order.productId) || { name: 'N/A' };
                
                let statusClass = 'status-pending';
                let statusText = 'Chờ duyệt';
                
                if (order.status === 'approved') {
                    statusClass = 'status-processing';
                    statusText = 'Đã duyệt';
                } else if (order.status === 'receiving') {
                    statusClass = 'status-shipping';
                    statusText = 'Đang nhập';
                } else if (order.status === 'completed') {
                    statusClass = 'status-completed';
                    statusText = 'Hoàn thành';
                } else if (order.status === 'cancelled') {
                    statusClass = 'status-cancelled';
                    statusText = 'Đã hủy';
                }
                
                return `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.supplier}</td>
                        <td>${product.name}</td>
                        <td>${order.quantity}</td>
                        <td>${order.total.toLocaleString('vi-VN')}đ</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>${order.date}</td>
                    </tr>
                `;
            }).join('');
        }
    }
}

// Lọc đơn hàng nhập theo ngày
function filterPurchaseOrdersByDate() {
    updatePurchaseOrdersReport();
}

// Lọc đơn hàng nhập theo trạng thái
function filterPurchaseOrdersByStatus() {
    updatePurchaseOrdersReport();
}