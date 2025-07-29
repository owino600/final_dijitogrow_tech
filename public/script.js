// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    
    // Update current year in footer
    updateFooterYear();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isOpen = mobileNav.classList.contains('active');
        
        if (isOpen) {
            mobileNav.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        } else {
            mobileNav.classList.add('active');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        }
    });
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileNav.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuBtn && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    // Handle all anchor links with smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px -4px rgba(30, 100, 170, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px -4px rgba(30, 100, 170, 0.1)';
        }
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create WhatsApp message
        const whatsappMessage = `Hi Dijitogrow! 

Name: ${name}
Email: ${email}
Message: ${message}

Looking forward to your response!`;
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show toast notification
        showToast('Message sent!', "We'll respond within 1 hour on WhatsApp.");
        
        // Reset form
        contactForm.reset();
    });
}

// Toast Notification Function
function showToast(title, description) {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    toast.classList.remove('hidden');
    
    // Hide toast after 5 seconds
    setTimeout(function() {
        toast.classList.add('hidden');
    }, 5000);
}

// Update Footer Year
function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        footerText.innerHTML = `&copy; ${currentYear} Dijitogrow Tech Solutions. All rights reserved. | Serving Businesses Across Kenya`;
    }
}

// Intersection Observer for Animation on Scroll
function initScrollAnimations() {
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
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initScrollAnimations, 500);
});

// WhatsApp Click Tracking (Optional Analytics)
function trackWhatsAppClick(source) {
    // Add analytics tracking here if needed
    console.log(`WhatsApp clicked from: ${source}`);
}

// Add click tracking to WhatsApp buttons
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const source = this.closest('section')?.id || 'unknown';
            trackWhatsAppClick(source);
        });
    });
});

// Performance Optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Add some interactive feedback for buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
        const closeIcon = mobileMenuBtn.querySelector('.close-icon');
        
        if (mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
        
        // Hide toast on escape
        const toast = document.getElementById('toast');
        if (!toast.classList.contains('hidden')) {
            toast.classList.add('hidden');
        }
    }
});

// Form validation enhancement
function enhanceFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error states
    field.classList.remove('error');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    // Add error state if invalid
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = 'var(--destructive)';
    } else {
        field.style.borderColor = 'var(--border)';
    }
    
    return isValid;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', enhanceFormValidation);