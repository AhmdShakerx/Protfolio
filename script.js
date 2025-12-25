// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create particles for hero background
    createParticles();

    // Initialize animations
    initAnimations();

    // Initialize navigation
    initNavigation();

    // Initialize form handling
    initForm();
});

// Create particle animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 6;
        const duration = Math.random() * 12 + 8;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.4 + 0.12;

        particlesContainer.appendChild(particle);

        gsap.to(particle, {
            y: Math.random() * 80 - 40,
            x: Math.random() * 80 - 40,
            duration: duration,
            delay: delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

// Initialize animations
function initAnimations() {
    // Hero animations
    gsap.to('.hero-name', { opacity: 1, y: 0, duration: 1, delay: 0.35, ease: "power3.out" });
    gsap.to('.hero-tagline', { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out" });
    gsap.to('.cta-button', { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" });

    // About animations
    gsap.to('.about-image', {
        scrollTrigger: { trigger: '.about', start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out"
    });
    gsap.to('.about-text', {
        scrollTrigger: { trigger: '.about', start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 0.9, delay: 0.2, ease: "power3.out"
    });

    // Achievement cards
    gsap.to('.achievement-card', {
        scrollTrigger: { trigger: '.achievements', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out"
    });

    // Skills
  gsap.to('.skill', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        onComplete: animateSkillBars
    });

    // Projects
    gsap.to('.project-card', {
        scrollTrigger: { trigger: '.projects', start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: "power3.out"
    });

    // Contact info + form
    gsap.to('.contact-info', {
        scrollTrigger: { trigger: '.contact', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 0.9, ease: "power3.out"
    });

    gsap.to('.contact-form', {
        scrollTrigger: { trigger: '.contact', start: 'top 78%', toggleActions: 'play none none none' },
        opacity: 1, x: 0, duration: 1, delay: 0.2, ease: "power3.out"
    });

    // Extra subtle floating for select cards
    gsap.utils.toArray('.achievement-card, .project-card').forEach((el, i) => {
        gsap.to(el, { y: "-=6", duration: 6 + (i % 3), repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.1 });
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.to(bar, {
            width: width,
            duration: 2,
            ease: "power3.out"
        });
    });
}

// Initialize navigation
function initNavigation() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
 const navbarHeight = document.querySelector('.navbar').offsetHeight;

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // تحديث active link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    

            // Close mobile menu
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');

            gsap.to(window, { duration: 0.9, scrollTo: targetSection, ease: "power3.inOut" });

            navItems.forEach(link => link.classList.remove('active'));
            item.classList.add('active');
        });
    });

    const sections = document.querySelectorAll('section');
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 220 && window.scrollY < sectionTop + sectionHeight - 220) {
                current = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href') || '';
            if (href === `#${current}`) item.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateActiveNav);
}

// Initialize form handling and GSAP micro-animations
function initForm() {
    const contactForm = document.querySelector('#contactForm');

    // GSAP pop-in for form and fields
    gsap.from(".contact-form form", { opacity: 0, scale: 0.98, y: 24, duration: 0.9, ease: "power3.out" });
    gsap.utils.toArray(".form-group").forEach((group, i) => {
        gsap.from(group, { opacity: 0, y: 16, delay: 0.22 + i * 0.06, duration: 0.6, ease: "power2.out" });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Collect data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());
            console.log('Form submitted:', formObject);

            // Simple success micro-animation
            gsap.to(contactForm, { scale: 0.98, opacity: 0.95, duration: 0.15, yoyo: true, repeat: 1 });
            // Show friendly message
            alert('Thank you for your message — I will get back to you soon.');

            contactForm.reset();
            // remove focused class from form-groups
            document.querySelectorAll('.form-group').forEach(g => g.classList.remove('focused'));
        });
    }

    // Focus effects for floating labels
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        const parent = input.closest('.form-group');
        // when focusing
        input.addEventListener('focus', () => {
            if (parent) parent.classList.add('focused');
            gsap.to(input, { boxShadow: "0 10px 30px rgba(14,165,233,0.09)", duration: 0.35 });
        });
        // when blurring
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                if (parent) parent.classList.remove('focused');
            }
            gsap.to(input, { boxShadow: "none", duration: 0.2 });
        });
    });
}

// Add floating animation to some elements
function addFloatingAnimation() {
    const elementsToFloat = document.querySelectorAll('.achievement-card, .project-card');
    elementsToFloat.forEach(el => el.classList.add('floating'));
}

// Initialize when page is fully loaded
window.addEventListener('load', function() {
    addFloatingAnimation();
});
