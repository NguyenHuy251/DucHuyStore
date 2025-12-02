// Cơ sở dữ liệu tin tức
const newsDatabase = [
    {
        id: 1,
        title: "Mẹo dùng quạt điện mát như điều hòa",
        description: "Với một số mẹo nhỏ, quạt điện sẽ làm mát phòng nhanh và mạnh như điều hòa, đặc biệt hữu ích trong ngày nắng nóng.",
        image: "https://i1-giadinh.vnecdn.net/2023/06/10/quat33-1686384087-6994-1686385266.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=fVvzXkcFLWEk4VPGO2RGUA",
        category: "tips",
        categoryLabel: "Mẹo hay",
        author: "Nguyễn Văn A",
        date: "15/11/2024",
        views: 1250,
        comments: 45,
        readTime: "5 phút"
    },
    {
        id: 2,
        title: "Khác biệt giữa quạt hơi nước và quạt điều hòa",
        description: "Hai loại quạt có cơ chế hoạt động không giống nhau nên hiệu quả làm mát, giá bán và trải nghiệm sử dụng khác biệt.",
        image: "https://i1-sohoa.vnecdn.net/2023/05/17/top-1684258810-4869-1684258834.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=ms39de9tGRTzyUNXe7YlTQ",
        category: "review",
        categoryLabel: "Đánh giá",
        author: "Trần Thị B",
        date: "12/11/2024",
        views: 980,
        comments: 30,
        readTime: "7 phút"
    },
    {
        id: 3,
        title: "Video 'làm sạch cánh quạt mà không cần tháo khung' gây tranh cãi",
        description: "Tài khoản Yueliang trên Baidu đăng video làm sạch cánh quạt bằng dung dịch muối, baking soda và dấm được chia sẻ mạnh trên mạng xã hội.",
        image: "https://i1-sohoa.vnecdn.net/2019/11/01/thu-thuat-don-gian-de-ve-sinh-quat-dien-1572575833.jpg?w=500&h=300&q=100&dpr=2&fit=crop&s=1jlr2_hjTJPjJPFgkiOgPA",
        category: "guide",
        categoryLabel: "Hướng dẫn",
        author: "Lê Văn C",
        date: "08/11/2024",
        views: 2100,
        comments: 77,
        readTime: "4 phút"
    },
    {
        id: 4,
        title: "Công nghệ DC Motor trên quạt trần hiện đại",
        description: "DC Motor giúp tiết kiệm điện năng lên đến 70% so với motor thông thường, đồng thời hoạt động êm ái và bền bỉ hơn.",
        image: "https://luxuryfan.vn/wp-content/uploads/2025/04/dong-co-quat-tran-min-1.jpeg",
        category: "tech",
        categoryLabel: "Công nghệ",
        author: "Phạm Minh D",
        date: "05/11/2024",
        views: 1560,
        comments: 52,
        readTime: "6 phút"
    },
    {
        id: 5,
        title: "Top 5 quạt trần đáng mua nhất năm 2024",
        description: "Tổng hợp những mẫu quạt trần được người dùng đánh giá cao nhất về chất lượng, thiết kế và giá cả phù hợp.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW59nblkL7SPVHo1hIw3KJ5KYhNHIhlSsF_Q&s",
        category: "review",
        categoryLabel: "Đánh giá",
        author: "Hoàng Thị E",
        date: "01/11/2024",
        views: 3200,
        comments: 120,
        readTime: "8 phút"
    },
    {
        id: 6,
        title: "Cách chọn quạt phù hợp với diện tích phòng",
        description: "Hướng dẫn chi tiết cách chọn công suất và kích thước quạt phù hợp với từng loại phòng để đạt hiệu quả làm mát tốt nhất.",
        image: "https://quattranitalia.vn/storage/photos/21/kich-thuoc-quat-tran-1.webp",
        category: "guide",
        categoryLabel: "Hướng dẫn",
        author: "Đỗ Văn F",
        date: "28/10/2024",
        views: 1450,
        comments: 38,
        readTime: "5 phút"
    },
    {
        id: 7,
        title: "Mẹo tiết kiệm điện khi sử dụng quạt mùa hè",
        description: "Những thủ thuật đơn giản giúp bạn sử dụng quạt hiệu quả mà vẫn tiết kiệm điện năng đáng kể trong mùa nóng.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCf2wm_B5I5bH9Uze3s0V3ZVhHjmBYzQdi4w&s",
        category: "tips",
        categoryLabel: "Mẹo hay",
        author: "Vũ Thị G",
        date: "25/10/2024",
        views: 1890,
        comments: 64,
        readTime: "4 phút"
    },
    {
        id: 8,
        title: "Quạt thông minh IoT - Xu hướng tương lai",
        description: "Tìm hiểu về công nghệ quạt thông minh có thể điều khiển từ xa qua smartphone và tích hợp với hệ sinh thái nhà thông minh.",
        image: "https://roman.vn/pic/News/images/nha-thong-minh.png",
        category: "tech",
        categoryLabel: "Công nghệ",
        author: "Ngô Minh H",
        date: "20/10/2024",
        views: 2340,
        comments: 85,
        readTime: "7 phút"
    },
    {
        id: 9,
        title: "Bảo dưỡng quạt định kỳ - Bí quyết kéo dài tuổi thọ",
        description: "Hướng dẫn chi tiết quy trình bảo dưỡng quạt tại nhà giúp thiết bị hoạt động bền bỉ và hiệu quả trong nhiều năm.",
        image: "https://luxuryfan.vn/wp-content/uploads/2025/03/cach-chinh-quat-tran-bi-lac-6.jpg",
        category: "guide",
        categoryLabel: "Hướng dẫn",
        author: "Bùi Văn I",
        date: "15/10/2024",
        views: 1670,
        comments: 41,
        readTime: "6 phút"
    }
];

