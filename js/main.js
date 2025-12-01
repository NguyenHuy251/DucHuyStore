var images = [
  "https://png.pngtree.com/background/20210710/original/pngtree-chinese-style-ink-fan-background-picture-image_1003262.jpg",
  "https://m.media-amazon.com/images/I/51H4ikG-1XL._AC_UF894,1000_QL80_.jpg",
  "https://media.gettyimages.com/id/94394555/photo/fan.jpg?s=612x612&w=gi&k=20&c=D4tJQVS790oXgrUmEoCl4Y22BseDIQf0LH1-JDUaZTY=",
  "https://png.pngtree.com/thumb_back/fh260/background/20240913/pngtree-electric-fan-isolated-on-transparent-background-modern-cooling-appliance-for-home-image_16190470.jpg"
];

var currentIndex = 0;
function loadImage() {
  var imageElement = $("#image");
  imageElement.fadeOut(300, function () {
    imageElement.attr("src", images[currentIndex]).fadeIn(300);
  });
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
  setInterval(next,2500)
}

$(document).ready(function(){
  // alert("Hello Jquery");
  
  // $("#header").css("background-color","yellow"); 


  // $("span").css("color","black");

  // $(".product img").css("border","1px solid #CCC") 

  // var a = $("#content").parent().text(); 
  // alert(a) 

  // var p = $(".product").find(".product-name").text(); 
  // p = $(".product").find(".product-price"); 
  // price = p.prev().prev().text(); 
  // alert(price); 
  
  // $(".product").addClass("selected-product"); 
  // $(".product").removeaddClass("selected-product");

  // $(".title-sp").click(function(){ 
  //   $(this).toggleClass("body-sphot"); 
  // }); 

  // $(".title-sp").hover(function(){ 
  //     $(this).toggleClass(".body-sphot"); 
  // });

  $(".title-sp").click(function(){
      $(this).next().slideToggle(1000);
  });
});



function addToCart(name, price, imageUrl) {
  // Lấy dữ liệu giỏ hàng hiện tại từ localStorage hoặc khởi tạo mảng mới
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Tạo đối tượng sản phẩm
  let product = {
      name: name,
      price: price,
      imageUrl: imageUrl,
      quantity: 1 // Thêm thuộc tính số lượng mặc định là 1
  };

  // Thêm sản phẩm vào giỏ hàng
  cart.push(product);

  // Lưu lại giỏ hàng vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Sản phẩm đã được thêm vào giỏ hàng!");
  updateCartCount(); // Cập nhật số lượng sản phẩm
  displayCart(); // Hiển thị giỏ hàng sau khi thêm sản phẩm
}

function checkLoginAndAddToCart(name, price, imageUrl) {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); 
    if (isLoggedIn === "true") {
        addToCart(name, price, imageUrl);
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

// Cập nhật số lượng sản phẩm trong giỏ hàng (theo số loại sản phẩm)
function updateCartCount() {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); 
  if (isLoggedIn !== "true") {
    document.getElementById("cart-count").innerText = 0; 
    return;
  }

  // Lấy dữ liệu giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Đếm số lượng loại sản phẩm thay vì tổng số lượng
  let productCount = cart.length;
  
  // Cập nhật số lượng loại sản phẩm vào phần tử hiển thị
  document.getElementById("cart-count").innerText = productCount;
}



