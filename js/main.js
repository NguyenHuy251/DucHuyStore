var images = [
  "https://png.pngtree.com/background/20210710/original/pngtree-chinese-style-ink-fan-background-picture-image_1003262.jpg",
  "https://m.media-amazon.com/images/I/51H4ikG-1XL._AC_UF894,1000_QL80_.jpg",
  "https://media.gettyimages.com/id/94394555/photo/fan.jpg?s=612x612&w=gi&k=20&c=D4tJQVS790oXgrUmEoCl4Y22BseDIQf0LH1-JDUaZTY=",
  "https://png.pngtree.com/thumb_back/fh260/background/20240913/pngtree-electric-fan-isolated-on-transparent-background-modern-cooling-appliance-for-home-image_16190470.jpg"
];

var currentIndex = 0;
var isTransitioning = false;

function loadImage() {
  if (isTransitioning) return;
  isTransitioning = true;
  
  var imageElement = $("#image");
  
  // Add fade-out class
  imageElement.addClass("fade-out");
  
  // Wait for fade out to complete, then change image
  setTimeout(function() {
    imageElement.attr("src", images[currentIndex]);
    imageElement.removeClass("fade-out").addClass("fade-in");
    
    // Reset classes after animation
    setTimeout(function() {
      imageElement.removeClass("fade-in");
      isTransitioning = false;
    }, 800);
  }, 400);
}

function next() {
  if (currentIndex < images.length - 1) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  loadImage();
}

function back() {
  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = images.length - 1;
  }
  loadImage();
}

function autoPlay(){
  setInterval(next, 4000)
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

function displayHotProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const container = document.getElementById('hotProductsContainer');
    
    if (!container) return;
    
    // Tính số lượng đã bán
    const soldQuantities = calculateSoldQuantities();
    
    // Sắp xếp sản phẩm theo số lượng đã bán (từ cao đến thấp)
    const sortedProducts = products.map(product => ({
        ...product,
        soldQty: soldQuantities[product.id] || 0
    })).sort((a, b) => b.soldQty - a.soldQty);
    
    // Lấy 8 sản phẩm bán chạy nhất
    const hotProducts = sortedProducts.slice(0, 8);
    
    container.innerHTML = hotProducts.map(product => {
        const soldQty = product.soldQty;
        const remainingStock = product.stock || 0;
        
        return `
        <div class="col-s-6 col-m-4 col-x-3">
            <div class="hot-product-card">
                <div class="hot-product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="product-badge">Hot</span>
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
        </div>
    `;
    }).join('');
}

// Initialize khi trang load
$(document).ready(function(){
  $(".title-sp").click(function(){
      $(this).next().slideToggle(1000);
  });
  
  // Load hot products và update cart count
  autoPlay();
  updateCartCount();
  displayHotProducts();
  
  // Lắng nghe sự kiện cập nhật từ localStorage
  window.addEventListener('storage', function(e) {
      if (e.key === 'products') {
          displayHotProducts();
      }
  });
  
  // Lắng nghe custom event
  window.addEventListener('productsUpdated', function() {
      displayHotProducts();
  });
});

// ===== HELPER FUNCTIONS - QUẢN LÝ DỮ LIỆU THEO USER =====
function getCurrentUsername() {
  return localStorage.getItem('username') || 'guest';
}

function getUserCart() {
  const username = getCurrentUsername();
  const cartKey = `cart_${username}`;
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

function setUserCart(cart) {
  const username = getCurrentUsername();
  const cartKey = `cart_${username}`;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function addToCart(id, name, price, imageUrl) {
  // Lấy dữ liệu giỏ hàng riêng của user
  let cart = getUserCart();

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingProductIndex = cart.findIndex(item => 
      item.id === id || (item.name === name && item.price === price && item.imageUrl === imageUrl)
  );

  if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      cart[existingProductIndex].quantity += 1;
  } else {
      // Nếu chưa có, tạo sản phẩm mới và thêm vào giỏ
      let product = {
          id: id,
          name: name,
          price: price,
          imageUrl: imageUrl,
          quantity: 1
      };
      cart.push(product);
  }

  // Lưu giỏ hàng riêng của user
  setUserCart(cart);

  alert("Sản phẩm đã được thêm vào giỏ hàng!");
  updateCartCount(); // Cập nhật số lượng sản phẩm
  displayCart(); // Hiển thị giỏ hàng sau khi thêm sản phẩm
}

function checkLoginAndAddToCart(id, name, price, imageUrl) {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); 
    if (isLoggedIn === "true") {
        addToCart(id, name, price, imageUrl);
    } else {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        openModal('modal-login');
    }
}

