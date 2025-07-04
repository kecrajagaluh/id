// Preview report function
function previewReport(reportId) {
    showNotification(`Membuka preview laporan ${reportId}...`, 'info');
    // In a real implementation, this would open a modal or new tab with the report preview
}

// Download report function
function downloadReport(reportId) {
    showNotification(`Mengunduh laporan ${reportId}...`, 'success');
    // In a real implementation, this would trigger the actual file download
}

// Animate progress bars on page load
window.addEventListener('load', function() {
    // Progress bars are already animated via CSS transitions
    setTimeout(() => {
        showNotification('Dashboard kinerja telah dimuat', 'info');
    }, 2000);
});