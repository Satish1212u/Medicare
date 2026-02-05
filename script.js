// Global popup reference so it can be used in all handlers
const popup = document.getElementById('appointmentPopup');

function generateAppointmentSerial() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `APP-${y}${m}${d}-${rand}`;
}

function updateAppointmentSerial() {
  const serialEl = document.getElementById('appointmentSerial');
  if (serialEl) serialEl.textContent = generateAppointmentSerial();
}

// Appointment popup open/close - Works for all pages
function initAppointmentPopup() {
  const appointmentBtns = document.querySelectorAll('#appointmentBtn, .btn-appointment, .btn-book-appointment');
  const closeBtn = document.querySelector('.close');

  appointmentBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (popup) {
        updateAppointmentSerial();
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  }

  if (popup) {
    window.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  }
}

// Initialize on page load
initAppointmentPopup();

// Form submission (all forms except login/register - those are handled by auth.js)
const forms = document.querySelectorAll('form:not(#loginForm):not(#registerForm)');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your appointment request has been submitted. We will contact you shortly to confirm.');
    if (popup) popup.style.display = 'none';
    form.reset();
  });
});

// Specialty Data
const specialtyData = {
  dentist: {
    title: "Dentistry",
    subtitle: "Complete Oral Health Care",
    icon: "fas fa-tooth",
    about: "Our dental department provides comprehensive oral health care services including preventive, cosmetic, and restorative treatments. We use the latest technology and techniques to ensure optimal dental health for all our patients.",
    services: [
      "Routine Dental Checkups & Cleanings",
      "Teeth Whitening & Cosmetic Procedures",
      "Root Canal Treatment",
      "Dental Implants",
      "Orthodontic Services",
      "Oral Surgery",
      "Periodontal Treatment",
      "Pediatric Dentistry"
    ],
    treatments: [
      "Cavity Fillings",
      "Crowns and Bridges",
      "Dentures",
      "Teeth Extraction",
      "Gum Disease Treatment",
      "Dental Emergency Care"
    ],
    stats: {
      doctors: "45+",
      appointments: "2,500+",
      successRate: "98%"
    }
  },
  pediatric: {
    title: "Pediatrics",
    subtitle: "Specialized Care for Children",
    icon: "fas fa-baby",
    about: "Our pediatric department is dedicated to providing comprehensive healthcare for infants, children, and adolescents. Our team of experienced pediatricians ensures the best possible care for your child's physical, emotional, and developmental needs.",
    services: [
      "Well-Child Visits & Vaccinations",
      "Newborn Care",
      "Child Development Assessment",
      "Pediatric Emergency Care",
      "Chronic Disease Management",
      "Adolescent Health Services",
      "Behavioral Health",
      "Nutrition Counseling"
    ],
    treatments: [
      "Childhood Illness Treatment",
      "Growth & Development Monitoring",
      "Immunization Programs",
      "Asthma Management",
      "Allergy Testing & Treatment",
      "Sports Physicals"
    ],
    stats: {
      doctors: "60+",
      appointments: "4,000+",
      successRate: "97%"
    }
  },
  cardiology: {
    title: "Cardiology",
    subtitle: "Expert Heart Care",
    icon: "fas fa-heartbeat",
    about: "Our cardiology department offers advanced cardiovascular care with state-of-the-art diagnostic and treatment facilities. Our team of board-certified cardiologists provides comprehensive heart health services to prevent, diagnose, and treat cardiovascular diseases.",
    services: [
      "Cardiac Consultation & Evaluation",
      "Echocardiography",
      "Stress Testing",
      "Cardiac Catheterization",
      "Electrocardiogram (ECG/EKG)",
      "Holter Monitoring",
      "Cardiac Rehabilitation",
      "Preventive Cardiology"
    ],
    treatments: [
      "Coronary Angioplasty",
      "Heart Valve Repair/Replacement",
      "Arrhythmia Treatment",
      "Heart Failure Management",
      "Hypertension Treatment",
      "Cardiac Surgery"
    ],
    stats: {
      doctors: "35+",
      appointments: "3,200+",
      successRate: "96%"
    }
  },
  traumatology: {
    title: "Traumatology",
    subtitle: "Emergency & Trauma Care",
    icon: "fas fa-ambulance",
    about: "Our traumatology department specializes in the treatment of injuries caused by accidents, falls, and other traumatic events. We provide 24/7 emergency trauma care with rapid response teams and advanced surgical capabilities.",
    services: [
      "Emergency Trauma Surgery",
      "Fracture Management",
      "Head & Spinal Injury Treatment",
      "Multiple Trauma Care",
      "Reconstructive Surgery",
      "Trauma Rehabilitation",
      "Pain Management",
      "Post-Trauma Counseling"
    ],
    treatments: [
      "Fracture Repair & Fixation",
      "Wound Management",
      "Internal Organ Repair",
      "Joint Reconstruction",
      "Nerve Repair",
      "Emergency Stabilization"
    ],
    stats: {
      doctors: "40+",
      appointments: "1,800+",
      successRate: "94%"
    }
  },
  orthopedics: {
    title: "Orthopedics",
    subtitle: "Bone, Joint & Muscle Care",
    icon: "fas fa-bone",
    about: "Our orthopedic department provides expert treatment for conditions affecting the musculoskeletal system including bones, joints, muscles, ligaments, and tendons. We offer both surgical and non-surgical treatment options.",
    services: [
      "Joint Replacement Surgery",
      "Sports Medicine",
      "Spine Surgery",
      "Hand & Wrist Surgery",
      "Foot & Ankle Care",
      "Arthroscopic Surgery",
      "Physical Therapy",
      "Pain Management"
    ],
    treatments: [
      "Hip & Knee Replacement",
      "Arthroscopy",
      "Fracture Treatment",
      "Tendon Repair",
      "Cartilage Restoration",
      "Spinal Fusion"
    ],
    stats: {
      doctors: "50+",
      appointments: "3,500+",
      successRate: "95%"
    }
  },
  anesthesiology: {
    title: "Anesthesiology",
    subtitle: "Safe Anesthesia & Pain Management",
    icon: "fas fa-syringe",
    about: "Our anesthesiology department ensures safe and effective anesthesia administration for surgical procedures. Our board-certified anesthesiologists provide comprehensive perioperative care and pain management services.",
    services: [
      "General Anesthesia",
      "Regional Anesthesia",
      "Local Anesthesia",
      "Pain Management",
      "Preoperative Assessment",
      "Postoperative Care",
      "Chronic Pain Treatment",
      "Epidural & Spinal Anesthesia"
    ],
    treatments: [
      "Surgical Anesthesia",
      "Pain Block Injections",
      "Nerve Blocks",
      "Pain Pump Management",
      "Acute Pain Control",
      "Chronic Pain Therapy"
    ],
    stats: {
      doctors: "30+",
      appointments: "2,200+",
      successRate: "99%"
    }
  },
  rheumatology: {
    title: "Rheumatology",
    subtitle: "Arthritis & Autoimmune Care",
    icon: "fas fa-hand-holding-medical",
    about: "Our rheumatology department specializes in the diagnosis and treatment of rheumatic diseases, autoimmune disorders, and conditions affecting joints, muscles, and connective tissues.",
    services: [
      "Arthritis Diagnosis & Treatment",
      "Autoimmune Disease Management",
      "Lupus Treatment",
      "Rheumatoid Arthritis Care",
      "Osteoporosis Management",
      "Fibromyalgia Treatment",
      "Joint Injections",
      "Biologic Therapy"
    ],
    treatments: [
      "Disease-Modifying Therapy",
      "Joint Aspiration & Injection",
      "Immunosuppressive Therapy",
      "Physical Therapy Referral",
      "Pain Management",
      "Lifestyle Modification Counseling"
    ],
    stats: {
      doctors: "25+",
      appointments: "1,500+",
      successRate: "92%"
    }
  },
  andrology: {
    title: "Andrology",
    subtitle: "Men's Health & Urology",
    icon: "fas fa-mars",
    about: "Our andrology department focuses on male reproductive health and urological conditions. We provide comprehensive care for male fertility issues, sexual health, and urological disorders.",
    services: [
      "Male Infertility Treatment",
      "Erectile Dysfunction Care",
      "Prostate Health",
      "Sexual Health Counseling",
      "Hormone Therapy",
      "Vasectomy & Reversal",
      "Male Menopause Treatment",
      "Urological Surgery"
    ],
    treatments: [
      "Fertility Assessment",
      "Sperm Analysis",
      "Hormone Replacement",
      "Prostate Treatment",
      "Penile Implants",
      "Microsurgery"
    ],
    stats: {
      doctors: "20+",
      appointments: "1,200+",
      successRate: "93%"
    }
  },
  orthodontics: {
    title: "Orthodontics",
    subtitle: "Teeth Alignment & Correction",
    icon: "fas fa-smile",
    about: "Our orthodontics department specializes in correcting teeth and jaw alignment issues. We offer various orthodontic treatments including traditional braces, clear aligners, and other advanced correction methods.",
    services: [
      "Traditional Metal Braces",
      "Clear/Invisible Aligners",
      "Ceramic Braces",
      "Lingual Braces",
      "Retainers",
      "Orthodontic Consultation",
      "Jaw Alignment Correction",
      "Space Maintainers"
    ],
    treatments: [
      "Teeth Straightening",
      "Bite Correction",
      "Crowding Treatment",
      "Gap Closure",
      "Overbite/Underbite Correction",
      "Orthodontic Surgery"
    ],
    stats: {
      doctors: "28+",
      appointments: "2,000+",
      successRate: "97%"
    }
  }
};