// Biến toàn cục
let currentPage = 1;
let itemsPerPage = 6;
let currentCategory = 'all';
let currentSearchQuery = '';

// Lọc tin tức theo danh mục
function filterNews(category) {
    currentCategory = category;
    currentPage = 1;
    
    // Cập nhật active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    displayNews();
}

// Tìm kiếm tin tức
function searchNews() {
    const searchInput = document.getElementById('news-search-input');
    currentSearchQuery = searchInput.value.toLowerCase().trim();
    currentPage = 1;
    displayNews();
}

// Lấy tin tức đã lọc
function getFilteredNews() {
    let filtered = newsDatabase;
    
    // Lọc theo danh mục
    if (currentCategory !== 'all') {
        filtered = filtered.filter(news => news.category === currentCategory);
    }
    
    // Lọc theo tìm kiếm
    if (currentSearchQuery) {
        filtered = filtered.filter(news => 
            news.title.toLowerCase().includes(currentSearchQuery) ||
            news.description.toLowerCase().includes(currentSearchQuery) ||
            news.categoryLabel.toLowerCase().includes(currentSearchQuery)
        );
    }
    
    return filtered;
}

// Hiển thị tin tức
function displayNews() {
    const newsContainer = document.getElementById('news-container');
    const filtered = getFilteredNews();
    
    // Tính toán pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageNews = filtered.slice(startIndex, endIndex);
    
    // Kiểm tra không có kết quả
    if (pageNews.length === 0) {
        newsContainer.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-newspaper"></i>
                <h3>Không tìm thấy tin tức</h3>
                <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
        `;
        document.getElementById('news-pagination').innerHTML = '';
        return;
    }
    
    // Hiển thị tin tức
    newsContainer.innerHTML = pageNews.map(news => `
        <article class="news-card" onclick="viewNewsDetail(${news.id})">
            <div class="news-card-image">
                <img src="${news.image}" alt="${news.title}" loading="lazy">
                <span class="news-badge">${news.categoryLabel}</span>
            </div>
            <div class="news-card-content">
                <h2 class="news-card-title">${news.title}</h2>
                <p class="news-card-description">${news.description}</p>
                <div class="news-card-meta">
                    <div class="meta-left">
                        <span class="meta-item">
                            <i class="fa-solid fa-user"></i>
                            ${news.author}
                        </span>
                        <span class="meta-item">
                            <i class="fa-solid fa-calendar"></i>
                            ${news.date}
                        </span>
                    </div>
                    <div class="meta-right">
                        <span class="meta-item">
                            <i class="fa-solid fa-eye"></i>
                            ${news.views.toLocaleString('vi-VN')}
                        </span>
                        <span class="meta-item">
                            <i class="fa-solid fa-comment"></i>
                            ${news.comments}
                        </span>
                        <span class="meta-item">
                            <i class="fa-solid fa-clock"></i>
                            ${news.readTime}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    `).join('');
    
    // Hiển thị pagination
    displayPagination(totalPages);
}

// Hiển thị pagination
function displayPagination(totalPages) {
    const paginationContainer = document.getElementById('news-pagination');
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Nút trang trước
    paginationHTML += `
        <button class="pagination-btn ${currentPage === 1 ? 'disabled' : ''}" 
                onclick="changePage(${currentPage - 1})" 
                ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    `;
    
    // Số trang
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                        onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
    }
    
    // Nút trang tiếp theo
    paginationHTML += `
        <button class="pagination-btn ${currentPage === totalPages ? 'disabled' : ''}" 
                onclick="changePage(${currentPage + 1})"
                ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="fa-solid fa-chevron-right"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// Chuyển trang
function changePage(page) {
    const filtered = getFilteredNews();
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayNews();
    
    // Cuộn lên đầu trang tin tức
    document.querySelector('.news-section').scrollIntoView({ behavior: 'smooth' });
}

// Xem chi tiết tin tức
function viewNewsDetail(newsId) {
    const news = newsDatabase.find(n => n.id === newsId);
    if (!news) return;
    
    // Hiển thị modal chi tiết tin tức
    const modal = document.createElement('div');
    modal.className = 'news-detail-modal';
    modal.innerHTML = `
        <div class="news-detail-content">
            <button class="close-modal-btn" onclick="this.closest('.news-detail-modal').remove()">
                <i class="fa-solid fa-times"></i>
            </button>
            <div class="news-detail-header">
                <span class="news-detail-badge">${news.categoryLabel}</span>
                <h1>${news.title}</h1>
                <div class="news-detail-meta">
                    <span><i class="fa-solid fa-user"></i> ${news.author}</span>
                    <span><i class="fa-solid fa-calendar"></i> ${news.date}</span>
                    <span><i class="fa-solid fa-eye"></i> ${news.views.toLocaleString('vi-VN')}</span>
                    <span><i class="fa-solid fa-comment"></i> ${news.comments}</span>
                    <span><i class="fa-solid fa-clock"></i> ${news.readTime}</span>
                </div>
            </div>
            <img src="${news.image}" alt="${news.title}" class="news-detail-image">
            <div class="news-detail-body">
                <p>${news.description}</p>
                <p>Nội dung chi tiết của bài viết sẽ được hiển thị tại đây. Đây là phần mô phỏng nội dung đầy đủ của tin tức.</p>
                <p>Bạn có thể thêm nhiều đoạn văn, hình ảnh, video và các nội dung khác vào đây để tạo thành một bài viết hoàn chỉnh.</p>
            </div>
            <div class="news-detail-footer">
                <button class="share-btn" onclick="shareNews(${newsId})">
                    <i class="fa-solid fa-share-nodes"></i> Chia sẻ
                </button>
                <button class="like-btn" onclick="likeNews(${newsId})">
                    <i class="fa-solid fa-heart"></i> Thích
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

// Chia sẻ tin tức
function shareNews(newsId) {
    alert('Chức năng chia sẻ đang được phát triển!');
}

// Thích tin tức
function likeNews(newsId) {
    alert('Cảm ơn bạn đã thích bài viết này!');
}

// Khởi tạo khi trang load
window.addEventListener('DOMContentLoaded', function() {
    displayNews();
});
