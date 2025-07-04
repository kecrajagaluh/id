// Search functionality
document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const newsItems = document.querySelectorAll('.searchable-item');
    
    newsItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Category filter
document.getElementById('category-filter').addEventListener('change', function() {
    const selectedCategory = this.value;
    const newsItems = document.querySelectorAll('.searchable-item');
    
    newsItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedCategory === '' || itemCategory === selectedCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

// Load more functionality
document.getElementById('load-more-btn').addEventListener('click', function() {
    showNotification('Memuat berita terbaru...', 'info');
    
    // Simulate loading more content
    setTimeout(() => {
        showNotification('Semua berita telah dimuat.', 'success');
    }, 1500);
});

// Newsletter subscription
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        showNotification('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
        this.reset();
    }
});