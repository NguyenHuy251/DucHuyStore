// Cơ sở dữ liệu sản phẩm
const productsData = [
    {name: "Quạt trần điện cơ 91 QT1400", price: 820000, image: "https://st.meta.vn/Data/image/2021/07/19/quat-tran-dien-co-91-qt1400-a.jpg", category: "quat-tran"},
    {name: "Quạt trần thông minh", price: 3500000, image: "https://www.crompton.co.in/cdn/shop/files/SilentproBlossomsmart_Denimblue_1_angle_1.png?v=1702372703", category: "quat-tran"},
    {name: "Quạt trần Venus", price: 4000000, image: "https://www.venushomeappliances.com/storage/app/product_type/20210107063528adorana-product.png", category: "quat-tran"},
    {name: "Quạt trần trang trí 5 cánh", price: 2000000, image: "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lmix0nh0asin74.webp", category: "quat-tran"},
    {name: "Quạt đèn ốp trần", price: 4000000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeLSbMGdTO1tBRccKLpwVj7WiqOjCNxH6DSE_eYTAKxR9dnePC13mkpWYqG6FuvOmyWME&usqp=CAU", category: "quat-tran"},
    {name: "Quạt trần treo mini", price: 900000, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiOd3Es0M4WO_4x503KRteRqEXnI2jWpNRyrlc9pO8Mr6SIg-yJcm4WfuC7bXgAddHkPU&usqp=CAU", category: "quat-tran"},
    {name: "Quạt đứng Senko LT1639", price: 850000, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSKD4sH1p3xaq_W2ty8mqJq_U4aK3tqu_ZiPxlEML5NuJe_MWsVcIDh94c7ir3KNFvxNXXUoi3cDnS_J32cpvekl0VIOGHFu8isauNB54pcnCYQLAQKP_kT9TCFne-Z9_ftOfznHw&usqp=CAc", category: "quat-dung"},
    {name: "Quạt đứng Toshiba F-LSA10", price: 1500000, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR9eXieYBg8JoG_9oOQlxLV9lxTn5LK2jM3t1vrOJQr0agqh9o3g3_WC2QJvvFu-eDzo0fF8hlPLY7fxeZ6-XNTtFUts9Qp79GpINJwBSB6eiRYiG3YCU6Hkl4Y4A20eolK2EE0Kjg&usqp=CAc", category: "quat-dung"},
    {name: "Quạt đứng Panasonic F-409UGO", price: 1800000, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQBpg3PKl4E-ZynY43jS3WQGolFjjF8EpyTdjrNFNT6t3h96HUYgsyId-5QGk8wrFmnhPp6Dk0SQbNaXkX3Un8XsZcCnMOm_cXM5-ioXsyrq44sD9deaLkA5A&usqp=CAc", category: "quat-dung"},
    {name: "Quạt đứng Mitsubishi R16A-RV", price: 2200000, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTQ7ERp6vZqiJof5W8lUrCdo2yLgMdeEkJd8AV3DjGjQVFZyiacboK1qSRbaF5Fq6lc2SWzCqQc7gt4ThS9Ow_iJ8XZxs1RjYYfBhoiwfIgNlUFTGQrZlvXlwvskRJT6-sVTtslMbo&usqp=CAc", category: "quat-dung"},
    {name: "Quạt bàn", price: 650000, image: "https://www.mitre10.com.au/media/catalog/category/thumbnail/desk-fan-mitre-10.jpg", category: "quat-ban"},
    {name: "Quạt bàn mini USB", price: 150000, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSTQKUKCPZTVKZ0ZyV_fyuaw5XSxkkw-jSiRp5mnE4b3AWCi-yRgsd7kmEVDySV_mL9nigwJtJZfZwrqv5VLomtVCPOc-ateG2Za4qmdlcZxnrIuUVz9cO4z7xFb3b68wzF1zkAXw&usqp=CAc", category: "quat-ban"},
    {name: "Quạt bàn Hatari HT-S14M3", price: 580000, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRRNZ6K40BhUmN-Xh_gqqICz_QjXAr-Zx2KxlHOhFFBMWvSkPZbDA3mIHo--Onqmdl-JDGfJWOCxg0mVS32m8UgY_Sj6U5rj3RI3YrX1yo&usqp=CAc", category: "quat-ban"},
    {name: "Quạt hơi nước Kangaroo", price: 1500000, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRbYY35W7Qerq1ToJl-pPVbLnYSQIyoQtYo4F0SLhBNd3excOPDbBEXKXlX8YvcuUQ9CMQFhsuEyOT7VYqh22L3gTueJUwl6ujqxMoI7wI5twZz_DkFcPylLD0U&usqp=CAc", category: "quat-hoi-nuoc"},
    {name: "Quạt điều hòa Sunhouse SHD7540", price: 2500000, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvFDOJlvoNBTkX5BIu065Yn6BLUkP0onmyLjqkxrjf-CRFDRzHywUa6HYhkBXFIVwzG8FENJEn6N1fwDGwKLOQW7MZwwTWTP1yhj3rb3tC2nCXgbUlkoiyIXlFLc4epuE6EELAMQY&usqp=CAc", category: "quat-hoi-nuoc"},
    {name: "Quạt hơi nước Asia ACF50-A10", price: 1800000, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSH_pUolIVJwZ503pEKs5CEBtXacze7b_Hs2JY77J06ocryWPoAYy1XYiT1FExZkMfOm3BRz9uaecgDT2Rk94K2b9Ju3BM4y9G2K_rOuxXPJHpqg6D4yzHdzQ3B0lndUKtIEdOd24I&usqp=CAc", category: "quat-hoi-nuoc"},
];

let currentCategory = 'all';
let currentSort = 'default';

// Hiển thị sản phẩm
function displayProducts() {
    const container = document.getElementById('productsContainer');
    const noProducts = document.getElementById('noProducts');
    
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
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
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
});
