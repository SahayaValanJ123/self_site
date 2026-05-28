document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    /* --- Navigation Scroll & Mobile Toggle --- */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        
        // Update menu icon
        if (isOpen) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        if (window.lucide) {
            window.lucide.createIcons();
        }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            if (window.lucide) {
                window.lucide.createIcons();
            }
        });
    });


    /* --- Showcase Filter Logic --- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modelCards = document.querySelectorAll('.model-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            modelCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Add fade-in effect
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transition = 'opacity 0.4s ease';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    /* --- Interactive Pricing Calculator --- */
    const platformInputs = document.querySelectorAll('input[name="platform"]');
    const addonDomain = document.getElementById('addon-domain');
    const addonSeo = document.getElementById('addon-seo');
    const addonBooking = document.getElementById('addon-booking');

    const summaryPlatformLabel = document.getElementById('summary-platform-label');
    const summaryPlatformPrice = document.getElementById('summary-platform-price');
    const summaryAddonsList = document.getElementById('summary-addons-list');
    const summaryTotalPrice = document.getElementById('summary-total-price');
    const calcApplyBtn = document.getElementById('calc-apply-btn');

    const platformRates = {
        'website-single': { name: 'Single-Page Website', price: 149 },
        'website-multi': { name: 'Multi-Page Website (3-5 pg)', price: 299 },
        'app-only': { name: 'Android App Only', price: 399 },
        'bundle': { name: 'Web + Android App Bundle', price: 499 }
    };

    function updateQuote() {
        let total = 0;
        
        // 1. Get selected platform details
        let selectedPlatform = 'website-single';
        platformInputs.forEach(input => {
            if (input.checked) {
                selectedPlatform = input.value;
            }
        });

        const platformData = platformRates[selectedPlatform];
        total += platformData.price;

        // Update platform summary row
        summaryPlatformLabel.textContent = platformData.name;
        summaryPlatformPrice.textContent = `$${platformData.price}`;

        // 2. Process Add-ons
        summaryAddonsList.innerHTML = '';
        const addonsSelected = [];

        if (addonDomain.checked) {
            const price = parseInt(addonDomain.value);
            total += price;
            addonsSelected.push({ name: 'Custom Domain Setup', price });
        }
        if (addonSeo.checked) {
            const price = parseInt(addonSeo.value);
            total += price;
            addonsSelected.push({ name: 'Advanced Local SEO', price });
        }
        if (addonBooking.checked) {
            const price = parseInt(addonBooking.value);
            total += price;
            addonsSelected.push({ name: 'Appointment Booking System', price });
        }

        // Render add-ons in summary list
        addonsSelected.forEach(addon => {
            const row = document.createElement('div');
            row.className = 'summary-line';
            row.innerHTML = `
                <span class="line-label">+ ${addon.name}</span>
                <span class="line-price">+$${addon.price}</span>
            `;
            summaryAddonsList.appendChild(row);
        });

        // 3. Update total price
        summaryTotalPrice.textContent = `$${total}`;
        
        return {
            platformName: platformData.name,
            addons: addonsSelected.map(a => a.name),
            totalPrice: total
        };
    }

    // Add event listeners to calculator inputs
    platformInputs.forEach(input => input.addEventListener('change', updateQuote));
    addonDomain.addEventListener('change', updateQuote);
    addonSeo.addEventListener('change', updateQuote);
    addonBooking.addEventListener('change', updateQuote);

    // Run once on load
    updateQuote();


    /* --- Fill Forms via Buttons --- */
    const serviceSelect = document.getElementById('service-type');
    const modelSelect = document.getElementById('selected-model');
    const messageTextarea = document.getElementById('message');

    // 1. Choose Model button action
    document.querySelectorAll('.select-model-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modelName = btn.getAttribute('data-model-name');
            
            // Map model to sector/service
            if (modelName.includes('BakeHouse')) {
                serviceSelect.value = 'Single-Page Website';
                modelSelect.value = 'BakeHouse Model';
            } else if (modelName.includes('FreshCart')) {
                serviceSelect.value = 'Multi-Page Website';
                modelSelect.value = 'FreshCart Model';
            } else if (modelName.includes('FitLife')) {
                serviceSelect.value = 'Single-Page Website';
                modelSelect.value = 'FitLife Model';
            } else if (modelName.includes('UrbanSalon')) {
                serviceSelect.value = 'Multi-Page Website';
                modelSelect.value = 'UrbanSalon Model';
            }
            
            // Set message
            messageTextarea.value = `Hi! I'm interested in building a small business website customized from the ${modelName}. I'd love to chat details!`;

            // Scroll to form
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 2. Quote Apply button action
    calcApplyBtn.addEventListener('click', () => {
        const quote = updateQuote();
        
        // Map service value
        if (quote.platformName.includes('Single-Page')) {
            serviceSelect.value = 'Single-Page Website';
        } else if (quote.platformName.includes('Multi-Page')) {
            serviceSelect.value = 'Multi-Page Website';
        } else if (quote.platformName.includes('Android App Only')) {
            serviceSelect.value = 'Android Application';
        } else {
            serviceSelect.value = 'Web & Android App Bundle';
        }

        // List selected add-ons in text
        let addonsText = quote.addons.length > 0 ? quote.addons.join(', ') : 'None';
        messageTextarea.value = `Hi! I estimated my project using your calculator.\n\n` +
                                `• Selected Service: ${quote.platformName}\n` +
                                `• Selected Add-ons: ${addonsText}\n` +
                                `• Estimated Quote: $${quote.totalPrice}\n\n` +
                                `Please reach out to finalize details!`;

        // Scroll to form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });


    /* --- Interactive Preview Lightbox (Model Modal) --- */
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    const modelPreviews = {
        bakehouse: {
            title: 'BakeHouse Café Model Preview',
            theme: 'theme-cafe',
            url: 'https://bakehouse-demo.vercel.app',
            content: `
                <div class="preview-nav">
                    <span class="preview-logo">🥐 BakeHouse Café</span>
                    <div class="preview-menu">
                        <span>Menu</span>
                        <span>Our Story</span>
                        <span>Location</span>
                    </div>
                    <button class="preview-btn">Order Online</button>
                </div>
                <div class="preview-hero">
                    <h2>Freshly Baked Treats Delivered Daily</h2>
                    <p>Experience artisanal pastries, custom wedding cakes, and locally roasted organic coffee at our cozy boutique location.</p>
                </div>
                <div class="preview-grid">
                    <div class="preview-item">
                        <div class="preview-item-title">Almond Croissant</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Light, buttery, filled with almond paste.</p>
                        <span class="preview-item-price">$4.50</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Organic Latte</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Double shot espresso with steamed milk.</p>
                        <span class="preview-item-price">$3.75</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Avocado Toast</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Smashed avocado on sourdough with seeds.</p>
                        <span class="preview-item-price">$8.50</span>
                    </div>
                </div>
                <div class="preview-footer">
                    <span>📍 128 Bakers Lane, NY</span>
                    <span>📞 (555) 019-2834</span>
                </div>
            `
        },
        freshcart: {
            title: 'FreshCart Grocery Model Preview',
            theme: 'theme-store',
            url: 'https://freshcart-store.vercel.app',
            content: `
                <div class="preview-nav">
                    <span class="preview-logo">🥬 FreshCart</span>
                    <div class="preview-menu">
                        <span>Fruits</span>
                        <span>Vegetables</span>
                        <span>Grains</span>
                    </div>
                    <button class="preview-btn"><i data-lucide="shopping-cart"></i> Cart (2)</button>
                </div>
                <div class="preview-hero">
                    <h2>Organic Groceries, Delivered to Your Doorstep</h2>
                    <p>Order fresh produce sourced directly from local organic farms. Check out securely via WhatsApp message.</p>
                </div>
                <div class="preview-grid">
                    <div class="preview-item">
                        <div class="preview-item-title">Organic Strawberries</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Sweet, picked daily. 500g basket.</p>
                        <span class="preview-item-price">$3.99</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Fresh Broccoli</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Farm-fresh premium greens. Per head.</p>
                        <span class="preview-item-price">$1.89</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Whole Grain Bread</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Artisanal stoneground sourdough loaf.</p>
                        <span class="preview-item-price">$4.25</span>
                    </div>
                </div>
                <div class="preview-footer">
                    <span>⚡ Standard 2 Hour Delivery</span>
                    <span>💬 Checkout via WhatsApp</span>
                </div>
            `
        },
        fitlife: {
            title: 'FitLife Gym & Wellness Model Preview',
            theme: 'theme-gym',
            url: 'https://fitlife-wellness.vercel.app',
            content: `
                <div class="preview-nav">
                    <span class="preview-logo">🏋️‍♂️ FitLife Studio</span>
                    <div class="preview-menu">
                        <span>Classes</span>
                        <span>Trainers</span>
                        <span>Pricing</span>
                    </div>
                    <button class="preview-btn">Free Trial Pass</button>
                </div>
                <div class="preview-hero">
                    <h2>Transform Your Mind & Body</h2>
                    <p>High-intensity workouts, relaxing yoga flows, and customized nutritional consulting. Let's reach your goals.</p>
                </div>
                <div class="preview-grid">
                    <div class="preview-item">
                        <div class="preview-item-title">Monthly Access</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Full gym access + group classes.</p>
                        <span class="preview-item-price">$49/mo</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Personal Coach</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">2 personal training sessions per week.</p>
                        <span class="preview-item-price">$149/mo</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Yoga Unlimited</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Access to all yoga and pilates sessions.</p>
                        <span class="preview-item-price">$39/mo</span>
                    </div>
                </div>
                <div class="preview-footer">
                    <span>🔥 24/7 Member Facilities</span>
                    <span>📍 404 Strength Ave, CA</span>
                </div>
            `
        },
        urbansalon: {
            title: 'UrbanSalon Booking Model Preview',
            theme: 'theme-salon',
            url: 'https://urbansalon-booking.vercel.app',
            content: `
                <div class="preview-nav">
                    <span class="preview-logo">💇‍♀️ UrbanSalon</span>
                    <div class="preview-menu">
                        <span>Services</span>
                        <span>Stylists</span>
                        <span>Portfolio</span>
                    </div>
                    <button class="preview-btn">Book Appointment</button>
                </div>
                <div class="preview-hero">
                    <h2>Unleash Your Inner Confidence</h2>
                    <p>Premium hair styling, coloring, manicure, and spa therapies designed to make you glow. Book your styling slot today.</p>
                </div>
                <div class="preview-grid">
                    <div class="preview-item">
                        <div class="preview-item-title">Signature Haircut</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Wash, style, custom cut and blow dry.</p>
                        <span class="preview-item-price">$65</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Balayage Coloring</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Handpainted gradient highlighting.</p>
                        <span class="preview-item-price">$120</span>
                    </div>
                    <div class="preview-item">
                        <div class="preview-item-title">Spa Manicure</div>
                        <p class="font-sm" style="color: #64748b; margin-bottom: 4px;">Organic sugar scrub and gel finish.</p>
                        <span class="preview-item-price">$35</span>
                    </div>
                </div>
                <div class="preview-footer">
                    <span>🕒 Mon-Sat: 9am - 8pm</span>
                    <span>⭐ 4.9 Stars Google Reviews</span>
                </div>
            `
        }
    };

    function openModal(modelKey) {
        const preview = modelPreviews[modelKey];
        if (!preview) return;

        modalBody.innerHTML = `
            <h2>${preview.title}</h2>
            <p class="text-muted font-sm" style="margin-bottom: 20px;">This is a premium, lightweight interactive mockup of the template structure.</p>
            <div class="mock-browser">
                <div class="browser-header">
                    <div class="dots"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span></div>
                    <div class="browser-url"><i data-lucide="lock" style="width: 10px; height: 10px;"></i> ${preview.url}</div>
                </div>
                <div class="browser-content ${preview.theme}">
                    ${preview.content}
                </div>
            </div>
            <div style="margin-top: 30px; display: flex; justify-content: flex-end; gap: 12px;">
                <button class="btn btn-secondary" id="modalCloseSecondary">Close Preview</button>
                <button class="btn btn-primary" id="modalChooseBtn" data-model-name="${modelKey}">Select This Model</button>
            </div>
        `;

        if (window.lucide) {
            window.lucide.createIcons();
        }

        modalOverlay.classList.add('active');

        // Modal Choose Button event
        document.getElementById('modalChooseBtn').addEventListener('click', (e) => {
            const key = e.target.getAttribute('data-model-name');
            let formattedName = '';
            if (key === 'bakehouse') formattedName = 'BakeHouse Model';
            if (key === 'freshcart') formattedName = 'FreshCart Model';
            if (key === 'fitlife') formattedName = 'FitLife Model';
            if (key === 'urbansalon') formattedName = 'UrbanSalon Model';

            // Find choose btn from list
            const trigger = document.querySelector(`.select-model-btn[data-model-name="${formattedName}"]`);
            if (trigger) trigger.click();
            
            closeModal();
        });

        // Modal Secondary Close button event
        document.getElementById('modalCloseSecondary').addEventListener('click', closeModal);
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalBody.innerHTML = '';
    }

    // Click triggers
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modelKey = btn.getAttribute('data-model');
            openModal(modelKey);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });


    /* --- Contact Form Submission & WhatsApp Redirect --- */
    const projectForm = document.getElementById('projectForm');
    const successMessage = document.getElementById('successMessage');
    const resetFormBtn = document.getElementById('resetFormBtn');

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Gather Form Data
        const nameVal = document.getElementById('name').value;
        const emailVal = document.getElementById('email').value;
        const businessVal = document.getElementById('business-name').value || 'Not specified';
        const sectorVal = document.getElementById('business-type').value || 'Not specified';
        const serviceVal = document.getElementById('service-type').value;
        const modelVal = document.getElementById('selected-model').value;
        const messageVal = document.getElementById('message').value;

        // 2. Validate (done via HTML5 required attributes)
        
        // 3. Show Success Overlay
        successMessage.classList.add('active');

        // 4. Format a secondary prompt suggestion so client can send immediately on WhatsApp
        // We'll prepare a formatted link if they want direct follow-up on WhatsApp
        const waText = `Hi! I just submitted a project request on AuraCraft Studio:\n\n` +
                       `👤 Name: ${nameVal}\n` +
                       `💼 Business: ${businessVal} (${sectorVal})\n` +
                       `🛠️ Needed: ${serviceVal}\n` +
                       `🎨 Model Selected: ${modelVal}\n` +
                       `📝 Requirements: ${messageVal}`;

        // Update the WhatsApp button at the bottom of the page to match their inputs!
        const waBtn = document.querySelector('.btn-wa');
        if (waBtn) {
            waBtn.href = `https://wa.me/918072739023?text=${encodeURIComponent(waText)}`;
        }
    });

    resetFormBtn.addEventListener('click', () => {
        successMessage.classList.remove('active');
        projectForm.reset();
        updateQuote(); // reset summary details
    });

});
