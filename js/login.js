function registerAccount(event) {
    if (event) event.preventDefault(); // Ngăn chặn hành vi gửi form mặc định

    // Lấy giá trị từ các trường đăng ký
    const username = document.getElementById("registerUser").value;
    const password = document.getElementById("registerPass").value;
    const email = document.getElementById("registerEmail").value;
    const displayName = document.getElementById("registerDisplayName").value;

    // Kiểm tra xem tất cả trường có dữ liệu
    if (username === "" || password === "" || email === "" || displayName === "") {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (!validatePasswordFormat(password)) {
        alert("Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một số và một ký tự đặc biệt, và có độ dài tối thiểu 8 ký tự.");
        return;
    }

    if (!validateEmailFormat(email)) {
        alert("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
        return;
    }

    // Tạo đối tượng tài khoản mới
    const account = {
        username: username,
        password: password,
        email: email,
        displayName: displayName
    };

    // Lấy danh sách tài khoản từ localStorage (nếu có)
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Kiểm tra xem tên đăng nhập đã tồn tại hay chưa
    const isExistingUser = accounts.some((acc) => acc.username === username);
    if (isExistingUser) {
        alert("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
        return;
    }

    // Thêm tài khoản mới vào danh sách
    accounts.push(account);

    // Lưu danh sách tài khoản vào localStorage
    localStorage.setItem("accounts", JSON.stringify(accounts));

    alert("Đăng ký thành công!");
    
    // Đóng modal và chuyển sang modal đăng nhập
    if (typeof switchModal === 'function') {
        switchModal('modal-signup', 'modal-login');
    } else {
        window.location.href = "login.html";
    }
}

function login(event) {
    event.preventDefault(); 
    const username = document.getElementById("loginUser").value.trim(); 
    const password = document.getElementById("loginPass").value;

    if (username === "" || password === "") {
        alert("Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.");
        return;
    }

    if (!validatePasswordFormat(password)) {
        alert("Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một số và một ký tự đặc biệt, và có độ dài tối thiểu 8 ký tự.");
        return;
    }

    // Lấy danh sách tài khoản từ localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Kiểm tra xem tài khoản có tồn tại và mật khẩu có khớp không
    const userAccount = accounts.find((account) => account.username === username && account.password === password);

    if (userAccount) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("displayName", userAccount.displayName);
        localStorage.setItem("username", username); 

        // Đóng modal nếu đang mở
        if (typeof closeModal === 'function') {
            closeModal('modal-login');
        }

        if (username === "duchuy2501") { 
            window.location.href = "admin.html"; 
            alert("Đăng nhập quyền quản trị viên thành công.");
        } else {
            window.location.href = "index.html"; 
        }
    } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng.");
        return;
    }
}

function requireLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        document.getElementById("login-form").style.display = "block";
    }
}

// Hàm xử lý đăng xuất
function logout() {
    localStorage.removeItem("isLoggedIn"); 
    localStorage.removeItem("displayName"); 
    location.reload(); 
    window.location.href = "index.html"; 
}

// Kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const displayName = localStorage.getItem("displayName");
    const username = localStorage.getItem("username");
    const authOptions = document.getElementById("auth-options");

    if (isLoggedIn === "true" && authOptions) {
        // Kiểm tra xem có phải admin không
        const isAdmin = username === "duchuy2501";
        
        // Hiển thị dropdown menu khi đã đăng nhập
        authOptions.innerHTML = `
            <li class="user-menu-item">
                <a href="#" class="user-greeting"><i class="fa-solid fa-user"></i>Xin chào, <span id="user-name">${displayName}</span><i class="fa-solid fa-caret-down" style="margin-left: 5px;"></i></a>
                <ul class="user-dropdown">
                    <li><a href="#"><i class="fa-solid fa-user-circle"></i> Thông tin tài khoản</a></li>
                    <li><a href="#"><i class="fa-solid fa-key"></i> Đổi mật khẩu</a></li>
                    ${isAdmin ? '<li><a href="admin.html"><i class="fa-solid fa-user-shield"></i> Trang quản trị</a></li>' : ''}
                    <li><a href="#" onclick="logout()"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</a></li>
                </ul>
            </li>
        `;
    } else if (authOptions) {
        // Hiển thị nút đăng nhập khi chưa đăng nhập (mở modal)
        authOptions.innerHTML = `
            <li><a href="#" onclick="openModal('modal-login')"><i class="fa-solid fa-user"></i>Đăng nhập</a></li>
        `;
    }
});

function redirectToHomeOrAdmin() {
    const username = localStorage.getItem("username");
    if (username === "duchuy2501") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "index.html";
    }
}

function togglePasswordVisibility(inputId, toggleIconId) {
    const input = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleIconId);
    if (input.type === "password") {
        input.type = "text";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    }
}

function validatePasswordFormat(password) {
    const passwordPattern = /^[A-Z](?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return passwordPattern.test(password);
}

function validateEmailFormat(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function forgotPassword(event) {
    event.preventDefault(); 

    const email = document.getElementById("forgotEmail").value.trim(); 

    if (email === "") {
        alert("Vui lòng nhập email.");
        return;
    }

    if (!validateEmailFormat(email)) {
        alert("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
        return;
    }

    // Lấy danh sách tài khoản từ localStorage
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Tìm tài khoản khớp với email
    const userAccount = accounts.find((account) => account.email === email);

    if (userAccount) {
        // Hiển thị mật khẩu đã đăng ký
        alert(`Mật khẩu của bạn là: ${userAccount.password}.`);
    } else {
        alert("Không tìm thấy tài khoản với email này.");
    }
}



