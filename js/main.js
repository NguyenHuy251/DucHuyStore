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

function updateCartCount() {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); 
  if (isLoggedIn !== "true") {
    document.getElementById("cart-count").innerText = 0; 
    return;
  }

  // Lấy dữ liệu giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Tính tổng số lượng sản phẩm
  let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Cập nhật tổng số lượng sản phẩm vào phần tử hiển thị
  document.getElementById("cart-count").innerText = totalQuantity;
}



function searchProduct() {
  const searchBox = document.getElementById("box-find");
  const query = searchBox.value.trim().toLowerCase();

  // Danh sách sản phẩm
  const products = [
    { name: "Quạt bàn", image: "https://www.mitre10.com.au/media/catalog/category/thumbnail/desk-fan-mitre-10.jpg", price: 650000 },
    { name: "Quạt trần thông minh", image: "https://www.crompton.co.in/cdn/shop/files/SilentproBlossomsmart_Denimblue_1_angle_1.png?v=1702372703", price: 3500000 },
    { name: "Quạt trần Venus", image: "https://www.venushomeappliances.com/storage/app/product_type/20210107063528adorana-product.png", price: 4000000 },
    { name: "Quạt cầm tay", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAwOY9kTug5W7SyEbnAik7UMN_mnXwbjxSRA&s", price: 250000 },
    { name: "Quạt hộp Adian", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsTaxLilSxoIcM9ZfjucTj-Xatkw9jvhTpNA&s", price: 1000000 }
  ];

  // Tìm sản phẩm
  const product = products.find(p => p.name.toLowerCase() === query);

  if (product) {
    // Chuyển hướng đến trang chi tiết sản phẩm
    window.location.href = `chitiet.html?name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&price=${product.price}`;
  } else {
    alert("Không tìm thấy sản phẩm!");
  }
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