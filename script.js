document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. Sticky Header scroll state
       ========================================== */
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load

    /* ==========================================
       2. Mobile Menu Toggle
       ========================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            navList.classList.toggle('open');
        });

        // Close mobile drawer when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navList.classList.remove('open');
            });
        });
    }

    /* ==========================================
       3. Typewriter Animation
       ========================================== */
    const typedTextEl = document.getElementById('typed-text');
    const words = [
        "Computer Engineering Student",
        "IoT & Hardware Enthusiast",
        "Frontend Developer",
        "Linux & Shell Lover"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeWriter = () => {
        if (!typedTextEl) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            typedTextEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeWriter, typingSpeed);
    };

    // Start typing animation
    typeWriter();

    /* ==========================================
       4. Intersection Observer for Scroll Reveals
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a skill card, animate its progress bars
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                if (progressBars.length > 0) {
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                }
                
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================
       5. Active Nav Link on Scroll
       ========================================== */
    const sections = document.querySelectorAll('section');
    
    const activeLinkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.35,
        rootMargin: '-80px 0px -50% 0px' // Adjust bounds for nav highlighting
    });

    sections.forEach(sec => {
        activeLinkObserver.observe(sec);
    });

    /* ==========================================
       6. Contact Form Validation & Mock Submission
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const btnSubmit = document.getElementById('btn-submit');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameVal = document.getElementById('name').value.trim();
            const emailVal = document.getElementById('email').value.trim();
            const subjectVal = document.getElementById('subject').value.trim();
            const messageVal = document.getElementById('message').value.trim();

            if (!nameVal || !emailVal || !subjectVal || !messageVal) {
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Please fill out all fields.';
                return;
            }

            // Simulate form submission
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = `
                <svg class="spin-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                Sending Message...
            `;

            setTimeout(() => {
                // Success State
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Your message has been sent successfully! Abhijith will contact you soon.';
                
                // Reset form fields
                contactForm.reset();
                
                // Restore button state
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    Send Message
                `;

                // Remove status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1800);
        });
    }
});