// Xem chi tiết sản phẩm 
function viewProductDetail(name, price, imageUrl) {
    const product = {
        name: name,
        price: price,
        image: imageUrl,
        timestamp: new Date().getTime()
    };
    
    // Lưu thông tin sản phẩm vào localStorage
    localStorage.setItem('currentProduct', JSON.stringify(product));
    
    // Chuyển trang
    window.location.href = 'chitiet.html';
}

// Kiểm tra đăng nhập trước khi vào giỏ hàng
function checkLoginForCart(event) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    event.preventDefault();
    alert("Vui lòng đăng nhập để xem giỏ hàng!");
    openModal('modal-login');
    return false;
  }
  return true;
}

// Cập nhật số lượng sản phẩm trong giỏ hàng (theo số loại sản phẩm)
function updateCartCount() {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); 
  if (isLoggedIn !== "true") {
    document.getElementById("cart-count").innerText = 0; 
    return;
  }

  // Lấy giỏ hàng riêng của user
  let cart = getUserCart();
  
  // Đếm số lượng loại sản phẩm thay vì tổng số lượng
  let productCount = cart.length;
  
  // Cập nhật số lượng loại sản phẩm vào phần tử hiển thị
  document.getElementById("cart-count").innerText = productCount;
}



// Danh sách sản phẩm đầy đủ
// Lấy tất cả sản phẩm từ localStorage
function getAllProductsForSearch() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  return products.map(p => ({
    name: p.name,
    category: p.category,
    keywords: [p.name.toLowerCase(), p.category.toLowerCase()],
    image: p.image,
    price: p.price,
    id: p.id
  }));
}

// Tìm kiếm thông minh với gợi ý
function searchProduct(event) {
  if (event) {
    event.preventDefault();
  }
  
  const searchBox = document.getElementById("box-find");
  const query = searchBox.value.trim().toLowerCase();
  
  if (query.length < 2) {
    showSearchNotification("Vui lòng nhập ít nhất 2 ký tự để tìm kiếm", "warning");
    return;
  }
  
  // Lấy sản phẩm từ localStorage
  const allProducts = getAllProductsForSearch();
  
  // Tìm kiếm thông minh: tên, danh mục, từ khóa
  const results = allProducts.filter(p => {
    const matchName = p.name.toLowerCase().includes(query);
    const matchCategory = p.category.toLowerCase().includes(query);
    const matchKeywords = p.keywords.some(k => k.includes(query));
    return matchName || matchCategory || matchKeywords;
  });
  
  if (results.length === 0) {
    showSearchNotification("Không tìm thấy sản phẩm phù hợp. Thử từ khóa khác!", "error");
    return;
  }
  
  if (results.length === 1) {
    // Chỉ có 1 kết quả, chuyển thẳng đến trang chi tiết
    viewProductDetail(results[0].name, results[0].price, results[0].image);
  } else {
    // Nhiều kết quả, hiển thị modal chọn
    showSearchResults(results, query);
  }
}

// Hiển thị kết quả tìm kiếm
function showSearchResults(results, query) {
  const modal = document.createElement('div');
  modal.className = 'search-results-modal';
  modal.innerHTML = `
    <div class="search-results-content">
      <div class="search-results-header">
        <h2><i class="fa-solid fa-magnifying-glass"></i> Kết quả tìm kiếm: "${query}"</h2>
        <button class="close-search-btn" onclick="this.closest('.search-results-modal').remove()">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      <p class="search-results-count">Tìm thấy ${results.length} sản phẩm</p>
      <div class="search-results-grid">
        ${results.map(product => `
          <div class="search-result-card" onclick="selectSearchProduct('${product.name}', ${product.price}, '${product.image}')">
            <img src="${product.image}" alt="${product.name}">
            <div class="search-result-info">
              <h3>${product.name}</h3>
              <span class="search-result-category">${product.category}</span>
              <p class="search-result-price">${product.price.toLocaleString('vi-VN')}đ</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 10);
}

// Chọn sản phẩm từ kết quả tìm kiếm
function selectSearchProduct(name, price, image) {
  document.querySelector('.search-results-modal').remove();
  viewProductDetail(name, price, image);
}