// Speciality buttons toggle with data display
const specialityButtons = document.querySelectorAll('.speciality-btn');
const specialtyInfoContainer = document.getElementById('specialtyInfo');
const specialtyTitle = document.querySelector('.specialty-title');
const specialtySubtitle = document.querySelector('.specialty-subtitle');
const specialtyIcon = document.querySelector('.specialty-icon');
const specialtyAbout = document.querySelector('.specialty-about');
const servicesList = document.querySelector('.services-list');
const treatmentsList = document.querySelector('.treatments-list');
const statValues = document.querySelectorAll('.stat-value');

function displaySpecialtyData(specialtyKey) {
  const data = specialtyData[specialtyKey];
  if (!data) return;

  // Update header
  specialtyTitle.textContent = data.title;
  specialtySubtitle.textContent = data.subtitle;
  specialtyIcon.className = `specialty-icon ${data.icon}`;
  
  // Update about
  specialtyAbout.textContent = data.about;
  
  // Update services
  servicesList.innerHTML = '';
  data.services.forEach(service => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-check-circle"></i> ${service}`;
    servicesList.appendChild(li);
  });
  
  // Update treatments
  treatmentsList.innerHTML = '';
  data.treatments.forEach(treatment => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-check"></i> ${treatment}`;
    treatmentsList.appendChild(li);
  });
  
  // Update stats
  if (statValues.length >= 3) {
    statValues[0].textContent = data.stats.doctors;
    statValues[1].textContent = data.stats.appointments;
    statValues[2].textContent = data.stats.successRate;
  }
  
  // Show the info container
  specialtyInfoContainer.style.display = 'block';
  specialtyInfoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Initialize with default specialty (Traumatology)
