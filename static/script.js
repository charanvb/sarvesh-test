/* JavaScript for CI/CD Demo App */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips and popovers (Bootstrap 5)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add active class to current nav item
    setActiveNavItem();

    // Animate feature cards on page load
    animateFeatureCards();

    // Fetch and display health status
    updateHealthStatus();
});

/**
 * Set active class on navigation items based on current page
 */
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

/**
 * Animate feature cards
 */
function animateFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Fetch and display health status
 */
function updateHealthStatus() {
    const healthElement = document.querySelector('.status-badge');
    if (healthElement) {
        fetch('/health')
            .then(response => response.json())
            .then(data => {
                // Status is fetched successfully
                updateStatusDisplay(data);
            })
            .catch(error => {
                console.warn('Health check:', error);
            });
    }
}

/**
 * Update status display
 */
function updateStatusDisplay(data) {
    const statusElement = document.querySelector('.status-badge');
    if (statusElement && data.status === 'healthy') {
        statusElement.innerHTML = `
            <span class="badge bg-success fs-6">
                <i class="fas fa-check-circle"></i> Healthy
            </span>
        `;
    }
}

/**
 * Fetch API status
 */
async function fetchApiStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        console.log('API Status:', data);
        return data;
    } catch (error) {
        console.error('Error fetching API status:', error);
    }
}

/**
 * Format timestamp
 */
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show toast notification
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy', 'error');
    });
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info') {
    const toastHtml = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = toastHtml;
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    setTimeout(() => {
        toastContainer.remove();
    }, 3000);
}

/**
 * Request animation frame polyfill
 */
console.log('CI/CD Demo App loaded successfully');