// Danh sách sản phẩm đầy đủ
const allProducts = [
  // Quạt Trần
  { name: "Quạt trần Asia Z1", category: "Quạt Trần", keywords: ["trần", "asia", "z1"], image: "https://i.pinimg.com/originals/c3/d8/05/c3d8050e9e5f6d9db48b8fc8a3b23c90.png", price: 3500000 },
  { name: "Quạt trần Vinawind Luxury", category: "Quạt Trần", keywords: ["trần", "vinawind", "luxury", "sang trọng"], image: "https://hoangphucvietnam.vn/wp-content/uploads/2019/12/quat-tran-panasonic-f-m14d2-1.png", price: 4500000 },
  { name: "Quạt trần thông minh SmartFan Pro", category: "Quạt Trần", keywords: ["trần", "thông minh", "smart", "pro"], image: "https://www.crompton.co.in/cdn/shop/files/SilentproBlossomsmart_Denimblue_1_angle_1.png?v=1702372703", price: 3500000 },
  { name: "Quạt trần Venus Gold Edition", category: "Quạt Trần", keywords: ["trần", "venus", "gold", "cao cấp"], image: "https://www.venushomeappliances.com/storage/app/product_type/20210107063528adorana-product.png", price: 4000000 },
  { name: "Quạt trần Senko TR668", category: "Quạt Trần", keywords: ["trần", "senko", "tr668"], image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/329/122/products/quat-tran-panasonic-f-m14d2.png?v=1616665564093", price: 3200000 },
  { name: "Quạt trần KDK U60FW", category: "Quạt Trần", keywords: ["trần", "kdk", "u60fw", "nhật"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-tran-kdk-u60fw.png?v=1616665690850", price: 5000000 },
  
  // Quạt Bàn
  { name: "Quạt bàn Toshiba F-LSA10", category: "Quạt Bàn", keywords: ["bàn", "toshiba", "lsa10"], image: "https://www.mitre10.com.au/media/catalog/category/thumbnail/desk-fan-mitre-10.jpg", price: 650000 },
  { name: "Quạt bàn Panasonic F-409U", category: "Quạt Bàn", keywords: ["bàn", "panasonic", "409u"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-ban-panasonic-f-409u.png?v=1616664997823", price: 580000 },
  { name: "Quạt bàn Asia B16025", category: "Quạt Bàn", keywords: ["bàn", "asia", "b16025"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-ban-asia-b16025.png?v=1616665119240", price: 520000 },
  { name: "Quạt bàn Mitsubishi D12-GA", category: "Quạt Bàn", keywords: ["bàn", "mitsubishi", "d12", "nhật"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-ban-mitsubishi-d12-ga.png?v=1616665253467", price: 750000 },
  
  // Quạt Công Nghiệp
  { name: "Quạt công nghiệp Asia DL700", category: "Quạt Công Nghiệp", keywords: ["công nghiệp", "asia", "dl700", "xưởng"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-cong-nghiep-asia-dl700.png?v=1616665377550", price: 2500000 },
  { name: "Quạt công nghiệp Senko IF750", category: "Quạt Công Nghiệp", keywords: ["công nghiệp", "senko", "if750", "mạnh"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-cong-nghiep-senko-if750.png?v=1616665503867", price: 2800000 },
  { name: "Quạt công nghiệp Hatari IF-650", category: "Quạt Công Nghiệp", keywords: ["công nghiệp", "hatari", "if650"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-cong-nghiep-hatari-if-650.png?v=1616665629183", price: 2200000 },
  
  // Quạt Mini
  { name: "Quạt cầm tay Mini USB", category: "Quạt Mini", keywords: ["mini", "cầm tay", "usb", "du lịch"], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwOY9kTug5W7SyEbnAik7UMN_mnXwbjxSRA&s", price: 250000 },
  { name: "Quạt mini để bàn Q2", category: "Quạt Mini", keywords: ["mini", "để bàn", "q2", "nhỏ gọn"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-mini-de-ban-q2.png?v=1616665752500", price: 180000 },
  { name: "Quạt mini sạc pin P10", category: "Quạt Mini", keywords: ["mini", "sạc pin", "p10", "di động"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-mini-sac-pin-p10.png?v=1616665878817", price: 350000 },
  
  // Quạt Gaming
  { name: "Quạt hộp Adian Gaming RGB", category: "Quạt Gaming", keywords: ["gaming", "adian", "rgb", "led", "hộp"], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTaxLilSxoIcM9ZfjucTj-Xatkw9jvhTpNA&s", price: 1000000 },
  { name: "Quạt tản nhiệt PC Cooler Master", category: "Quạt Gaming", keywords: ["gaming", "pc", "cooler", "tản nhiệt", "máy tính"], image: "https://bizweb.dktcdn.net/100/329/122/products/quat-gaming-cooler-master.png?v=1616666004133", price: 1200000 }
];

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
  const options = document.getElementById('chatbot-options');
  if (options) {
    options.style.display = options.style.display === 'flex' ? 'none' : 'flex';
  }
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
    document.getElementById('account-displayname').textContent = account.displayName || displayName;
    document.getElementById('account-email').textContent = account.email || 'Chưa cập nhật';
    document.getElementById('account-password').textContent = '••••••••';
    document.getElementById('account-password').dataset.password = account.password;
    document.getElementById('account-password').dataset.hidden = 'true';
    document.getElementById('account-created').textContent = account.createdAt || 'Chưa có thông tin';
  } else {
    document.getElementById('account-username').textContent = username;
    document.getElementById('account-displayname').textContent = displayName;
    document.getElementById('account-email').textContent = 'Chưa cập nhật';
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

// Make functions globally accessible
window.showAccountInfo = showAccountInfo;
window.toggleAccountPassword = toggleAccountPassword;

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