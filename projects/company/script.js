document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Navigation Toggler
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const navigationBar = document.getElementById('navigation-bar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggleBtn && navigationBar) {
    menuToggleBtn.addEventListener('click', () => {
      navigationBar.classList.toggle('active');
      menuToggleBtn.classList.toggle('active');
    });

    // Close menu when navigation links are clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navigationBar.classList.remove('active');
        menuToggleBtn.classList.remove('active');
      });
    });
  }

  // 2. Active Section Scroll Highlighting
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 100; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Solution Card Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 4. Statistics Incrementing Animation
  const statsSection = document.getElementById('stats');
  const statTargets = [
    { id: 'stat-client-count', target: 240, suffix: '+' },
    { id: 'stat-logistics-volume', target: 45, suffix: 'M+' },
    { id: 'stat-capital-raised', target: 6.8, suffix: 'B', isFloat: true },
    { id: 'stat-roi-boost', target: 32, suffix: '%' }
  ];

  let statsAnimated = false;

  const animateStats = () => {
    statTargets.forEach(stat => {
      const element = document.getElementById(stat.id);
      if (!element) return;

      let start = 0;
      const duration = 1500; // ms
      const stepTime = 30; // ms
      const steps = duration / stepTime;
      const increment = stat.target / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        start += increment;
        
        if (stat.isFloat) {
          element.textContent = start.toFixed(1) + stat.suffix;
        } else {
          element.textContent = Math.floor(start) + stat.suffix;
        }

        if (currentStep >= steps) {
          clearInterval(timer);
          element.textContent = stat.target + stat.suffix;
        }
      }, stepTime);
    });
  };

  // Intersection Observer for stats
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          statsAnimated = true;
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // 5. Solution Modal System
  const modal = document.getElementById('service-detail-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalClose = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay-bg');

  const solutionDetails = {
    "Enterprise Strategy": {
      desc: "Our Enterprise Strategy practice enables organizations to create adaptive roadmaps for structural growth and high-performance operations.",
      features: [
        "Corporate restructure and diagnostic evaluation",
        "Geopolitical exposure modeling and geographic expansion",
        "Digital system architecture roadmap definitions",
        "Cross-functional operational performance audits"
      ]
    },
    "Logistics Optimization": {
      desc: "We analyze, model, and restructure global distribution channels to ensure prompt shipping, optimal stock levels, and supply safety.",
      features: [
        "Automated routing and network-wide simulation modeling",
        "Third-party logistics (3PL/4PL) evaluation and auditing",
        "Cold chain and specialized transport solutions",
        "Custom warehouse automation planning"
      ]
    },
    "Mergers & Acquisitions": {
      desc: "Our advisors lead high-stakes integrations, valuations, and corporate transactions with institutional rigor.",
      features: [
        "Target asset sourcing and initial evaluation diagnostics",
        "Tax exposure and balance sheet restructuring advice",
        "Post-merger organizational alignment planning",
        "Regulatory compliance audits across international borders"
      ]
    },
    "Market Diagnostics": {
      desc: "Leverage clean consumer insight reports and economic research to enter new fields with confidence.",
      features: [
        "Competitor positioning matrices and feature breakdowns",
        "Predictive demographic modeling using econometric algorithms",
        "B2B and retail purchase-funnel behavior testing",
        "Brand reputation risk assessment"
      ]
    },
    "Supply Chain Resiliency": {
      desc: "Mitigate production friction and secure critical pipelines through diverse procurement strategies.",
      features: [
        "Sourcing diversification and local supply partner pairing",
        "Warehouse buffer calculation using adaptive statistics",
        "Supplier performance tracking and scorecards",
        "Disaster recovery planning and response simulations"
      ]
    },
    "Cost Restructuring": {
      desc: "Achieve maximum operating margins without sacrificing business velocity or product quality.",
      features: [
        "Capital expenditure vs. operational expenditure optimizations",
        "Administrative bottleneck auditing",
        "Software ecosystem and license optimization",
        "Process automation opportunities assessment"
      ]
    }
  };

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').textContent;
      const details = solutionDetails[title];
      if (!details) return;

      // Populate modal content
      modalBody.innerHTML = `
        <h2>${title}</h2>
        <p style="margin-bottom: 20px; color: var(--text-muted); font-size: 1.05rem;">${details.desc}</p>
        <h4 style="font-family: var(--font-heading); margin-bottom: 12px;">Core Focus Areas</h4>
        <ul style="padding-left: 20px; margin-bottom: 24px;">
          ${details.features.map(feat => `<li style="margin-bottom: 8px; font-size: 0.95rem; color: var(--text-muted);">${feat}</li>`).join('')}
        </ul>
        <a href="#contact" class="btn btn-primary" id="modal-cta-btn" style="width: 100%;">Inquire About This Service</a>
      `;

      // Show Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Attach listener inside modal button to close it and jump to contact
      document.getElementById('modal-cta-btn').addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // 6. Contact Form Submission Handler
  const consultationForm = document.getElementById('strategy-consultation-form');
  const formPanel = document.querySelector('.contact-form-panel');

  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Read form data
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const company = document.getElementById('contact-company').value || 'Not Specified';

      // Perform simulated loading state
      const submitBtn = document.getElementById('form-submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing request...';

      setTimeout(() => {
        // Change form panel contents to show glassmorphic success card
        formPanel.innerHTML = `
          <div style="text-align: center; padding: 20px 0; animation: modalReveal 0.4s ease-out;">
            <div style="width: 60px; height: 60px; border-radius: 50%; background-color: var(--primary-glow); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
              <svg viewBox="0 0 24 24" width="30" height="30" stroke="currentColor" stroke-width="2.5" fill="none"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.75rem; margin-bottom: 12px; font-weight: 700;">Request Submitted</h3>
            <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 1rem; line-height: 1.6;">
              Thank you, <strong>${name}</strong>. A diagnostic advisor has logged a request for <strong>${company}</strong>. We will contact you at <strong>${email}</strong> within 1 business day.
            </p>
            <button onclick="window.location.reload();" class="btn btn-secondary" style="padding: 10px 24px;">Submit Another Inquiry</button>
          </div>
        `;
      }, 1200);
    });
  }

});
