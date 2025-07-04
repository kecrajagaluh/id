// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Validate required fields
    const requiredFields = ['nama_lengkap', 'telepon', 'alamat', 'jenis_pengaduan', 'judul', 'detail'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            isValid = false;
            const input = this.querySelector(`[name="${field}"]`);
            input.style.borderColor = '#ef4444';
            input.addEventListener('input', function() {
                this.style.borderColor = '#e5e7eb';
            });
        }
    });
    
    if (!isValid) {
        showNotification('Mohon lengkapi semua field yang wajib diisi.', 'error');
        return;
    }
    
    // Generate ticket number
    const ticketNumber = 'RJG-' + Date.now().toString().slice(-8);
    
    // Show success message
    showNotification(`Pengaduan berhasil dikirim! Nomor tiket: ${ticketNumber}. Kami akan menindaklanjuti dalam 1x24 jam.`, 'success');
    
    // Reset form
    this.reset();
    
    // Remove any error styling
    this.querySelectorAll('input, select, textarea').forEach(field => {
        field.style.borderColor = '#e5e7eb';
    });
});

// Phone number validation
document.querySelector('input[name="telepon"]').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 0 && !value.startsWith('0') && !value.startsWith('62')) {
        value = '0' + value;
    }
    this.value = value;
});

// NIK validation
document.querySelector('input[name="nik"]').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 16);
});