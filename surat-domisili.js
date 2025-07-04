// Form submission
document.getElementById('domisili-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Pengajuan surat domisili berhasil dikirim! Kami akan menghubungi Anda untuk konfirmasi.', 'success');
    this.reset();
});

// FAQ toggle function
function toggleFAQ(element) {
    const content = element.querySelector('div:last-child');
    const icon = element.querySelector('i');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    }
}