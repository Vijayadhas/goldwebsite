// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    // Get language links
    const languageLinks = document.querySelectorAll('.languages a');
    
    // Get hamburger and nav elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Set initial state for hamburger
    if (hamburger) {
        hamburger.style.transform = 'translateY(0)';
    }
    
    // Scroll event listener for hamburger menu visibility
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        if (!hamburger) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 60) {
            // Scrolling down and not at the top
            hamburger.style.transform = 'translateY(-100px)';
        } else if (scrollTop < lastScrollTop && scrollTop <= 70) {
            // Scrolling up and near the top (within 70px)
            hamburger.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Function to update content based on selected language
    function updateContent(lang) {
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const placeholderKey = element.getAttribute('data-i18n-placeholder');

            if (translations[lang]) {
                if (key && translations[lang][key]) {
                    if (element.tagName === 'INPUT' && element.type === 'submit') {
                        element.value = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                }
                if (placeholderKey && translations[lang][placeholderKey]) {
                    element.placeholder = translations[lang][placeholderKey];
                }
            }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('selectedLanguage', lang);
    }

    // Add click event listeners to language links
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            // Update active state for language links
            languageLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            updateContent(lang);
        });
    });

    // Hamburger menu functionality
    if (hamburger && navLinks) {
        console.log('Hamburger and NavLinks found.');
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Hamburger clicked!');
            console.log('Before toggle: navLinks active class - ', navLinks.classList.contains('active'));
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.classList.toggle('menu-open');
            console.log('After toggle: navLinks active class - ', navLinks.classList.contains('active'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Close menu when clicking on a link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }

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

    // Handle window resize - REMOVED: This logic interfered with mobile menu display

    // Set initial language and navigation active state on load
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    updateContent(savedLanguage);
    languageLinks.forEach(link => {
        if (link.getAttribute('data-lang') === savedLanguage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Set active class for navigation links
    const currentPath = window.location.pathname.split('/').pop(); // Get filename (e.g., index.html, about.html)
    console.log('Current Path:', currentPath);
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        const filename = href.split('/').pop();
        console.log('Nav Item href:', href, 'Filename:', filename);

        if (currentPath === filename || (currentPath === '' && filename === 'index.html')) {
            console.log('Activating:', item.textContent);
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// Add scroll event listener for hamburger menu visibility
let lastScrollTop = 0;
const hamburger = document.querySelector('.hamburger');

// Set initial state
if (hamburger) {
    hamburger.style.transform = 'translateY(0)';
}

window.addEventListener('scroll', () => {
    if (!hamburger) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down and not at the top
        hamburger.style.transform = 'translateY(-100px)';
    } else {
        // Scrolling up or at the top
        hamburger.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
}); 