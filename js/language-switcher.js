// js/language-switcher.js
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    updatePageLanguage();
}

function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    updateLanguageButton();
    updateCommandLinks(); // <-- الدالة الجديدة التي أضفناها
    saveLanguagePreference();
}

function updateLanguageButton() {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = translations[currentLang]['langBtn'];
    }
}

// === هذا هو الجزء الجديد والمهم ===
function updateCommandLinks() {
    const commandLinks = document.querySelectorAll('[data-command-link]');
    commandLinks.forEach(link => {
        const commandName = link.getAttribute('data-command-link');
        if (currentLang === 'ar') {
            link.href = `commands/${commandName}-ar.html`;
        } else {
            link.href = `commands/${commandName}.html`;
        }
    });
}
// =================================

function saveLanguagePreference() {
    localStorage.setItem('borham-tools-lang', currentLang);
}

function loadLanguagePreference() {
    const savedLang = localStorage.getItem('borham-tools-lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
        currentLang = savedLang;
    } else {
        const browserLang = navigator.language || navigator.userLanguage;
        currentLang = browserLang.startsWith('ar') ? 'ar' : 'en';
    }
    updatePageLanguage();
}

document.addEventListener('DOMContentLoaded', loadLanguagePreference);