// Tìm kiếm thời gian thực khi gõ
function initSearchBox() {
  const searchBox = document.getElementById("box-find");
  if (!searchBox) return;
  
  let searchTimeout;
  let suggestionsDiv = document.getElementById('search-suggestions');
  
  if (!suggestionsDiv) {
    suggestionsDiv = document.createElement('div');
    suggestionsDiv.id = 'search-suggestions';
    suggestionsDiv.className = 'search-suggestions';
    searchBox.parentElement.appendChild(suggestionsDiv);
  }
  
  searchBox.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    const query = e.target.value.trim().toLowerCase();
    
    if (query.length < 2) {
      suggestionsDiv.style.display = 'none';
      return;
    }
    
    searchTimeout = setTimeout(() => {
      const allProducts = getAllProductsForSearch();
      const suggestions = allProducts.filter(p => {
        const matchName = p.name.toLowerCase().includes(query);
        const matchKeywords = p.keywords.some(k => k.includes(query));
        return matchName || matchKeywords;
      }).slice(0, 5);
      
      if (suggestions.length > 0) {
        suggestionsDiv.innerHTML = suggestions.map(p => `
          <div class="suggestion-item" onclick="selectSuggestion('${p.name}', ${p.price}, '${p.image}')">
            <img src="${p.image}" alt="${p.name}">
            <div class="suggestion-info">
              <span class="suggestion-name">${p.name}</span>
              <span class="suggestion-price">${p.price.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>
        `).join('');
        suggestionsDiv.style.display = 'block';
      } else {
        suggestionsDiv.style.display = 'none';
      }
    }, 300);
  });
  
  // Đóng gợi ý khi click ra ngoài
  document.addEventListener('click', function(e) {
    if (!searchBox.contains(e.target) && !suggestionsDiv.contains(e.target)) {
      suggestionsDiv.style.display = 'none';
    }
  });
  
  // Xử lý Enter key
  searchBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      suggestionsDiv.style.display = 'none';
      searchProduct();
    }
  });
}

// Chọn gợi ý
function selectSuggestion(name, price, image) {
  document.getElementById('search-suggestions').style.display = 'none';
  document.getElementById('box-find').value = '';
  viewProductDetail(name, price, image);
}

