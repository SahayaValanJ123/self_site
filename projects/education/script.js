document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Drawer Toggle
  const menuTrigger = document.getElementById('mobile-menu-trigger');
  const mainNavigation = document.getElementById('main-navigation');
  const drawerOverlay = document.getElementById('menu-drawer-overlay');

  if (menuTrigger && mainNavigation && drawerOverlay) {
    const toggleMenu = () => {
      mainNavigation.classList.toggle('active');
      drawerOverlay.classList.toggle('active');
      menuTrigger.classList.toggle('active');
      
      // Close/Open locks scroll
      if (mainNavigation.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    menuTrigger.addEventListener('click', toggleMenu);
    drawerOverlay.addEventListener('click', toggleMenu);

    // Close when navigating
    const links = mainNavigation.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        mainNavigation.classList.remove('active');
        drawerOverlay.classList.remove('active');
        menuTrigger.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 2. Course Category Filtering
  const catButtons = document.querySelectorAll('.cat-btn');
  const courseCards = document.querySelectorAll('.course-card');

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-category');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
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

  // 3. Testimonial Carousel
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('carousel-prev-btn');
  const nextBtn = document.getElementById('carousel-next-btn');
  let currentSlideIndex = 0;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
  };

  if (prevBtn && nextBtn && slides.length > 0) {
    prevBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      showSlide(currentSlideIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      showSlide(currentSlideIndex);
    });
  }

  // 4. Enrollment Modal Controller
  const enrollModal = document.getElementById('enrollment-modal');
  const enrollTriggers = document.querySelectorAll('.enroll-trigger, #header-enroll-btn, #hero-register-btn');
  const enrollClose = document.getElementById('enroll-close-btn');
  const enrollOverlay = document.getElementById('enroll-modal-overlay');
  const courseSelection = document.getElementById('course-selection');

  const openEnrollModal = (preselectedCourse = '') => {
    if (preselectedCourse && courseSelection) {
      // Map triggers or categories to select options
      if (preselectedCourse.includes('Software')) {
        courseSelection.value = 'coding';
      } else if (preselectedCourse.includes('Design')) {
        courseSelection.value = 'design';
      } else if (preselectedCourse.includes('Management')) {
        courseSelection.value = 'product';
      } else if (preselectedCourse.includes('Next.js')) {
        courseSelection.value = 'frontend';
      }
    }
    enrollModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeEnrollModal = () => {
    enrollModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  enrollTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Check if button is on a specific course card to pre-select it
      const card = e.target.closest('.course-card');
      let title = '';
      if (card) {
        title = card.querySelector('h3').textContent;
      }
      openEnrollModal(title);
    });
  });

  if (enrollClose) enrollClose.addEventListener('click', closeEnrollModal);
  if (enrollOverlay) enrollOverlay.addEventListener('click', closeEnrollModal);

  // 5. Interest Form Handler
  const interestForm = document.getElementById('enrollment-interest-form');
  const modalBody = document.getElementById('enroll-modal-body');

  if (interestForm && modalBody) {
    interestForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('student-name').value;
      const selectedOptionText = courseSelection.options[courseSelection.selectedIndex].text;
      
      const submitBtn = document.getElementById('enroll-submit-button');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Recording application...';

      setTimeout(() => {
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 20px 0; animation: modalEnter 0.4s ease-out;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background-color: var(--primary-glow); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
              <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2.5" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.6rem; margin-bottom: 12px;">Inquiry Confirmed</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
              Hi <strong>${studentName}</strong>, thank you for your interest in our <strong>${selectedOptionText}</strong> program. An academic advisor will reach out to you within 24 hours to schedule your placement interview.
            </p>
            <button onclick="window.location.reload();" class="btn btn-secondary" style="padding: 10px 24px;">Close Window</button>
          </div>
        `;
      }, 1000);
    });
  }

});