if (specialtyInfoContainer) {
  displaySpecialtyData('traumatology');
}

specialityButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    specialityButtons.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Get specialty key from data attribute
    const specialtyKey = btn.getAttribute('data-specialty');
    if (specialtyKey) {
      displaySpecialtyData(specialtyKey);
    }
  });
});

// Specialty appointment button
const specialtyAppointmentBtn = document.getElementById('specialtyAppointmentBtn');
if (specialtyAppointmentBtn) {
  specialtyAppointmentBtn.addEventListener('click', () => {
    const popup = document.getElementById('appointmentPopup');
    if (popup) {
      updateAppointmentSerial();
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
}

// Filter buttons toggle
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Here you could filter the doctor cards based on the selected filter
  });
});

// Enhanced Testimonial Carousel with Smooth Animations
function initTestimonialCarousel() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testimonialDots = document.querySelectorAll('.dot');
  const carousel = document.querySelector('.testimonials-carousel');
  
  if (testimonialCards.length === 0) return;
  
  let currentTestimonial = 0;
  let testimonialInterval;
  let isPaused = false;

  function showTestimonial(index) {
    // Remove active class from all
    testimonialCards.forEach((card) => {
      card.classList.remove('active');
    });
    testimonialDots.forEach((dot) => {
      dot.classList.remove('active');
    });

    // Add active class to current
    const currentCard = Array.from(testimonialCards).find(card => 
      parseInt(card.getAttribute('data-index')) === index
    );
    const currentDot = Array.from(testimonialDots).find(dot => 
      parseInt(dot.getAttribute('data-dot')) === index
    );

    if (currentCard) {
      currentCard.classList.add('active');
      // Smooth scroll to active card
      if (carousel) {
        currentCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    if (currentDot) {
      currentDot.classList.add('active');
    }
    
    currentTestimonial = index;
  }

  // Initialize dots click handlers
  testimonialDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-dot'));
      showTestimonial(index);
      // Reset auto-rotate timer
      clearInterval(testimonialInterval);
      startTestimonialAutoRotate();
    });
  });

  // Pause on hover
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      isPaused = true;
      clearInterval(testimonialInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      isPaused = false;
      startTestimonialAutoRotate();
    });
  }

  // Auto-rotate testimonials with smooth transitions
  function startTestimonialAutoRotate() {
    clearInterval(testimonialInterval);
    if (!isPaused && testimonialCards.length > 0) {
      testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
      }, 4000); // Changed to 4 seconds for better engagement
      window.testimonialInterval = testimonialInterval; // Store globally for access
    }
  }

  // Find which testimonial is initially active
  const activeCard = Array.from(testimonialCards).find(card => card.classList.contains('active'));
  const initialIndex = activeCard ? parseInt(activeCard.getAttribute('data-index')) : 0;
  
  // Start with active testimonial or first one
  showTestimonial(initialIndex);
  
  // Start auto-rotate
  startTestimonialAutoRotate();
}

