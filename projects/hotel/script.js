document.addEventListener('DOMContentLoaded', () => {

  // 1. Scrolled Header Navigation Shadow
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggler
  const menuToggle = document.getElementById('menu-toggle');
  const navigationMenu = document.getElementById('navigation-menu');

  if (menuToggle && navigationMenu) {
    menuToggle.addEventListener('click', () => {
      navigationMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close on navigation link click
    const navLinks = navigationMenu.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navigationMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // 3. Fine Dining Menu Switcher
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuContents = document.querySelectorAll('.menu-content');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle Tab Classes
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Toggle Menu Lists
      const targetMenuId = `menu-${tab.getAttribute('data-menu')}`;
      menuContents.forEach(content => {
        if (content.getAttribute('id') === targetMenuId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // 4. Room Booking vs Table Reservation Switcher
  const tabRoomBtn = document.getElementById('tab-room-btn');
  const tabTableBtn = document.getElementById('tab-table-btn');
  const roomFields = document.getElementById('room-fields');
  const tableFields = document.getElementById('table-fields');
  let currentReservationType = 'room';

  if (tabRoomBtn && tabTableBtn && roomFields && tableFields) {
    tabRoomBtn.addEventListener('click', () => {
      tabRoomBtn.classList.add('active');
      tabTableBtn.classList.remove('active');
      roomFields.classList.remove('hidden');
      tableFields.classList.add('hidden');
      currentReservationType = 'room';
    });

    tabTableBtn.addEventListener('click', () => {
      tabTableBtn.classList.add('active');
      tabRoomBtn.classList.remove('active');
      tableFields.classList.remove('hidden');
      roomFields.classList.add('hidden');
      currentReservationType = 'table';
    });
  }

  // 5. Suite Lightbox details
  const lightbox = document.getElementById('suite-lightbox');
  const lightboxContent = document.getElementById('lightbox-content');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const viewSuiteTriggers = document.querySelectorAll('.view-suite-trigger');

  const suiteDetails = {
    "Deluxe Ocean Suite": {
      size: "85 m² (915 sq ft)",
      occupancy: "2 Adults (1 Child option)",
      description: "Crafted as an open-concept haven, this suite offers a sun-bleached teak veranda overlooking the ocean reef, featuring a customized visual bar and integrated indoor-outdoor layout.",
      amenities: [
        "Pre-stocked premium winery cabinet",
        "Deep freestanding stone bathtub with ocean sunset view",
        "Curated organic botanical pillow menu",
        "Direct access path to pristine coral reef beach"
      ]
    },
    "Panorama Lagoon Villa": {
      size: "120 m² (1,290 sq ft)",
      occupancy: "2 Adults (Overwater safety rule)",
      description: "Suspended directly above the crystal-clear lagoon waters. Watch marine life pass under your glass floor viewing portals, or dive straight in from your private split-level dock.",
      amenities: [
        "Glass overwater floor panels with night lighting",
        "Direct stair access to warm lagoon waters",
        "24-hour dedicated butler and room service",
        "Outdoor freshwater splash shower"
      ]
    },
    "Imperial Sanctuary Penthouse": {
      size: "280 m² (3,010 sq ft)",
      occupancy: "4 Adults (Dual master layout)",
      description: "Our crown jewel. A private oasis in the sky offering total seclusion, custom structural glass frames, a private cocktail bar, and panoramic 360-degree views of the entire coastline.",
      amenities: [
        "Heated rooftop infinity pool with swim-up bar",
        "Curated local organic fine-dining chef available",
        "Private visual projection room and library",
        "Airport transit in Tesla Model X chauffeur"
      ]
    }
  };

  viewSuiteTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const suiteTitle = trigger.getAttribute('data-suite');
      const data = suiteDetails[suiteTitle];
      if (!data) return;

      lightboxContent.innerHTML = `
        <h2>${suiteTitle}</h2>
        <p style="color: var(--gold); font-size: 0.95rem; font-weight: 500; margin-bottom: 20px;">
          📐 ${data.size} &nbsp;•&nbsp; 👥 Occupancy: ${data.occupancy}
        </p>
        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; font-weight: 300; margin-bottom: 24px;">
          ${data.description}
        </p>
        <h4>Suite Exclusives</h4>
        <ul style="padding-left: 20px; margin-bottom: 30px;">
          ${data.amenities.map(item => `<li style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 8px; font-weight:300;">${item}</li>`).join('')}
        </ul>
        <a href="#reserve" class="btn btn-gold btn-block" id="lightbox-book-now-btn" style="text-align: center;">Book This Suite</a>
      `;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Close modal on book button click
      document.getElementById('lightbox-book-now-btn').addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Select the appropriate room dropdown choice
        const selectionDropdown = document.getElementById('suite-selection');
        if (selectionDropdown) {
          if (suiteTitle.includes('Deluxe')) selectionDropdown.value = 'deluxe';
          if (suiteTitle.includes('Lagoon')) selectionDropdown.value = 'panorama';
          if (suiteTitle.includes('Imperial')) selectionDropdown.value = 'presidential';
        }
      });
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // 6. Booking Inquiry Submit Handler
  const bookingForm = document.getElementById('booking-inquiry-form');
  const reserveFormWrapper = document.querySelector('.reserve-form-wrapper');

  if (bookingForm && reserveFormWrapper) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const guestName = document.getElementById('guest-name').value;
      const guestEmail = document.getElementById('guest-email').value;

      const submitBtn = document.getElementById('btn-submit-inquiry');
      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING REQUEST...';

      setTimeout(() => {
        let confirmationText = '';
        
        if (currentReservationType === 'room') {
          const suiteSelect = document.getElementById('suite-selection');
          const chosenSuiteText = suiteSelect.options[suiteSelect.selectedIndex].text;
          confirmationText = `
            Our guest relations team has received your application for the <strong>${chosenSuiteText}</strong>. 
            A luxury concierge specialist will connect with you at <strong>${guestEmail}</strong> within 12 hours to coordinate your stay and arrange customized transfers.
          `;
        } else {
          const dinnerTimeSelect = document.getElementById('booking-time');
          const chosenTimeText = dinnerTimeSelect.options[dinnerTimeSelect.selectedIndex].text;
          confirmationText = `
            We have logged your dining inquiry for <strong>The Gold Leaf Restaurant</strong> at <strong>${chosenTimeText}</strong>. 
            A head maître d' will email your formal table reservation confirmation to <strong>${guestEmail}</strong>.
          `;
        }

        // Render Gold success card
        reserveFormWrapper.innerHTML = `
          <div style="text-align: center; padding: 40px 20px; animation: fadeIn 0.5s ease-out;">
            <div style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid var(--gold); color: var(--gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 30px;">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; color: var(--text-dark); margin-bottom: 16px;">Request Received</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; max-width: 550px; margin: 0 auto 30px; font-weight: 300;">
              Thank you, <strong>${guestName}</strong>. ${confirmationText}
            </p>
            <button onclick="window.location.reload();" class="btn btn-gold" style="padding: 10px 28px;">New Inquiry</button>
          </div>
        `;
      }, 1500);
    });
  }

});
