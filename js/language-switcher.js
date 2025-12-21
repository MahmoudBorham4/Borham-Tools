// js/language-switcher.js
let currentLang = 'en'; // اللغة الافتراضية

// دالة تبديل اللغة
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    updatePageLanguage();
    updateLanguageButton();
    saveLanguagePreference();
}

// دالة تحديث جميع النصوص في الصفحة
function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang][key]) {
            // تحديث النص
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.value = translations[currentLang][key];
            } else if (element.tagName === 'IMG' && element.hasAttribute('alt')) {
                element.alt = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    
    // تحديث زر التحميل إذا كان موجودًا
    const downloadBtn = document.querySelector('.btn-primary[data-key="download.btn"]');
    if (downloadBtn && translations[currentLang]['download.btn']) {
        downloadBtn.textContent = translations[currentLang]['download.btn'];
    }
}

// دالة تحديث نص زر تبديل اللغة
function updateLanguageButton() {
    const langBtn = document.getElementById('langBtn');
    if (langBtn && translations[currentLang]['langBtn']) {
        langBtn.textContent = translations[currentLang]['langBtn'];
    }
}

// دالة حفظ تفضيل اللغة
function saveLanguagePreference() {
    localStorage.setItem('borham-tools-lang', currentLang);
}

// دالة تحميل تفضيل اللغة عند فتح الصفحة
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('borham-tools-lang');
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
        currentLang = savedLang;
    } else {
        // اكتشاف لغة المتصفح إذا لم يكن هناك تفضيل محفوظ
        const browserLang = navigator.language || navigator.userLanguage;
        currentLang = browserLang.startsWith('ar') ? 'ar' : 'en';
    }
    
    updatePageLanguage();
    updateLanguageButton();
}

// تهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    loadLanguagePreference();
    
    // تحديث زر التحميل إذا كان موجودًا
    const downloadBtn = document.querySelector('.btn-primary');
    if (downloadBtn && !downloadBtn.hasAttribute('data-key')) {
        downloadBtn.setAttribute('data-key', 'download.btn');
    }
});