// Initialize testimonial carousel
initTestimonialCarousel();

// Testimonial Navigation Buttons
function initTestimonialNavigation() {
  const testimonialPrev = document.getElementById('testimonialPrev');
  const testimonialNext = document.getElementById('testimonialNext');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  if (!testimonialPrev || !testimonialNext || testimonialCards.length === 0) return;

  let currentIndex = 0;
  
  // Find current active index
  const activeCard = Array.from(testimonialCards).find(card => card.classList.contains('active'));
  if (activeCard) {
    currentIndex = parseInt(activeCard.getAttribute('data-index'));
  }

  function goToTestimonial(index) {
    if (index < 0) index = testimonialCards.length - 1;
    if (index >= testimonialCards.length) index = 0;
    
    testimonialCards.forEach((card) => {
      const cardIndex = parseInt(card.getAttribute('data-index'));
      card.classList.toggle('active', cardIndex === index);
    });
    
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
      const dotIndex = parseInt(dot.getAttribute('data-dot'));
      dot.classList.toggle('active', dotIndex === index);
    });
    
    currentIndex = index;
    
    // Reset auto-rotate
    if (window.testimonialInterval) {
      clearInterval(window.testimonialInterval);
    }
    initTestimonialCarousel();
  }

  testimonialPrev.addEventListener('click', () => {
    goToTestimonial(currentIndex - 1);
  });

  testimonialNext.addEventListener('click', () => {
    goToTestimonial(currentIndex + 1);
  });
}

// Initialize navigation after carousel
setTimeout(() => {
  initTestimonialNavigation();
}, 100);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
  } else {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
  }
  
  lastScroll = currentScroll;
});

// Facility carousel (simple version)
const carouselArrows = document.querySelectorAll('.carousel-arrow');
carouselArrows.forEach(arrow => {
  arrow.addEventListener('click', () => {
    // This is a placeholder - you can implement actual carousel logic here
    console.log('Carousel arrow clicked');
  });
});

// Chat button functionality
const chatButtons = document.querySelectorAll('.btn-chat');
chatButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Chat feature coming soon!');
  });
});

// Contact button functionality
const contactButtons = document.querySelectorAll('.btn-contact');
contactButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Contact form will open here!');
  });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on a link
  const navLinkItems = navLinks.querySelectorAll('a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
}

// Newsletter Form
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      const email = emailInput.value;
      alert(`Thank you for subscribing! We'll send updates to ${email}`);
      form.reset();
    }
  });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    alert(`Thank you, ${data.firstName}! Your message has been received. We'll get back to you within 24 hours at ${data.email}.`);
    
    // Reset form
    contactForm.reset();
  });
}

