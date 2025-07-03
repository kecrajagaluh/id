// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Dropdown menu functionality for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownMenu = this.nextElementSibling;
                const isVisible = dropdownMenu.style.display === 'block';
                
                // Hide all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
                
                // Toggle current dropdown
                dropdownMenu.style.display = isVisible ? 'none' : 'block';
                
                // Rotate arrow icon
                const arrow = this.querySelector('i');
                arrow.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });
    
    // Form validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc2626';
                    
                    // Remove error styling on input
                    field.addEventListener('input', function() {
                        this.style.borderColor = '#e5e7eb';
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Mohon lengkapi semua field yang wajib diisi.');
            }
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .news-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Search functionality (if search input exists)
    const searchInput = document.querySelector('#search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.searchable-item');
            
            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialize tooltips (if any)
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 10);
            
            this.addEventListener('mouseleave', function() {
                if (tooltip && tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            });
        });
    });

    // Handle service application buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn[href^="#form"]') || e.target.closest('.btn[href^="#form"]')) {
            e.preventDefault();
            const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
            const href = button.getAttribute('href');
            
            if (href) {
                const serviceType = href.replace('#form-', '').replace('#', '');
                showServiceForm(serviceType);
            }
        }
    });
});

// Service form handler
function showServiceForm(serviceType) {
    const formTitles = {
        'surat-usaha': 'Surat Keterangan Usaha',
        'sktm': 'Surat Keterangan Tidak Mampu',
        'imb': 'Izin Mendirikan Bangunan',
        'skkb': 'Surat Keterangan Kelakuan Baik',
        'nikah': 'Surat Pengantar Nikah',
        'legalisir': 'Legalisir Dokumen',
        'ktp': 'Pengantar KTP',
        'kk': 'Pengantar Kartu Keluarga',
        'akta': 'Pengantar Akta'
    };
    
    const title = formTitles[serviceType] || 'Layanan Administrasi';
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 2rem; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="color: var(--primary-color); margin: 0;">${title}</h2>
                <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light);">×</button>
            </div>
            
            <form style="display: grid; gap: 1rem;">
                <div class="form-group">
                    <label class="form-label">Nama Lengkap *</label>
                    <input type="text" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">NIK *</label>
                    <input type="text" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Alamat Lengkap *</label>
                    <textarea class="form-textarea" required></textarea>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Nomor Telepon *</label>
                    <input type="tel" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Keperluan *</label>
                    <textarea class="form-textarea" placeholder="Jelaskan keperluan Anda..." required></textarea>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                    <button type="button" onclick="this.closest('[style*=\"position: fixed\"]').remove()" class="btn btn-secondary">Batal</button>
                    <button type="submit" class="btn btn-primary">Kirim Permohonan</button>
                </div>
            </form>
        </div>
    `;
    
    // Handle form submission
    modal.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Permohonan Anda telah dikirim! Kami akan segera menghubungi Anda.', 'success');
        modal.remove();
    });
    
    document.body.appendChild(modal);
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Loading state utility
function setLoadingState(element, isLoading = true) {
    if (isLoading) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
        element.style.cursor = 'wait';
        
        if (!element.querySelector('.loading-spinner')) {
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            spinner.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: var(--primary-color);
                font-size: 1.5rem;
            `;
            element.style.position = 'relative';
            element.appendChild(spinner);
        }
    } else {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
        element.style.cursor = 'auto';
        
        const spinner = element.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}

// Report preview functionality
function previewReport(reportId) {
    const reportTitles = {
        '2023': 'Laporan Tahunan 2023',
        'keuangan-q4-2023': 'Laporan Keuangan Q4 2023',
        'demografi-2023': 'Data Demografi 2023'
    };
    
    const title = reportTitles[reportId] || 'Laporan';
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 2rem; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                <h2 style="color: var(--primary-color); margin: 0;">${title}</h2>
                <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light); padding: 0.5rem;">×</button>
            </div>
            
            <div style="text-align: center; padding: 3rem; background: var(--light-gray); border-radius: 8px; margin-bottom: 2rem;">
                <div style="width: 120px; height: 120px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: white; font-size: 3rem;">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Preview Laporan</h3>
                <p style="color: var(--text-light); margin-bottom: 2rem;">
                    Laporan ini berisi informasi lengkap mengenai pelaksanaan program kerja dan penggunaan anggaran. 
                    Untuk membaca laporan secara lengkap, silakan download file PDF.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button onclick="downloadReport('${reportId}')" class="btn btn-primary">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                    <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" class="btn btn-secondary">
                        Tutup
                    </button>
                </div>
            </div>
            
            <div style="background: white; border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem;">
                <h4 style="color: var(--primary-color); margin-bottom: 1rem;">Ringkasan Isi Laporan:</h4>
                <ul style="line-height: 1.8; color: var(--text-dark);">
                    <li>Realisasi program kerja tahun berjalan</li>
                    <li>Laporan penggunaan anggaran dan keuangan</li>
                    <li>Data statistik dan demografi wilayah</li>
                    <li>Evaluasi kinerja dan pencapaian target</li>
                    <li>Rencana dan strategi periode mendatang</li>
                </ul>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Report download functionality
