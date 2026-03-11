// Main JavaScript for Leave Management System

document.addEventListener('DOMContentLoaded', function() {
    // Auto-dismiss flash messages after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    });

    // Close alert buttons
    document.querySelectorAll('.close-alert').forEach(btn => {
        btn.addEventListener('click', function() {
            const alert = this.closest('.alert');
            alert.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => alert.remove(), 300);
        });
    });

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });

    // Remove error class on input
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });
});

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    input.error,
    select.error,
    textarea.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Notification function
function showNotification(message, type = 'info') {
    const container = document.querySelector('.flash-messages') || createFlashContainer();

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;

    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';

    alert.innerHTML = `
        <i class="fas ${icon}"></i>
        ${message}
        <button class="close-alert">&times;</button>
    `;

    container.appendChild(alert);

    // Auto dismiss
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    }, 5000);

    // Close button
    alert.querySelector('.close-alert').addEventListener('click', function() {
        alert.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => alert.remove(), 300);
    });
}

function createFlashContainer() {
    const container = document.createElement('div');
    container.className = 'flash-messages';
    document.querySelector('.main-content').prepend(container);
    return container;
}

// Confirm delete/cancel actions
function confirmAction(message) {
    return confirm(message);
}

// Date formatting helper
function formatDate(dateString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

// Calculate days between dates
function calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show-mobile');
}

// Loading state for buttons
function setLoading(button, loading = true) {
    if (loading) {
        button.disabled = true;
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText;
    }
}

// AJAX helper for future API calls
async function apiRequest(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API Error:', error);
        showNotification('An error occurred. Please try again.', 'error');
        throw error;
    }
}

// Export functions for use in templates
window.LeavePortal = {
    showNotification,
    confirmAction,
    formatDate,
    calculateDays,
    setLoading,
    apiRequest
};
