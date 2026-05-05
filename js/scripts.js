/* ============================================
   ENISA - Scripts Interactivos
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }

    // ========================================
    // SMOOTH SCROLL PARA ENLACES INTERNOS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#contacto') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // ACTIVE NAV LINK EN SCROLL
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // ========================================
    // ANIMATIONS ON SCROLL
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Agregar clase animate-on-scroll a elementos que queremos observar
    const animatedElements = document.querySelectorAll(
        '.service-card, .feature-card, .testimonial-card, .partner-item, .about-content'
    );

    animatedElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // ========================================
    // VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener valores
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validar campos obligatorios
            let errors = [];

            if (!name) {
                errors.push('Por favor, ingrese su nombre');
            }

            if (!email) {
                errors.push('Por favor, ingrese su email');
            } else if (!isValidEmail(email)) {
                errors.push('Por favor, ingrese un email válido');
            }

            if (!message) {
                errors.push('Por favor, ingrese su mensaje');
            }

            // Mostrar resultado
            if (errors.length > 0) {
                alert('Errores en el formulario:\n' + errors.join('\n'));
            } else {
                // Simular envío (aquí iría el código real de envío)
                alert('¡Gracias por su consulta! Nos pondremos en contacto pronto.');

                // Limpiar formulario
                contactForm.reset();
            }
        });
    }

    // Función para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ========================================
    // EFECTO PARALLAX EN HERO
    // ========================================
    const heroBg = document.querySelector('.hero-bg img');

    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // ========================================
    // CONTADOR ANIMADO PARA ESTADÍSTICAS
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[0-9]/g, '');

                if (!target.dataset.animated) {
                    animateCounter(target, numericValue, suffix);
                    target.dataset.animated = 'true';
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });

    function animateCounter(element, target, suffix) {
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = current + suffix;
        }, stepTime);
    }

    // ========================================
    // TOOLTIP PARA BOTONES
    // ========================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.setAttribute('title', 'Chatear por WhatsApp');
    }

    // ========================================
    // MANEJO DE ERRORES DE IMÁGENES
    // ========================================
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // ========================================
    // PREFERRING REDUCED MOTION
    // ========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.remove('animate-on-scroll');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    console.log('ENISA - Site loaded successfully');
});

// ========================================
// FUNCIONES GLOBALES
// ========================================

// Función para cerrar menú móvil desde el HTML
function closeMobileMenu() {
    const nav = document.getElementById('nav');
    const mobileToggle = document.getElementById('mobile-toggle');
    if (nav) nav.classList.remove('active');
    if (mobileToggle) mobileToggle.classList.remove('active');
}