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

/* Frieght forwading */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Background Slider Logic (Every 2 Seconds) ---
    const slides = document.querySelectorAll('.logi-slide');
    let currentSlide = 0;
    const slideInterval = 2000; // 2 Seconds change time

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);


    // --- 2. Scroll Animation Logic ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.scroll-anim, .scroll-anim-left, .scroll-anim-right, .scroll-anim-up');
    animElements.forEach(el => observer.observe(el));
});

/* contct us */
document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('logisticsForm');
    const successMsg = document.getElementById('successMessage');
    const btn = document.querySelector('.contact-btn');
    const btnText = btn.querySelector('span');
    const btnIcon = btn.querySelector('i');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Page reload rokne ke liye

        // Button Animation - Loading state
        btnText.innerText = "Sending...";
        btnIcon.className = "fas fa-spinner fa-spin";
        btn.style.opacity = "0.7";

        // 2 Second wait simulate karna (fake server time)
        setTimeout(() => {
            // Form hide karna aur Success message dikhana
            form.style.display = 'none';
            successMsg.style.display = 'block';
            
            // Console m data dikhana (Testing ke liye)
            console.log("Form Submitted Successfully!");
            
            // Agar wapas form lana ho 5 sec baad (Optional)
            
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMsg.style.display = 'none';
                btnText.innerText = "Send Message";
                btnIcon.className = "fas fa-paper-plane";
                btn.style.opacity = "1";
            }, 5000);
            
        }, 2000);
    });

    // Scroll Animation Logic (Jo pehle diya tha wahi same)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translate(0,0)";
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DATA: Aapke Website ke Pages ---
    const pages = [
        { title: "Home", url: "index.html", desc: "Main landing page, logistics services overview." },
        { title: "About Us", url: "about.html", desc: "Company history, owner Kuldeep Singh, and vision." },
        { title: "Freight Forwarding", url: "freight.html", desc: "Air and Ocean freight services globally." },
        { title: "Track Shipment", url: "tracking.html", desc: "Check status of your courier or cargo." },
        { title: "Contact Us", url: "contact.html", desc: "Phone numbers, email, and office locations." },
        { title: "Services", url: "index.html#services", desc: "Full Truck Load, Part Load, and Warehousing." },
        { title: "Register", url: "register.html", desc: "Create an account for faster booking." }
    ];

    // --- 2. ELEMENTS ---
    const openBtn = document.querySelector('[data-key="search"]'); // Header Link
    const overlay = document.getElementById('full-screen-search');
    const closeBtn = document.getElementById('btn-close-search');
    const input = document.getElementById('site-search-input');
    const resultsDiv = document.getElementById('site-search-results');

    // --- 3. OPEN/CLOSE LOGIC ---
    if(openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.classList.add('active');
            input.value = ''; // Reset input
            resultsDiv.innerHTML = ''; // Reset results
            setTimeout(() => input.focus(), 100); // Focus input automatically
        });
    }

    // Close Functions
    const closeSearch = () => overlay.classList.remove('active');
    
    if(closeBtn) closeBtn.addEventListener('click', closeSearch);
    
    // Escape Key to Close
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') closeSearch();
    });

    // --- 4. INTERNAL SEARCH LOGIC ---
    input.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        resultsDiv.innerHTML = ''; // Clear previous

        if(query.length === 0) return;

        // Filter Logic
        const matches = pages.filter(page => 
            page.title.toLowerCase().includes(query) || 
            page.desc.toLowerCase().includes(query)
        );

        // Display Results
        if(matches.length > 0) {
            matches.forEach(match => {
                const item = document.createElement('a');
                item.href = match.url;
                item.className = 'search-result-item';
                item.innerHTML = `
                    <h4>${match.title}</h4>
                    <p>${match.desc}</p>
                `;
                item.addEventListener('click', closeSearch); // Click karte hi popup band
                resultsDiv.appendChild(item);
            });
        } else {
            resultsDiv.innerHTML = `<p style="color: #666;">No results found for "${query}"</p>`;
        }
    });
});