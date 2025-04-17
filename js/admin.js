document.addEventListener('DOMContentLoaded', function () {
    const addProductButton = document.getElementById('addProduct');
    const productForm = document.getElementById('productForm');
    
    if (addProductButton && productForm) {
        addProductButton.addEventListener('click', function () {
            productForm.style.display = productForm.style.display === 'none' || productForm.style.display === '' ? 'block' : 'none';
        });
    }

    const addNewsButton = document.getElementById('addNews');
    const newsForm = document.getElementById('newsForm');

    if (addNewsButton && newsForm) {
        addNewsButton.addEventListener('click', function () {
            newsForm.style.display = newsForm.style.display === 'none' || newsForm.style.display === '' ? 'block' : 'none';
        });
    }

});