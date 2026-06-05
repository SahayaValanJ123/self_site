document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Hamburger Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    const links = navLinks.querySelectorAll('a, .nav-cta-btn');
    links.forEach(l => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 2. Deals Brand Filtration
  const filterTabs = document.querySelectorAll('.filter-tab');
  const phoneCards = document.querySelectorAll('.phone-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const brand = tab.getAttribute('data-brand');

      phoneCards.forEach(card => {
        const cardBrand = card.getAttribute('data-brand');
        if (brand === 'all' || cardBrand === brand) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. Dynamic Dropdowns & Cost Estimator
  const brandSelect = document.getElementById('device-brand');
  const modelSelect = document.getElementById('device-model');
  const issueSelect = document.getElementById('repair-service');
  const resultDisplay = document.getElementById('result-display-panel');
  const priceDisplay = document.getElementById('calculated-price');

  const modelOptions = {
    apple: [
      { name: "iPhone 14 Pro Max", basePrice: 120 },
      { name: "iPhone 13 Pro", basePrice: 90 },
      { name: "iPhone 12", basePrice: 75 },
      { name: "iPhone SE (2022)", basePrice: 50 }
    ],
    samsung: [
      { name: "Galaxy S23 Ultra", basePrice: 110 },
      { name: "Galaxy S22 Plus", basePrice: 85 },
      { name: "Galaxy A54 5G", basePrice: 65 }
    ],
    google: [
      { name: "Pixel 7 Pro", basePrice: 95 },
      { name: "Pixel 6a", basePrice: 60 },
      { name: "Pixel Fold", basePrice: 130 }
    ]
  };

  if (brandSelect && modelSelect) {
    brandSelect.addEventListener('change', () => {
      const selectedBrand = brandSelect.value;
      
      // Clear options
      modelSelect.innerHTML = '<option value="" disabled selected>Select Model</option>';
      modelSelect.disabled = false;

      // Populate models
      if (modelOptions[selectedBrand]) {
        modelOptions[selectedBrand].forEach(model => {
          const option = document.createElement('option');
          option.value = model.name;
          option.textContent = model.name;
          option.setAttribute('data-base', model.basePrice);
          modelSelect.appendChild(option);
        });
      }
      
      calculatePrice();
    });

    modelSelect.addEventListener('change', calculatePrice);
    issueSelect.addEventListener('change', calculatePrice);
  }

  function calculatePrice() {
    if (!brandSelect.value || !modelSelect.value || !issueSelect.value) {
      resultDisplay.classList.add('hidden');
      return;
    }

    const selectedModelOpt = modelSelect.options[modelSelect.selectedIndex];
    const basePrice = parseFloat(selectedModelOpt.getAttribute('data-base')) || 60;

    const selectedIssueOpt = issueSelect.options[issueSelect.selectedIndex];
    const coef = parseFloat(selectedIssueOpt.getAttribute('data-coef')) || 1.0;

    // Calculate final price (Round to nearest 9 for marketing aesthetics)
    let rawPrice = basePrice * coef;
    let roundedPrice = Math.round(rawPrice / 10) * 10 - 1;
    if (roundedPrice < 19) roundedPrice = 19; // floor

    priceDisplay.textContent = `$${roundedPrice}`;
    resultDisplay.classList.remove('hidden');
  }

  // 4. Appointment Form Submissions
  const calcForm = document.getElementById('price-calculator-form');
  const estimatorBox = document.querySelector('.estimator-box');

  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value || 'Customer';
      const phone = document.getElementById('client-phone').value || 'Not provided';
      const brand = brandSelect.value;
      const model = modelSelect.value;
      const issueText = issueSelect.options[issueSelect.selectedIndex].text;
      const priceText = priceDisplay.textContent;

      const submitBtn = calcForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Allocating Slot...';

      setTimeout(() => {
        estimatorBox.innerHTML = `
          <div style="text-align: center; padding: 20px 0; animation: slideDown 0.4s ease-out;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background-color: var(--primary-glow); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 style="font-size: 1.75rem; margin-bottom: 12px; font-weight: 800;">Slot Reserved</h3>
            <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 0.95rem; line-height: 1.6;">
              Thanks <strong>${name}</strong>. An express repair slot for your <strong>${model}</strong> (${issueText}) is reserved under contact <strong>${phone}</strong>. 
              Bring the phone to our store. Estimated cost: <strong style="color: var(--accent); font-size: 1.1rem;">${priceText}</strong>.
            </p>
            <button onclick="window.location.reload();" class="btn btn-secondary" style="padding: 10px 24px;">Calculate Another Repair</button>
          </div>
        `;
      }, 1200);
    });
  }

  // 5. Simulated Live Ticket Status Tracker
  const btnTrack = document.getElementById('btn-track-ticket');
  const ticketInput = document.getElementById('ticket-id-input');
  const trackerResultBox = document.getElementById('tracker-result-box');

  if (btnTrack && ticketInput) {
    btnTrack.addEventListener('click', () => {
      const id = ticketInput.value.trim().toUpperCase();
      
      if (!id) {
        alert("Please enter a ticket ID (e.g. REP1024)");
        return;
      }

      btnTrack.disabled = true;
      btnTrack.textContent = 'Searching...';
      trackerResultBox.classList.add('hidden');

      setTimeout(() => {
        btnTrack.disabled = false;
        btnTrack.textContent = 'Search Ticket';

        if (id === 'REP1024') {
          trackerResultBox.innerHTML = `
            <div class="tracker-title-row">
              <h4>Ticket: <span style="color: var(--accent)">#REP1024</span></h4>
              <span class="tracker-device">iPhone 14 Pro Max</span>
            </div>
            <div class="timeline">
              <div class="timeline-step completed">
                <div class="timeline-icon">✓</div>
                <div class="timeline-info">
                  <h5>Device Received & Diagnostic</h5>
                  <p>Completed - May 28, 10:15 AM &bull; Identified cracked display digitizer</p>
                </div>
              </div>
              <div class="timeline-step completed">
                <div class="timeline-icon">✓</div>
                <div class="timeline-info">
                  <h5>Display Sourcing</h5>
                  <p>Completed - May 28, 11:30 AM &bull; Certified parts allocated from vault</p>
                </div>
              </div>
              <div class="timeline-step completed">
                <div class="timeline-icon">✓</div>
                <div class="timeline-info">
                  <h5>Hardware Calibration & Fit</h5>
                  <p>Completed - May 28, 12:45 PM &bull; Screen fitted, touch responsive tests passed</p>
                </div>
              </div>
              <div class="timeline-step active">
                <div class="timeline-icon"></div>
                <div class="timeline-info">
                  <h5>Ready for Pickup</h5>
                  <p>Active - Please visit store. Bring photo ID and reference ticket #REP1024.</p>
                </div>
              </div>
            </div>
          `;
          trackerResultBox.classList.remove('hidden');
        } else if (id === 'REP2048') {
          trackerResultBox.innerHTML = `
            <div class="tracker-title-row">
              <h4>Ticket: <span style="color: var(--accent)">#REP2048</span></h4>
              <span class="tracker-device">Galaxy S23 Ultra</span>
            </div>
            <div class="timeline">
              <div class="timeline-step completed">
                <div class="timeline-icon">✓</div>
                <div class="timeline-info">
                  <h5>Device Received & Diagnostic</h5>
                  <p>Completed - May 28, 11:45 AM &bull; Low battery health and heat threshold test failed</p>
                </div>
              </div>
              <div class="timeline-step active">
                <div class="timeline-icon"></div>
                <div class="timeline-info">
                  <h5>Battery Part Allocation</h5>
                  <p>Active - Part transit from primary distribution vault. Est. arrival today 4:00 PM.</p>
                </div>
              </div>
              <div class="timeline-step">
                <div class="timeline-icon"></div>
                <div class="timeline-info">
                  <h5>Hardware Calibration & Fit</h5>
                  <p>Pending - Awaiting assembly</p>
                </div>
              </div>
              <div class="timeline-step">
                <div class="timeline-icon"></div>
                <div class="timeline-info">
                  <h5>Ready for Pickup</h5>
                  <p>Pending - Auto text message will be triggered</p>
                </div>
              </div>
            </div>
          `;
          trackerResultBox.classList.remove('hidden');
        } else {
          trackerResultBox.innerHTML = `
            <div style="text-align: center; padding: 10px 0;">
              <svg viewBox="0 0 24 24" width="30" height="30" stroke="var(--accent)" stroke-width="2" fill="none" style="margin-bottom: 12px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <h4 style="margin-bottom: 8px;">Ticket Not Found</h4>
              <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5;">
                We could not find active ticket ID <strong>${id}</strong>. For secure status updates, please double check the ID code or contact our service line directly.
              </p>
            </div>
          `;
          trackerResultBox.classList.remove('hidden');
        }
      }, 1000);
    });
  }

  // 6. Availability Check Modal (Deals)
  const modal = document.getElementById('catalog-modal');
  const modalBody = document.getElementById('catalog-modal-body');
  const modalClose = document.getElementById('catalog-modal-close');
  const modalOverlay = document.getElementById('catalog-modal-overlay');
  const dealButtons = document.querySelectorAll('.deal-inquire-trigger');

  dealButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const phoneName = btn.getAttribute('data-phone');
      
      modalBody.innerHTML = `
        <h3>Check Availability</h3>
        <p style="margin-bottom: 20px; font-size: 0.9rem; color: var(--text-muted);">
          Our inventory updates dynamically. Submit a contact request to check if the <strong>${phoneName}</strong> is ready for pickup today at the shop.
        </p>
        <form id="stock-check-form" style="display: flex; flex-direction: column; gap: 16px;">
          <div class="form-group">
            <label for="stock-client-name">Your Name</label>
            <input type="text" id="stock-client-name" required placeholder="Alice Vance" style="background-color: var(--bg-dark); border: 1px solid var(--border-color); color: white; padding: 12px; border-radius: var(--radius-sm)">
          </div>
          <div class="form-group">
            <label for="stock-client-email">Email or Phone</label>
            <input type="text" id="stock-client-email" required placeholder="alice@gmail.com" style="background-color: var(--bg-dark); border: 1px solid var(--border-color); color: white; padding: 12px; border-radius: var(--radius-sm)">
          </div>
          <button type="submit" class="btn btn-primary" id="stock-submit-btn" style="width: 100%; margin-top: 10px;">Send Stock Query</button>
        </form>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Attach stock form listener
      document.getElementById('stock-check-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = document.getElementById('stock-client-name').value;
        const submitButton = document.getElementById('stock-submit-btn');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        setTimeout(() => {
          modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px 0; animation: slideDown 0.4s ease-out;">
              <div style="width: 50px; height: 50px; border-radius: 50%; background-color: var(--primary-glow); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style="margin-bottom: 8px;">Query Sent Successfully</h3>
              <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5;">
                Thank you <strong>${clientName}</strong>. A store representative will text you shortly with inventory updates for the <strong>${phoneName}</strong>.
              </p>
              <button onclick="window.location.reload();" class="btn btn-secondary" style="margin-top: 20px; padding: 8px 20px; font-size: 0.85rem">Close</button>
            </div>
          `;
        }, 1000);
      });
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

});
