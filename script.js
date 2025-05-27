// Current language
let currentLang = 'ru';

// Messages in different languages
const messages = {
    en: {
        success: 'Thank you for your donation of $%amount%! The animals appreciate your support.',
        error: 'Please enter a valid donation amount.'
    },
    ru: {
        success: 'Спасибо за ваше пожертвование в размере $%amount%! Животные ценят вашу поддержку.',
        error: 'Пожалуйста, введите корректную сумму пожертвования.'
    }
};

// Switch language function
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update active button state
    document.getElementById('en-btn').setAttribute('aria-pressed', lang === 'en');
    document.getElementById('ru-btn').setAttribute('aria-pressed', lang === 'ru');
    
    // Update document language
    document.documentElement.lang = lang;
    
    // Update all elements with data-en and data-ru attributes
    document.querySelectorAll('[data-' + lang + ']').forEach(element => {
        element.textContent = element.getAttribute('data-' + lang);
    });
}

// Process donation with multilingual support
function processDonation() {
    const amountInput = document.getElementById('amount');
    const messageDiv = document.getElementById('message');
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        messageDiv.textContent = messages[currentLang].error;
        messageDiv.style.color = 'red';
        return;
    }

    messageDiv.textContent = messages[currentLang].success.replace('%amount%', amount.toFixed(2));
    messageDiv.style.color = 'green';
    
    // Reset the amount to default
    amountInput.value = '10';
}

// Handle smooth scrolling for navigation links
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 44;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Handle active navigation state
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = link.getAttribute('href').slice(1) === currentSection ? '1' : '0.8';
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Set initial language and active nav link
document.addEventListener('DOMContentLoaded', () => {
    switchLanguage('ru');
    updateActiveNavLink();
}); 