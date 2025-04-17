function updateCartCount() {
    // Lấy dữ liệu giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Tính tổng số lượng sản phẩm
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Cập nhật tổng số lượng sản phẩm vào phần tử hiển thị
    document.getElementById("cart-count").innerText = totalQuantity;
}

function displayCart() {
    // Lấy dữ liệu giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Phần tử để hiển thị giỏ hàng
    let cartContainer = document.getElementById("cartContainer");
  
    // Kiểm tra nếu giỏ hàng rỗng
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="6" style="text-align: center; font-size:14pt;">Giỏ hàng của bạn đang trống.</td>
                    </tr>
                </tbody>
            </table>
        `;
        document.getElementById("total-price").innerText = "0";
        return;
    }
  
    // Bắt đầu bảng sản phẩm
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th> 
                    <th>Xóa</th> 
                </tr>
            </thead>
            <tbody>
    `;
  
    let totalQuantity = 0; // Biến để tính tổng số lượng
    let total = 0; // Biến để tính tổng giá
  
    // Hiển thị từng sản phẩm trong giỏ hàng
    cart.forEach((item, index) => {
        totalQuantity += item.quantity; // Cộng dồn tổng số lượng
        total += item.price * item.quantity; // Tính tổng giá theo số lượng
  
        tableHTML += `
            <tr>
                <td>${item.name}</td>
                <td><img src="${item.imageUrl}" alt="${item.name}" style="width: 100px; height: auto;"></td>
                <td>${item.price.toLocaleString()} đ</td> <!-- Định dạng giá -->
                <td>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    ${item.quantity}
                    <button onclick="increaseQuantity(${index})">+</button>
                </td>
                <td>${(item.price * item.quantity).toLocaleString()} đ</td> <!-- Hiển thị tổng tiền từng sản phẩm -->
                <td><button onclick="removeFromCart(${index})" style="color: black; border: none; border-radius: 10px; cursor: pointer;"><i class="fa-solid fa-circle-xmark"></i></button></td> <!-- Thêm nút Xóa -->
            </tr>
        `;
    });

    // Thêm hàng tổng tiền cần thanh toán ngay dưới các sản phẩm
    tableHTML += `
            <tr>
                <td colspan="4"><strong>Tổng tiền cần thanh toán</strong></td>
                <td><strong>${total.toLocaleString()} đ</strong></td>
            </tr>
    `;

    tableHTML += `
            <tr>
                <td colspan="3" style="text-align: center;"><strong>Thanh toán:</strong></td>
                <td colspan="2">
                    <div onclick="checkout()" style="color: white; background-color: green; border: none; border-radius: 5px; cursor: pointer;">Thanh toán</div>
                </td>
            </tr>
        </tbody>
    </table>
    `;
  
    cartContainer.innerHTML = tableHTML;
  
    // Cập nhật tổng giá tiền vào thẻ span
    document.getElementById("total-price").innerText = total.toLocaleString();
}


  // Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    // Lấy dữ liệu giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Xóa sản phẩm theo chỉ số index
    cart.splice(index, 1);
  
    // Cập nhật lại giỏ hàng trong localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    console.log(`Sản phẩm tại chỉ số ${index} đã được xóa`); // Kiểm tra chỉ số sản phẩm đã xóa
  
    updateCartCount(); // Cập nhật số lượng sản phẩm
    displayCart(); // Hiển thị lại giỏ hàng
}
  
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1; // Tăng số lượng sản phẩm
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Cập nhật số lượng sản phẩm
    displayCart(); // Cập nhật hiển thị giỏ hàng
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Giảm số lượng sản phẩm
    } else {
        cart.splice(index, 1); // Xóa sản phẩm nếu số lượng là 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // Cập nhật số lượng sản phẩm
    displayCart(); // Cập nhật hiển thị giỏ hàng
}

function checkout() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Kiểm tra trạng thái đăng nhập
  
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thực hiện thanh toán!"); // Hiển thị thông báo yêu cầu đăng nhập
      window.location.href = "login.html"; // Chuyển hướng đến trang đăng nhập
      return; // Dừng thực hiện nếu chưa đăng nhập
    }
  
    alert('Thanh toán thành công!');
    localStorage.removeItem('cart'); // Xóa giỏ hàng sau khi thanh toán
    updateCartCount(); // Cập nhật số lượng sản phẩm
    displayCart();
  }


  
  // Tải giỏ hàng khi trang được mở
window.onload = function () {
    displayCart();
    updateCartCount(); // Cập nhật số lượng sản phẩm khi tải trang
};