// Thông báo tìm kiếm
function showSearchNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `search-notification ${type}`;
  notification.innerHTML = `
    <i class="fa-solid fa-${type === 'error' ? 'circle-exclamation' : 'circle-info'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 10);
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Khởi tạo khi trang load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSearchBox);
} else {
  initSearchBox();
}

function showMore(button) {
  const secondBody = button.previousElementSibling;
  if (button.getAttribute("data-toggle") === "hidden") {
      $(secondBody).slideDown(500);
      button.setAttribute("data-toggle", "visible");
      button.innerHTML = '<i class="fa-solid fa-angles-up"></i>';
  } else {
      $(secondBody).slideUp(500);
      button.setAttribute("data-toggle", "hidden");
      button.innerHTML = '<i class="fa-solid fa-angles-down"></i>';
  }
}


function toggleChatbotOptions() {
  // Chuyển hướng đến trang liên hệ
  window.location.href = 'lienhe.html';
}

const chatbotBtn = document.getElementById('chatbot-btn');
if (chatbotBtn) {
  chatbotBtn.addEventListener('click', toggleChatbotOptions);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

function switchModal(currentModalId, nextModalId) {
  closeModal(currentModalId);
  setTimeout(() => {
    openModal(nextModalId);
  }, 300);
}

// Đóng modal khi click bên ngoài
window.onclick = function(event) {
  if (event.target.classList.contains('auth-modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Hiển thị thông tin tài khoản
function showAccountInfo() {
  console.log('=== showAccountInfo CALLED ===');
  const username = localStorage.getItem('username');
  const displayName = localStorage.getItem('displayName');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  
  console.log('isLoggedIn:', isLoggedIn);
  console.log('Username:', username);
  console.log('DisplayName:', displayName);
  
  if (!username || isLoggedIn !== 'true') {
    alert('Vui lòng đăng nhập!');
    openModal('modal-login');
    return;
  }

  // Lấy thông tin từ localStorage
  const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const account = accounts.find(acc => acc.username === username);

  console.log('Account found:', account);

  if (account) {
    document.getElementById('account-username').textContent = account.username;
    document.getElementById('account-displayname').value = account.displayName || displayName;
    document.getElementById('account-email').value = account.email || '';
    document.getElementById('account-phone').value = account.phone || '';
    document.getElementById('account-address').value = account.address || '';
    document.getElementById('account-password').textContent = '••••••••';
    document.getElementById('account-password').dataset.password = account.password;
    document.getElementById('account-password').dataset.hidden = 'true';
    document.getElementById('account-created').textContent = account.createdAt || 'Chưa có thông tin';
  } else {
    document.getElementById('account-username').textContent = username;
    document.getElementById('account-displayname').value = displayName;
    document.getElementById('account-email').value = '';
    document.getElementById('account-phone').value = '';
    document.getElementById('account-address').value = '';
    document.getElementById('account-password').textContent = '••••••••';
    document.getElementById('account-password').dataset.password = '';
    document.getElementById('account-password').dataset.hidden = 'true';
    document.getElementById('account-created').textContent = 'Chưa có thông tin';
  }

  // Reset icon về eye
  const icon = document.getElementById('toggle-account-pass-icon');
  if (icon) {
    icon.className = 'fa-solid fa-eye';
  }

  console.log('Opening modal...');
  openModal('modal-account');
  console.log('=== showAccountInfo DONE ===');
}

// Toggle hiển thị mật khẩu trong modal thông tin tài khoản
function toggleAccountPassword() {
  const passElement = document.getElementById('account-password');
  const icon = document.getElementById('toggle-account-pass-icon');
  
  if (passElement.dataset.hidden === 'true') {
    // Hiển thị mật khẩu
    passElement.textContent = passElement.dataset.password;
    passElement.dataset.hidden = 'false';
    icon.className = 'fa-solid fa-eye-slash';
  } else {
    // Ẩn mật khẩu
    passElement.textContent = '••••••••';
    passElement.dataset.hidden = 'true';
    icon.className = 'fa-solid fa-eye';
  }
}

// Cập nhật thông tin tài khoản
function updateAccountInfo(event) {
  event.preventDefault();

  const username = localStorage.getItem('username');
  if (!username) {
    alert('Vui lòng đăng nhập!');
    return;
  }

  // Lấy giá trị từ form
  const displayName = document.getElementById('account-displayname').value.trim();
  const email = document.getElementById('account-email').value.trim();
  const phone = document.getElementById('account-phone').value.trim();
  const address = document.getElementById('account-address').value.trim();

  // Validate
  if (!displayName || !email || !phone || !address) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  // Validate phone number
  if (!/^[0-9]{10,11}$/.test(phone)) {
    alert('Số điện thoại phải có 10-11 chữ số!');
    return;
  }

  // Validate email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Email không hợp lệ!');
    return;
  }

  // Cập nhật trong localStorage accounts
  const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const accountIndex = accounts.findIndex(acc => acc.username === username);

  if (accountIndex !== -1) {
    accounts[accountIndex].displayName = displayName;
    accounts[accountIndex].email = email;
    accounts[accountIndex].phone = phone;
    accounts[accountIndex].address = address;
    
    localStorage.setItem('accounts', JSON.stringify(accounts));
    localStorage.setItem('displayName', displayName);

    // Đồng bộ với customers nếu đã có
    syncAccountToCustomer(username, displayName, email, phone, address);

    alert('Cập nhật thông tin thành công!');
    closeModal('modal-account');
    
    // Reload trang để cập nhật hiển thị tên
    location.reload();
  } else {
    alert('Không tìm thấy tài khoản!');
  }
}

// Đồng bộ thông tin tài khoản với danh sách khách hàng
function syncAccountToCustomer(username, displayName, email, phone, address) {
  const customers = JSON.parse(localStorage.getItem('customers')) || [];
  
  // Tìm khách hàng có email khớp hoặc notes chứa username
  let customerIndex = customers.findIndex(c => c.email === email || (c.notes && c.notes.includes(`Tài khoản: ${username}`)));
  
  if (customerIndex !== -1) {
    // Cập nhật thông tin khách hàng
    customers[customerIndex].name = displayName;
    customers[customerIndex].phone = phone;
    customers[customerIndex].email = email;
    customers[customerIndex].address = address;
    customers[customerIndex].notes = `Tài khoản: ${username}`;
  } else {
    // Tạo khách hàng mới
    const newCustomer = {
      id: Date.now(),
      name: displayName,
      phone: phone,
      email: email,
      address: address,
      birthDate: '',
      gender: 'Khác',
      joinDate: new Date().toISOString().split('T')[0],
      notes: `Tài khoản: ${username}`
    };
    customers.push(newCustomer);
  }
  
  localStorage.setItem('customers', JSON.stringify(customers));
  
  // Dispatch event để admin page cập nhật
  window.dispatchEvent(new Event('storage'));
}

// Make functions globally accessible
window.showAccountInfo = showAccountInfo;
window.toggleAccountPassword = toggleAccountPassword;
window.updateAccountInfo = updateAccountInfo;

// Đổi mật khẩu
function changePassword(event) {
  event.preventDefault();

  const currentPass = document.getElementById('currentPass').value;
  const newPass = document.getElementById('newPass').value;
  const confirmPass = document.getElementById('confirmPass').value;
  const username = localStorage.getItem('username');

  if (!username) {
    alert('Vui lòng đăng nhập!');
    return;
  }

  // Kiểm tra mật khẩu mới khớp nhau
  if (newPass !== confirmPass) {
    alert('Mật khẩu mới không khớp!');
    return;
  }

  // Kiểm tra mật khẩu mới khác mật khẩu cũ
  if (currentPass === newPass) {
    alert('Mật khẩu mới phải khác mật khẩu hiện tại!');
    return;
  }

  // Lấy danh sách tài khoản
  const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  const accountIndex = accounts.findIndex(acc => acc.username === username);

  if (accountIndex === -1) {
    alert('Không tìm thấy tài khoản!');
    return;
  }

  // Kiểm tra mật khẩu hiện tại
  if (accounts[accountIndex].password !== currentPass) {
    alert('Mật khẩu hiện tại không đúng!');
    return;
  }

  // Cập nhật mật khẩu mới
  accounts[accountIndex].password = newPass;
  localStorage.setItem('accounts', JSON.stringify(accounts));

  alert('Đổi mật khẩu thành công!');
  closeModal('modal-changepass');
  
  // Reset form
  document.getElementById('currentPass').value = '';
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
}

// ===== LOAD TIN TỨC TỪ LOCALSTORAGE =====
function loadHomeNews() {
  const newsJson = localStorage.getItem('news');
  if (!newsJson) return;
  
  const allNews = JSON.parse(newsJson);
  if (!allNews || allNews.length === 0) return;
  
  // Sắp xếp tin tức theo ngày mới nhất (giả sử format DD/MM/YYYY)
  const sortedNews = allNews.sort((a, b) => {
    const dateA = a.date.split('/').reverse().join('');
    const dateB = b.date.split('/').reverse().join('');
    return dateB.localeCompare(dateA);
  });
  
  // Lấy tối đa 5 tin mới nhất
  const latestNews = sortedNews.slice(0, 5);
  
  // Tin nổi bật (tin mới nhất)
  if (latestNews.length > 0) {
    const featured = latestNews[0];
    const featuredHtml = `
      <div class="featured-news-image">
        <img src="${featured.image}" alt="${featured.title}">
        <span class="featured-badge">Nổi bật</span>
      </div>
      <div class="featured-news-content">
        <h3>${featured.title}</h3>
        <p>${featured.description}</p>
        <div class="featured-news-meta">
          <span><i class="fa-solid fa-calendar"></i> ${featured.date}</span>
          <span><i class="fa-solid fa-user"></i> ${featured.author}</span>
        </div>
      </div>
    `;
    
    const featuredElement = document.querySelector('.featured-news');
    if (featuredElement) {
      featuredElement.innerHTML = featuredHtml;
      featuredElement.onclick = function() { window.location.href = 'tintuc.html'; };
    }
  }
  
  // 4 tin tiếp theo
  if (latestNews.length > 1) {
    const gridNews = latestNews.slice(1, 5);
    const gridHtml = gridNews.map(news => `
      <div class="home-news-card" onclick="window.location.href='tintuc.html'" style="cursor: pointer;">
        <img src="${news.image}" alt="${news.title}">
        <div class="home-news-card-content">
          <h4>${news.title}</h4>
          <p>${news.description}</p>
          <div class="home-news-card-footer">
            <span><i class="fa-solid fa-calendar"></i> ${news.date}</span>
            <span><i class="fa-solid fa-user"></i> ${news.author}</span>
          </div>
        </div>
      </div>
    `).join('');
    
    const gridElement = document.querySelector('.home-news-grid');
    if (gridElement) {
      gridElement.innerHTML = gridHtml;
    }
  }
}

// Load tin tức khi trang index.html được load
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/f/') || window.location.pathname.endsWith('/f')) {
  document.addEventListener('DOMContentLoaded', loadHomeNews);
  
  // Lắng nghe sự kiện cập nhật tin tức
  window.addEventListener('storage', function(e) {
    if (e.key === 'news') {
      loadHomeNews();
    }
  });
  
  window.addEventListener('newsUpdated', loadHomeNews);
}