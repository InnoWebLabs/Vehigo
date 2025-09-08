/**
 * Enhanced Blog Page JavaScript
 * Provides modern interactions and functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced blog functionality
    initializeBlogEnhancements();
    initializeNavigation();
    initializeAnimations();
    initializeThemeSupport();
});

function initializeBlogEnhancements() {
    // Add loading animation completion
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all blog cards
    blogCards.forEach(card => {
        observer.observe(card);
    });
    
    // Enhanced hover effects
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle scale and glow effect
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(74, 144, 226, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
}

function initializeNavigation() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const blogList = document.querySelector('.blog-list');
    
    if (!leftArrow || !rightArrow || !blogList) return;
    
    // For mobile and small screens, hide arrows as we use grid layout
    function updateArrowVisibility() {
        const isMobile = window.innerWidth <= 768;
        leftArrow.style.display = isMobile ? 'none' : 'flex';
        rightArrow.style.display = isMobile ? 'none' : 'flex';
    }
    
    // Initial check
    updateArrowVisibility();
    
    // Update on resize
    window.addEventListener('resize', updateArrowVisibility);
    
    // Arrow click handlers for smooth scrolling (for larger screens)
    leftArrow.addEventListener('click', function() {
        blogList.scrollBy({
            left: -350,
            behavior: 'smooth'
        });
    });
    
    rightArrow.addEventListener('click', function() {
        blogList.scrollBy({
            left: 350,
            behavior: 'smooth'
        });
    });
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            leftArrow.click();
        } else if (e.key === 'ArrowRight') {
            rightArrow.click();
        }
    });
}

function initializeAnimations() {
    // Smooth scroll to blog section if hash is present
    if (window.location.hash === '#blog') {
        setTimeout(() => {
            document.querySelector('#blog').scrollIntoView({
                behavior: 'smooth'
            });
        }, 100);
    }
    
    // Add entrance animations
    const blogSection = document.querySelector('.section.blog');
    if (blogSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(blogSection);
    }
    
    // Parallax effect for blog section background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const blogSection = document.querySelector('.section.blog');
        if (blogSection) {
            const yPos = -(scrolled * 0.2);
            blogSection.style.backgroundPosition = `0 ${yPos}px`;
        }
    });
}

function initializeThemeSupport() {
    // Enhanced dark mode support
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            const blogSection = document.querySelector('.section.blog');
            const blogCards = document.querySelectorAll('.blog-card');
            
            if (this.checked) {
                // Dark mode
                blogSection?.classList.add('dark-mode');
                blogCards.forEach(card => card.classList.add('dark-mode'));
            } else {
                // Light mode
                blogSection?.classList.remove('dark-mode');
                blogCards.forEach(card => card.classList.remove('dark-mode'));
            }
        });
    }
}

// Utility functions
function addLoadingState() {
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    // Animate in with stagger
    blogCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Enhanced error handling
function handleImageLoadError() {
    const images = document.querySelectorAll('.blog-card img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'assets/images/placeholder-blog.jpg'; // Fallback image
            this.alt = 'Blog image not available';
        });
    });
}

// Initialize error handling
handleImageLoadError();

// Enhanced accessibility
function initializeAccessibility() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        // Add ARIA labels
        card.setAttribute('role', 'article');
        card.setAttribute('tabindex', '0');
        
        // Keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) link.click();
            }
        });
        
        // Focus management
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--carolina-blue)';
            this.style.outlineOffset = '4px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility features
initializeAccessibility();

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('.blog-card img');
    
    // Lazy loading for images below the fold
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize performance optimizations
optimizeImages();

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

initializeSmoothScrolling();