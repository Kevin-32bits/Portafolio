// ==========================================
// 0. FORZADO ABSOLUTO AL INICIO EN MÓVILES
// ==========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    
    window.scrollTo(0, 0);

    // ==========================================
    // 1. MODO DÍA / NOCHE (TEMA OSCURO)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // ==========================================
    // 2. LÓGICA DEL PRELOADER
    // ==========================================
    const preloader = document.getElementById("preloader");
    let isLoadFinished = false; 
    
    setTimeout(() => {
        preloader.classList.add("fade-out");
        
        setTimeout(() => {
            preloader.style.display = "none";
            isLoadFinished = true; 
            
            window.scrollTo(0, 0);
            
            const inicioSection = document.querySelector('#inicio');
            inicioSection.classList.add('show-element');
            triggerTypewriter(inicioSection); 
            
        }, 500); 
    }, 2500); 

    // ==========================================
    // 3. MÁQUINA DE ESCRIBIR AISLADA
    // ==========================================
    function triggerTypewriter(section) {
        const typeElements = section.querySelectorAll('.auto-type');
        
        typeElements.forEach(el => {
            if (!el.classList.contains('typed')) {
                const text = el.getAttribute('data-text');
                const speed = parseInt(el.getAttribute('data-speed')) || 50; 
                const delay = parseInt(el.getAttribute('data-delay')) || 300; 
                
                el.innerHTML = ''; 
                let i = 0;
                
                function type() {
                    if (i < text.length) {
                        el.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    } else {
                        const cursor = el.nextElementSibling;
                        if(cursor && cursor.classList.contains('cursor')) {
                            cursor.style.display = 'none';
                        }
                    }
                }
                
                setTimeout(type, delay);
                el.classList.add('typed');
            }
        });
    }

    // ==========================================
    // 4. ANIMACIONES AL HACER SCROLL
    // ==========================================
    const elementsToAnimate = document.querySelectorAll(
        '.hero-image-wrapper, .about-image-wrapper, .about-content, .section-header, .project-card, .service-card'
    );
    
    elementsToAnimate.forEach(el => el.classList.add('hidden-element'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    elementsToAnimate.forEach(el => observer.observe(el));

    const sectionsToType = document.querySelectorAll('.section-animate');
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && isLoadFinished) {
                triggerTypewriter(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sectionsToType.forEach(sec => typewriterObserver.observe(sec));


    // ==========================================
    // 5. BARRA DE NAVEGACIÓN ACTIVA AL BAJAR
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});