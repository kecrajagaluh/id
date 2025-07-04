// Service titles mapping
const serviceTitles = {
    'surat-usaha': 'Surat Keterangan Usaha',
    'sktm': 'Surat Keterangan Tidak Mampu',
    'imb': 'Izin Mendirikan Bangunan',
    'skkb': 'Surat Keterangan Kelakuan Baik',
    'nikah': 'Pengantar Nikah',
    'legalisir': 'Legalisir Dokumen'
};

// Open service modal
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = serviceTitles[serviceType] || 'Ajukan Layanan';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close service modal
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('serviceModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeServiceModal();
    }
});

// Form submission handler
document.getElementById('pengajuan-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    showNotification('Pengajuan Anda telah dikirim! Tim kami akan menghubungi Anda dalam 1x24 jam.', 'success');
    
    // Reset form
    this.reset();
});