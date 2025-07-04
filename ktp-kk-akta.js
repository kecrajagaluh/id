// Service titles mapping
const serviceTitles = {
    'ktp': 'Pengantar KTP (Kartu Tanda Penduduk)',
    'kk': 'Pengantar KK (Kartu Keluarga)',
    'akta': 'Pengantar Akta (Kelahiran/Kematian/Perceraian)'
};

// Open service modal
function openServiceModal(serviceType) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    
    modalTitle.textContent = serviceTitles[serviceType] || 'Ajukan Pengantar';
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

// Requirements data
const requirements = {
    'ktp_baru': ['Surat pengantar dari RT/RW', 'Fotokopi Kartu Keluarga', 'Fotokopi akta kelahiran', 'Pas foto 4x6 (2 lembar)', 'Surat keterangan sekolah (jika masih sekolah)'],
    'ktp_perpanjangan': ['KTP lama (asli dan fotokopi)', 'Fotokopi Kartu Keluarga', 'Pas foto 4x6 (2 lembar)', 'Surat pengantar dari RT/RW'],
    'ktp_penggantian': ['Surat kehilangan dari Polsek (jika hilang)', 'KTP lama (jika rusak/perubahan data)', 'Fotokopi Kartu Keluarga', 'Pas foto 4x6 (2 lembar)', 'Surat pengantar dari RT/RW', 'Dokumen pendukung perubahan data'],
    'kk_baru': ['Surat pengantar dari RT/RW', 'Surat nikah/cerai (jika ada)', 'KK lama (untuk pisah KK)', 'KTP semua anggota keluarga', 'Akta kelahiran anak-anak', 'Surat keterangan pindah (jika dari luar daerah)'],
    'kk_perubahan': ['KK asli yang akan diubah', 'KTP kepala keluarga', 'Dokumen pendukung perubahan', 'Akta kelahiran (untuk penambahan anak)', 'Surat nikah (untuk penambahan istri/suami)', 'Surat pengantar dari RT/RW'],
    'kk_penggantian': ['Surat kehilangan dari Polsek (jika hilang)', 'KK lama (jika rusak)', 'KTP kepala keluarga', 'KTP semua anggota keluarga', 'Surat pengantar dari RT/RW'],
    'akta_kelahiran': ['Surat keterangan lahir dari dokter/bidan', 'KTP dan KK orang tua', 'Surat nikah orang tua', 'Surat pengantar dari RT/RW', '2 orang saksi (KTP dan KK)'],
    'akta_kematian': ['Surat keterangan kematian dari dokter', 'KTP dan KK almarhum', 'KTP pelapor', 'Surat pengantar dari RT/RW', '2 orang saksi (KTP dan KK)'],
    'akta_perceraian': ['Putusan pengadilan yang berkekuatan hukum tetap', 'KTP dan KK kedua belah pihak', 'Akta nikah asli', 'Surat pengantar dari RT/RW', '2 orang saksi (KTP dan KK)']
};

function showRequirements(jenis) {
    const display = document.getElementById('requirements-display');
    const content = document.getElementById('requirements-content');
    
    if (jenis && requirements[jenis]) {
        const reqs = requirements[jenis];
        content.innerHTML = '<ul style="margin: 0; line-height: 1.8;">' + 
            reqs.map(req => `<li><i class="fas fa-check" style="color: var(--primary-color); margin-right: 8px;"></i>${req}</li>`).join('') + 
            '</ul>';
        display.style.display = 'block';
    } else {
        display.style.display = 'none';
    }
}

// Form submission
document.getElementById('pengantar-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Pengajuan surat pengantar berhasil dikirim! Silakan datang ke kantor kecamatan dengan dokumen asli.', 'success');
    this.reset();
    document.getElementById('requirements-display').style.display = 'none';
});