// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Language Selection
const languageLinks = document.querySelectorAll('.languages a');

languageLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all links
        languageLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        link.classList.add('active');
        // Here you would typically handle language change
        // For now, we'll just show an alert
        alert(`Language changed to ${link.textContent}`);
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all language links
    const languageLinks = document.querySelectorAll('.languages a');
    
    // Add click event listeners to language links
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            languageLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get selected language
            const lang = this.getAttribute('data-lang');
            
            // Update content based on selected language
            updateContent(lang);
            
            // Save language preference
            localStorage.setItem('preferredLanguage', lang);
        });
    });
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        const langLink = document.querySelector(`.languages a[data-lang="${savedLang}"]`);
        if (langLink) {
            languageLinks.forEach(l => l.classList.remove('active'));
            langLink.classList.add('active');
            updateContent(savedLang);
        }
    }
});

// Function to update content based on selected language
function updateContent(lang) {
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update input placeholders
    const inputs = document.querySelectorAll('input[data-i18n-placeholder]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            input.placeholder = translations[lang][key];
        }
    });
    
    // Update textarea placeholders
    const textareas = document.querySelectorAll('textarea[data-i18n-placeholder]');
    textareas.forEach(textarea => {
        const key = textarea.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            textarea.placeholder = translations[lang][key];
        }
    });
} 