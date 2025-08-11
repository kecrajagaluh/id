// Preview report function
function previewReport(reportId) {
    showNotification(`Membuka preview laporan ${reportId}...`, 'info');
    // In a real implementation, this would open a modal or new tab with the report preview
}

// Download report function
function downloadReport(reportId) {
    showNotification(`Mengunduh laporan ${reportId}...`, 'success');
    
    // Create a sample PDF download (placeholder implementation)
    const link = document.createElement('a');
    link.href = '#'; // In real implementation, this would be the actual file URL
    link.download = `laporan_${reportId}.pdf`;
    
    // For demonstration, we'll show that it's trying to download
    setTimeout(() => {
        showNotification(`Laporan ${reportId} siap diunduh. Dalam implementasi nyata, file PDF akan terunduh.`, 'info');
    }, 1000);
}

// Animate progress bars on page load
window.addEventListener('load', function() {
    // Progress bars are already animated via CSS transitions
    setTimeout(() => {
        showNotification('Dashboard kinerja telah dimuat', 'info');
    }, 2000);
});