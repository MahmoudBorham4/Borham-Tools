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
    updateCommandLinks();
    saveLanguagePreference();
    updateDateDisplay(); // إضافة تحديث التاريخ
}

function updateLanguageButton() {
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = translations[currentLang]['langBtn'];
    }
}

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

// دالة جديدة لتحديث التاريخ ديناميكياً
function updateDateDisplay() {
    const dateElement = document.querySelector('.last-update');
    if (dateElement) {
        // يمكنك استخدام التاريخ الحقيقي أو الترجمة الثابتة
        // الخيار 1: استخدام الترجمة الثابتة (يناير 2026)
        if (translations[currentLang] && translations[currentLang]['version.date']) {
            dateElement.textContent = translations[currentLang]['version.date'];
        }
        
        // الخيار 2: استخدام التاريخ الحقيقي (تعليق)
        /*
        const now = new Date();
        const monthNames = currentLang === 'ar' 
            ? ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
            : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        
        if (currentLang === 'ar') {
            // تحويل الأرقام إلى عربية
            const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
            const yearStr = year.toString();
            let arabicYear = '';
            for (let i = 0; i < yearStr.length; i++) {
                arabicYear += arabicNumbers[parseInt(yearStr[i])];
            }
            dateElement.textContent = `| ${month} ${arabicYear}`;
        } else {
            dateElement.textContent = `| ${month} ${year}`;
        }
        */
    }
}

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
