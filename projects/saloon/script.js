document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Drawer Toggling
  const menuBtn = document.getElementById('menu-btn');
  const menuPanel = document.getElementById('menu-panel');

  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', () => {
      menuPanel.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });

    const links = menuPanel.querySelectorAll('.nav-link, .book-cta-btn');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuPanel.classList.remove('active');
        menuBtn.classList.remove('active');
      });
    });
  }

  // 2. Active Scrolling Navigation Highlights
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Services Menu Tab Switcher
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuLists = document.querySelectorAll('.service-menu-list');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = `menu-${btn.getAttribute('data-category')}`;
      
      menuLists.forEach(list => {
        if (list.getAttribute('id') === targetCategory) {
          list.classList.add('active');
        } else {
          list.classList.remove('active');
        }
      });
    });
  });

  // 4. Stylist Click Auto-Selector
  const stylistCards = document.querySelectorAll('.stylist-card');
  const stylistSelector = document.getElementById('stylist-choice');

  stylistCards.forEach(card => {
    card.addEventListener('click', () => {
      // Toggle card visual active state
      stylistCards.forEach(c => c.style.borderColor = 'rgba(0, 0, 0, 0.04)');
      card.style.borderColor = 'var(--rose)';

      const stylistName = card.getAttribute('data-stylist');
      if (stylistSelector) {
        if (stylistName.includes('Julian')) stylistSelector.value = 'julian';
        if (stylistName.includes('Clara')) stylistSelector.value = 'clara';
        if (stylistName.includes('Marcus')) stylistSelector.value = 'marcus';
      }

      // Smooth scroll to form
      const bookingSection = document.getElementById('book');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Booking Form Submission Handler
  const bookingForm = document.getElementById('saloon-booking-form');
  const bookingBox = document.querySelector('.booking-box');

  if (bookingForm && bookingBox) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('book-name').value;
      const phone = document.getElementById('book-phone').value;
      const serviceSelect = document.getElementById('service-choice');
      const chosenService = serviceSelect.options[serviceSelect.selectedIndex].text;
      const stylistSelect = document.getElementById('stylist-choice');
      const chosenStylist = stylistSelect.options[stylistSelect.selectedIndex].text;
      const dateVal = document.getElementById('book-date').value;

      const submitBtn = document.getElementById('booking-submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING REQUEST...';

      setTimeout(() => {
        // Change booking box display
        bookingBox.innerHTML = `
          <div style="text-align: center; padding: 40px 10px; animation: tabFadeIn 0.5s ease-out;">
            <div style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid var(--rose); color: var(--rose); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; color: var(--text-dark); margin-bottom: 16px;">Request Transmitted</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; max-width: 550px; margin: 0 auto 24px; font-weight: 300;">
              Thank you, <strong>${clientName}</strong>. We have logged your request for a <strong>${chosenService}</strong> session with <strong>${chosenStylist}</strong> on <strong>${dateVal}</strong>. 
              Our salon coordinator will call you at <strong>${phone}</strong> shortly to confirm calendar availability.
            </p>
            <button onclick="window.location.reload();" class="btn btn-rose" style="padding: 10px 28px;">New Request</button>
          </div>
        `;
      }, 1500);
    });
  }

});
