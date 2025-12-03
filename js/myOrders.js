// Quản lý đơn hàng của khách hàng

// Hiển thị danh sách đơn hàng của khách hàng hiện tại
function loadMyOrders() {
    const username = localStorage.getItem('username');
    if (!username) {
        document.getElementById('myOrdersList').innerHTML = '<p style="text-align: center; padding: 20px;">Vui lòng đăng nhập để xem đơn hàng!</p>';
        return;
    }

    // Lấy tất cả đơn hàng và lọc theo username
    const allOrders = JSON.parse(localStorage.getItem('salesOrders')) || [];
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    
    // Tìm thông tin tài khoản
    const account = accounts.find(acc => acc.username === username);
    if (!account) {
        document.getElementById('myOrdersList').innerHTML = '<p style="text-align: center; padding: 20px;">Không tìm thấy thông tin tài khoản!</p>';
        return;
    }

    // Lọc đơn hàng của khách hàng này (ưu tiên theo username, sau đó email/phone)
    const myOrders = allOrders.filter(order => {
        // Nếu đơn hàng có username field, so sánh trực tiếp
        if (order.username) {
            return order.username === username;
        }
        // Fallback: so sánh theo thông tin khác
        return order.customerName === account.displayName || 
               order.customerPhone === account.phone ||
               (order.customerId && order.customerId.includes(account.email));
    });

    if (myOrders.length === 0) {
        document.getElementById('myOrdersList').innerHTML = '<p style="text-align: center; padding: 20px;">Bạn chưa có đơn hàng nào!</p>';
        return;
    }

    // Sắp xếp đơn hàng theo ngày mới nhất
    myOrders.sort((a, b) => {
        const dateA = new Date(a.orderDate || a.date);
        const dateB = new Date(b.orderDate || b.date);
        return dateB - dateA;
    });

    // Render danh sách đơn hàng
    let html = '';
    myOrders.forEach((order, index) => {
        const orderDate = order.orderDate || order.date || '';
        const totalAmount = order.totalAmount || order.total || 0;
        const products = order.products || [];
        
        let statusClass = 'status-pending';
        let statusText = 'Chờ xử lý';
        let canCancel = order.status === 'pending';
        
        if (order.status === 'processing') {
            statusClass = 'status-processing';
            statusText = 'Đang xử lý';
            canCancel = false;
        } else if (order.status === 'shipping') {
            statusClass = 'status-shipping';
            statusText = 'Đang giao';
            canCancel = false;
        } else if (order.status === 'completed') {
            statusClass = 'status-completed';
            statusText = 'Hoàn thành';
            canCancel = false;
        } else if (order.status === 'cancelled') {
            statusClass = 'status-cancelled';
            statusText = 'Đã hủy';
            canCancel = false;
        }

        html += `
            <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: white;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                    <div>
                        <h3 style="margin: 0; color: #2c5f2d;">Mã đơn: ${order.id}</h3>
                        <p style="margin: 5px 0; color: #666;">Ngày đặt: ${orderDate}</p>
                    </div>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <h4 style="margin: 10px 0; color: #333;">Sản phẩm:</h4>
        `;

        if (products.length > 0) {
            products.forEach(product => {
                html += `
                    <div style="display: flex; justify-content: space-between; padding: 8px; background: #f9f9f9; margin-bottom: 5px; border-radius: 4px;">
                        <span>${product.productName}</span>
                        <span>x${product.quantity} - ${product.total.toLocaleString('vi-VN')}đ</span>
                    </div>
                `;
            });
        } else {
            // Old format - single product
            const productName = order.productName || 'N/A';
            const quantity = order.quantity || 1;
            html += `
                <div style="display: flex; justify-content: space-between; padding: 8px; background: #f9f9f9; margin-bottom: 5px; border-radius: 4px;">
                    <span>${productName}</span>
                    <span>x${quantity} - ${totalAmount.toLocaleString('vi-VN')}đ</span>
                </div>
            `;
        }

        html += `
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 2px solid #f0f0f0;">
                    <div>
                        <strong style="font-size: 18px; color: #2c5f2d;">Tổng tiền: ${totalAmount.toLocaleString('vi-VN')}đ</strong>
                        ${order.notes ? `<p style="margin: 5px 0; color: #666; font-size: 14px;">Ghi chú: ${order.notes}</p>` : ''}
                    </div>
                    <div>
                        ${canCancel ? `<button onclick="cancelMyOrder('${order.id}')" style="padding: 8px 15px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">
                            <i class="fa-solid fa-times"></i> Hủy đơn
                        </button>` : ''}
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('myOrdersList').innerHTML = html;
}

// Hủy đơn hàng
function cancelMyOrder(orderId) {
    if (!confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
        return;
    }

    const allOrders = JSON.parse(localStorage.getItem('salesOrders')) || [];
    const orderIndex = allOrders.findIndex(order => order.id === orderId);

    if (orderIndex === -1) {
        alert('Không tìm thấy đơn hàng!');
        return;
    }

    const order = allOrders[orderIndex];
    
    // Chỉ cho phép hủy đơn hàng đang chờ xử lý
    if (order.status !== 'pending') {
        alert('Chỉ có thể hủy đơn hàng đang chờ xử lý!');
        return;
    }

    // Cập nhật trạng thái đơn hàng
    allOrders[orderIndex].status = 'cancelled';
    allOrders[orderIndex].notes = (allOrders[orderIndex].notes || '') + ' [Khách hàng hủy đơn]';

    // Lưu lại
    localStorage.setItem('salesOrders', JSON.stringify(allOrders));
    
    // Dispatch event để cập nhật admin nếu đang mở
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'salesOrders',
        newValue: JSON.stringify(allOrders)
    }));

    alert('Đã hủy đơn hàng thành công!');
    
    // Reload lại danh sách
    loadMyOrders();
}

// Load orders khi mở modal
document.addEventListener('DOMContentLoaded', function() {
    // Thêm event listener cho modal my orders
    const modalMyOrders = document.getElementById('modal-myorders');
    if (modalMyOrders) {
        // Sử dụng MutationObserver để detect khi modal được hiển thị
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'style') {
                    const display = window.getComputedStyle(modalMyOrders).display;
                    if (display !== 'none') {
                        loadMyOrders();
                    }
                }
            });
        });
        
        observer.observe(modalMyOrders, { attributes: true });
    }
});
