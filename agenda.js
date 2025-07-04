// Calendar navigation functions
function previousMonth() {
    showNotification('Menampilkan agenda bulan sebelumnya...', 'info');
}

function nextMonth() {
    showNotification('Menampilkan agenda bulan berikutnya...', 'info');
}

function currentMonth() {
    showNotification('Kembali ke bulan ini', 'info');
}

// Category filter functionality
document.querySelectorAll('.category-filter').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-secondary');
        });
        
        // Add active class to clicked button
        this.classList.remove('btn-secondary');
        this.classList.add('btn-primary');
        
        const category = this.getAttribute('data-category');
        showNotification(`Menampilkan kegiatan kategori: ${category === 'all' ? 'Semua' : category}`, 'info');
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Usulan kegiatan berhasil dikirim! Tim kami akan meninjau usulan Anda.', 'success');
    this.reset();
});