document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------
       1. MOBILE MENU TOGGLE
    ------------------------------------------------------ */
    const hamburger = document.getElementById('mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const authButtons = document.querySelector('.auth-buttons');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            const isVisible = mainNav.style.display === 'flex';

            mainNav.style.display = isVisible ? 'none' : 'flex';
            if(authButtons) authButtons.style.display = isVisible ? 'none' : 'flex';

            if (!isVisible) {
                mainNav.style.flexDirection = 'column';
            }
        });
    }

    /* ------------------------------------------------------
       2. LANGUAGE DROPDOWN
    ------------------------------------------------------ */
    const translations = {
        en: { home: "Home", about: "About", services: "Services", freight: "Freight Forwarding", warehousing: "Warehousing", supply_chain: "Supply Chain", express: "Express Delivery", international: "International Shipping", track: "Track Shipment", locations: "Locations", register: "Register", login: "Login", contact: "Contact Us", support: "Support", notifications: "Notifications", search: "Search" },
        hi: { home: "होम", about: "हमारे बारे में", services: "सेवाएँ", freight: "माल अग्रेषण", warehousing: "वेयरहाउसिंग", supply_chain: "सप्लाई चेन", express: "एक्सप्रेस डिलीवरी", international: "अंतरराष्ट्रीय शिपिंग", track: "शिपमेंट ट्रैक करें", locations: "स्थान", register: "रजिस्टर", login: "लॉगिन", contact: "संपर्क करें", support: "सहायता", notifications: "नोटिफिकेशन", search: "खोजें" },
        mr: { home: "होम", about: "आमच्याबद्दल", services: "सेवा", freight: "फ्रेट फॉरवर्डिंग", warehousing: "वेअरहाउसिंग", supply_chain: "पुरवठा साखळी", express: "एक्सप्रेस डिलिव्हरी", international: "आंतरराष्ट्रीय शिपिंग", track: "शिपमेंट ट्रॅक करा", locations: "ठिकाणे", register: "नोंदणी", login: "लॉगिन", contact: "संपर्क करा", support: "सपोर्ट", notifications: "सूचना", search: "शोधा" }
    };

    function applyLanguage(lang) {
        localStorage.setItem("language", lang);

        const toggleBtn = document.querySelector(".lang-toggle");
        if(toggleBtn) {
            toggleBtn.innerHTML = `<i class="fas fa-globe"></i> ${lang.toUpperCase()}`;
        }

        document.querySelectorAll("[data-key]").forEach(el => {
            let key = el.getAttribute("data-key");
            if(translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }

    const langToggle = document.querySelector(".lang-toggle");
    if(langToggle) {
        langToggle.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(".lang-menu").classList.toggle("show");
        });
    }

    document.querySelectorAll(".lang-menu a").forEach(btn => {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            let lang = this.getAttribute("data-lang");
            applyLanguage(lang);
            document.querySelector(".lang-menu").classList.remove("show");
        });
    });

    let savedLang = localStorage.getItem("language") || "en";
    applyLanguage(savedLang);

    /* ------------------------------------------------------
       3. GLOBAL SCROLL ANIMATION
    ------------------------------------------------------ */
    const globalObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    if(hiddenElements.length > 0) {
        hiddenElements.forEach((el) => globalObserver.observe(el));
    }

    /* ------------------------------------------------------
       4. TABS
    ------------------------------------------------------ */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contentBoxes = document.querySelectorAll('.content-box');

    if(tabBtns.length > 0) {
        tabBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                tabBtns.forEach((b) => b.classList.remove('active'));
                contentBoxes.forEach((c) => c.classList.remove('active'));

                btn.classList.add('active');
                const target = document.getElementById(btn.dataset.target);

                if (target) target.classList.add('active');
            });
        });
    }

    /* ------------------------------------------------------
       5. HERO SLIDER
    ------------------------------------------------------ */
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        function prevSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        const interval = setInterval(nextSlide, 5000);

        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                clearInterval(interval);
            });

            prevBtn.addEventListener('click', () => {
                prevSlide();
                clearInterval(interval);
            });
        }
    }

    /* ------------------------------------------------------
       6. ABOUT SECTION (Scroll Animation)
    ------------------------------------------------------ */
    const aboutObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    const scrollElements = document.querySelectorAll('.scroll-animate');
    if(scrollElements.length > 0) {
        scrollElements.forEach((el) => aboutObserver.observe(el));
    }

}); // DOMContentLoaded END


/* ====================================================================
   7. SHIPMENT TRACKING SYSTEM (GLOBAL SCOPE)
==================================================================== */
function trackShipment() {
    // 1. Get Elements
    const inputField = document.getElementById('trackingInput');
    const resultSection = document.getElementById('trackingResult');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');
    const displayID = document.getElementById('displayID');
    const trackBtn = document.getElementById('trackBtn');

    // Safe Check if element exists
    if(!inputField || !resultSection) return;

    // 2. Validation: Empty Check
    if(inputField.value.trim() === "") {
        alert("Please enter a valid LR or Docket Number!");
        return;
    }

    // 3. UI Changes: Show Loader
    trackBtn.disabled = true; 
    resultSection.style.display = "none"; 
    btnText.style.display = "none"; 
    btnLoader.style.display = "inline-block"; 

    // 4. Fake Server Delay (1.5 Seconds)
    setTimeout(() => {
        // --- Reset Button ---
        btnLoader.style.display = "none";
        btnText.style.display = "inline";
        trackBtn.disabled = false;

        // --- Update Data ---
        displayID.innerText = inputField.value.toUpperCase();

        // --- Show Result ---
        resultSection.style.display = "block";

        // --- Scroll to Result ---
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

    }, 1500); 
}