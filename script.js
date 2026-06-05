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


    /* --- Fill Forms via Buttons --- */
    const serviceSelect = document.getElementById('service-type');
    const modelSelect = document.getElementById('selected-model');
    const messageTextarea = document.getElementById('message');

    // Choose Model button action
    document.querySelectorAll('.select-model-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modelName = btn.getAttribute('data-model-name');
            
            // Map model to service type
            if (modelName === 'Aura Resort & Spa') {
                serviceSelect.value = 'Multi-Page Website';
                modelSelect.value = 'Aura Resort & Spa';
            } else if (modelName === 'Luxe Hair Studio') {
                serviceSelect.value = 'Single-Page Website';
                modelSelect.value = 'Luxe Hair Studio';
            } else if (modelName === 'ListKing Utility') {
                serviceSelect.value = 'Single-Page Website';
                modelSelect.value = 'ListKing Utility';
            } else if (modelName === 'Sri Saravana Store') {
                serviceSelect.value = 'Single-Page Website';
                modelSelect.value = 'Sri Saravana Store';
            } else if (modelName === 'ElectroFix Mobile Shop') {
                serviceSelect.value = 'Multi-Page Website';
                modelSelect.value = 'ElectroFix Mobile Shop';
            } else if (modelName === 'EduQuest Academy') {
                serviceSelect.value = 'Multi-Page Website';
                modelSelect.value = 'EduQuest Academy';
            } else if (modelName === 'Apex Consulting') {
                serviceSelect.value = 'Multi-Page Website';
                modelSelect.value = 'Apex Consulting';
            }
            
            // Set message
            messageTextarea.value = `Hi! I'm interested in building a small business website customized from the ${modelName}. I'd love to chat details!`;

            // Scroll to form
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });


    /* --- Interactive Preview Lightbox (Model Modal) --- */
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');

    function openModal(modelKey, modelTitle) {
        modalBody.innerHTML = `
            <div class="modal-header-nav">
                <h2>${modelTitle} - Live Preview</h2>
                <p class="text-muted font-sm" style="margin-bottom: 12px;">This is a fully interactive live website model. Scroll, click buttons, and experience the design layout.</p>
            </div>
            <div class="mock-browser">
                <div class="browser-header">
                    <div class="dots"><span class="dot-red"></span><span class="dot-yellow"></span><span class="dot-green"></span></div>
                    <div class="browser-url"><i data-lucide="lock" style="width: 10px; height: 10px;"></i> jsvsites.com/projects/${modelKey}/</div>
                </div>
                <div class="browser-iframe-container">
                    <iframe src="projects/${modelKey}/index.html" class="browser-iframe" title="${modelTitle}"></iframe>
                </div>
            </div>
            <div style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 12px;">
                <button class="btn btn-secondary btn-sm" id="modalCloseSecondary">Close Preview</button>
                <button class="btn btn-primary btn-sm" id="modalChooseBtn" data-model-name="${modelKey}">Select This Model</button>
            </div>
        `;

        if (window.lucide) {
            window.lucide.createIcons();
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll

        // Modal Choose Button event
        document.getElementById('modalChooseBtn').addEventListener('click', (e) => {
            const key = e.target.getAttribute('data-model-name');
            let formattedName = '';
            if (key === 'hotel') formattedName = 'Aura Resort & Spa';
            if (key === 'saloon') formattedName = 'Luxe Hair Studio';
            if (key === 'listking') formattedName = 'ListKing Utility';
            if (key === 'store') formattedName = 'Sri Saravana Store';
            if (key === 'mobile') formattedName = 'ElectroFix Mobile Shop';
            if (key === 'education') formattedName = 'EduQuest Academy';
            if (key === 'company') formattedName = 'Apex Consulting';

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
        document.body.style.overflow = ''; // Restore background scroll
    }

    // Click triggers
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modelKey = btn.getAttribute('data-model');
            const modelTitle = btn.getAttribute('data-model-title');
            openModal(modelKey, modelTitle);
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
        const waText = `Hi! I just submitted a project request on JSVSites:\n\n` +
                       `👤 Name: ${nameVal}\n` +
                       `💼 Business: ${businessVal} (${sectorVal})\n` +
                       `🛠️ Needed: ${serviceVal}\n` +
                       `🎨 Model Selected: ${modelVal}\n` +
                       `📝 Requirements: ${messageVal}`;

        // Update the WhatsApp button at the bottom of the page to match their inputs!
        const waBtn = document.querySelector('.btn-wa');
        if (waBtn) {
            waBtn.href = `https://wa.me/918248074540?text=${encodeURIComponent(waText)}`;
        }
    });

    resetFormBtn.addEventListener('click', () => {
        successMessage.classList.remove('active');
        projectForm.reset();
    });

});