function downloadReport(reportId) {
    const reportTitles = {
        '2023': 'Laporan Tahunan 2023',
        'keuangan-q4-2023': 'Laporan Keuangan Q4 2023',
        'demografi-2023': 'Data Demografi 2023'
    };
    
    const title = reportTitles[reportId] || 'Laporan';
    
    // Show download notification
    showNotification(`Memulai download ${title}...`, 'info');
    
    // Simulate download delay
    setTimeout(() => {
        showNotification(`Download ${title} selesai!`, 'success');
        
        // In a real implementation, you would trigger actual file download here
        // For now, we'll just show a success message
        console.log(`Downloading report: ${reportId}`);
    }, 2000);
}

// Filter functionality for agenda/news pages
function filterByCategory(category) {
    const items = document.querySelectorAll('.filterable-item');
    const buttons = document.querySelectorAll('.category-filter');
    
    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter items
    items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Initialize category filters
document.addEventListener('DOMContentLoaded', function() {
    // Set up category filter buttons
    const categoryButtons = document.querySelectorAll('.category-filter');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });
    
    // Set up news/agenda search
    const searchInput = document.querySelector('#search-input');
    const categoryFilter = document.querySelector('#category-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterContent();
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterContent();
        });
    }

    // Set up contact form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }
});

// Content filtering function
function filterContent() {
    const searchTerm = document.querySelector('#search-input')?.value.toLowerCase() || '';
    const categoryFilter = document.querySelector('#category-filter')?.value || '';
    const items = document.querySelectorAll('.searchable-item, .filterable-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const category = item.getAttribute('data-category') || '';
        
        const matchesSearch = searchTerm === '' || text.includes(searchTerm);
        const matchesCategory = categoryFilter === '' || category === categoryFilter;
        
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Contact form handler
function handleContactForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Show loading state
    setLoadingState(submitButton);
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    // Simulate form submission
    setTimeout(() => {
        // Reset loading state
        setLoadingState(submitButton, false);
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pengaduan/Saran';
        
        // Show success notification
        showNotification('Pengaduan/saran Anda telah berhasil dikirim! Kami akan menindaklanjuti dalam 1x24 jam.', 'success');
        
        // Reset form
        form.reset();
        
        // Log form data (in real implementation, this would be sent to server)
        console.log('Form submitted with data:', Object.fromEntries(formData));
    }, 2000);
}

// Social media link handlers
function openSocialMedia(platform) {
    const socialLinks = {
        'facebook': 'https://facebook.com/kecamatanrajagaluh',
        'instagram': 'https://instagram.com/kecamatanrajagaluh',
        'youtube': 'https://youtube.com/@kecamatanrajagaluh',
        'twitter': 'https://twitter.com/kecamatanrajagaluh'
    };
    
    const url = socialLinks[platform];
    if (url) {
        window.open(url, '_blank');
    } else {
        showNotification('Link media sosial akan segera tersedia', 'info');
    }
}

// Map integration
function openLocationMap() {
    const address = "Jl. Raya Rajagaluh No. 123, Kecamatan Rajagaluh, Kabupaten Majalengka, Jawa Barat";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://maps.google.com/maps?q=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
}

// Calendar navigation functions
let currentDate = new Date();

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendarDisplay();
    showNotification('Menampilkan bulan sebelumnya', 'info');
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendarDisplay();
    showNotification('Menampilkan bulan selanjutnya', 'info');
}

function currentMonth() {
    currentDate = new Date();
    updateCalendarDisplay();
    showNotification('Kembali ke bulan ini', 'info');
}

function updateCalendarDisplay() {
    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const monthTitle = document.querySelector('h2[style*="color: var(--primary-color)"]');
    if (monthTitle) {
        monthTitle.innerHTML = `<i class="fas fa-calendar-alt"></i> ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
}

// News and agenda interaction functions
function viewNewsDetail(newsId) {
    showNotification('Membuka detail berita...', 'info');
    // In real implementation, this would navigate to news detail page
    console.log('Viewing news:', newsId);
}

function registerForEvent(eventId) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 12px; padding: 2rem; max-width: 500px; width: 100%; max-height: 80vh; overflow-y: auto;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="color: var(--primary-color); margin: 0;">Daftar Kegiatan</h2>
                <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light);">×</button>
            </div>
            
            <form onsubmit="handleEventRegistration(event, '${eventId}')">
                <div class="form-group">
                    <label class="form-label">Nama Lengkap *</label>
                    <input type="text" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Nomor Telepon *</label>
                    <input type="tel" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input">
                </div>
                
                <div class="form-group">
                    <label class="form-label">Instansi/Organisasi</label>
                    <input type="text" class="form-input">
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem;">
                    <button type="button" onclick="this.closest('[style*=\"position: fixed\"]').remove()" class="btn btn-secondary">Batal</button>
                    <button type="submit" class="btn btn-primary">Daftar</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function handleEventRegistration(event, eventId) {
    event.preventDefault();
    const modal = event.target.closest('[style*="position: fixed"]');
    
    showNotification('Pendaftaran berhasil! Kami akan menghubungi Anda untuk konfirmasi.', 'success');
    modal.remove();
    
    console.log('Registered for event:', eventId);
}
