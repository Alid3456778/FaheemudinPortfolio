// ===== GSAP INITIALIZATION =====
gsap.registerPlugin(ScrollTrigger);

// ===== MOBILE MENU - FIXED =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

if (hamburger && mobileMenu) {
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== HERO ANIMATIONS =====
function heroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3
    })
    .to('.title-line-1', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.4')
    .to('.title-line-2', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.7')
    .to('.title-line-3', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.2)'
    }, '-=0.7')
    .to('.subtitle-text', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2
    }, '-=0.8')
    .to('.hero-cta', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.6')
    .to('.scroll-indicator', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4');
    
    // Building background parallax
    gsap.to('.hero-bg-building', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        opacity: 0.05
    });
}

// ===== SECTION TITLE ANIMATIONS =====
function animateSectionTitles() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        const label = header.querySelector('.section-label');
        const titleWords = header.querySelectorAll('.title-word');
        
        if (label) {
            gsap.from(label, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
        
        if (titleWords.length > 0) {
            gsap.from(titleWords, {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 1,
                ease: 'power3.out'
            });
        }
    });
}

// ===== STAT COUNTER ANIMATION =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: 'power2.out',
                    onUpdate: function() {
                        stat.innerText = Math.ceil(stat.innerText) + '+';
                    }
                });
            },
            once: true
        });
    });
}

// ===== ACHIEVEMENT CARDS ANIMATION - FIXED =====
// function animateAchievements() {
//     const achievementsGrid = document.querySelector('.achievements-grid');
//     const cards = document.querySelectorAll('.achievement-card');
    
//     if (achievementsGrid && cards.length > 0) {
//         gsap.from(cards, {
//             scrollTrigger: {
//                 trigger: achievementsGrid,
//                 start: 'top 80%',
//                 toggleActions: 'play none none none'
//             },
//             opacity: 1,
//             y: 80,
//             stagger: 0.15,
//             duration: 0.8,
//             ease: 'power3.out'
//         });
//     }
// }
// ===== ACHIEVEMENT ANIMATION - UPDATED =====
function animateAchievements() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    if (achievementItems.length > 0) {
        achievementItems.forEach((item, index) => {
            const number = item.querySelector('.achievement-number');
            const icon = item.querySelector('.achievement-icon-badge');
            const title = item.querySelector('.achievement-main-title');
            const meta = item.querySelector('.achievement-meta');
            const desc = item.querySelector('.achievement-desc');
            const tags = item.querySelector('.achievement-tags');
            
            // Main item fade in
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                x: -50,
                duration: 0.8,
                ease: 'power3.out'
            });
            
            // Stagger child elements
            const elements = [number, icon, title, meta, desc, tags].filter(el => el);
            
            gsap.from(elements, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 20,
                y: 30,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.3
            });
            
            // Animate the left border on scroll
            ScrollTrigger.create({
                trigger: item,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(item, {
                        '--border-height': '100%',
                        duration: 0.8,
                        ease: 'power2.out'
                    });
                },
                once: true
            });
        });
    }
}


// ===== TIMELINE ANIMATION =====
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        const isLeft = item.classList.contains('left');
        
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: isLeft ? -100 : 100,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

// ===== PROJECTS STICKY SCROLL - FIXED =====
function animateProjects() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach((item, index) => {
        const image = item.querySelector('.project-image');
        const content = item.querySelector('.project-content');
        
        // Fade in project on scroll
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
        
        // Only apply sticky parallax on desktop
        if (window.innerWidth > 1024 && image) {
            gsap.to(image, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -30
            });
        }
        
        // Animate project content elements
        if (content) {
            const projectNumber = content.querySelector('.project-number');
            const projectTitle = content.querySelector('.project-title');
            const projectMeta = content.querySelector('.project-meta');
            const projectDesc = content.querySelectorAll('.project-description');
            
            const elementsToAnimate = [projectNumber, projectTitle, projectMeta, ...projectDesc].filter(el => el);
            
            if (elementsToAnimate.length > 0) {
                gsap.from(elementsToAnimate, {
                    scrollTrigger: {
                        trigger: content,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 30,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
        }
    });
}

// ===== SKILLS ANIMATION =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const fill = bar.querySelector('.skill-fill');
        const width = fill.getAttribute('data-width');
        
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(fill, {
                    width: width + '%',
                    duration: 1.5,
                    ease: 'power2.out'
                });
            },
            once: true
        });
    });
}

// ===== CONTACT CARDS ANIMATION - FIXED =====
function animateContact() {
    const contactGrid = document.querySelector('.contact-grid');
    const contactCards = document.querySelectorAll('.contact-card');
    
    if (contactGrid && contactCards.length > 0) {
        gsap.from(contactCards, {
            scrollTrigger: {
                trigger: contactGrid,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 60,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
}

// ===== NAVBAR SCROLL EFFECT =====
function navbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    ScrollTrigger.create({
        start: 'top -100',
        onUpdate: (self) => {
            if (self.direction === -1) {
                navbar.style.transform = 'translateY(0)';
            } else if (self.direction === 1 && self.scroll() > 100) {
                navbar.style.transform = 'translateY(-100%)';
            }
        }
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
// function smoothScroll() {
//     const links = document.querySelectorAll('a[href^="#"]');
    
//     links.forEach(link => {
//         link.addEventListener('click', (e) => {
//             const href = link.getAttribute('href');
//             if (href === '#') return;
            
//             e.preventDefault();
//             const target = document.querySelector(href);
            
//             if (target) {
//                 gsap.to(window, {
//                     scrollTo: {
//                         y: target,
//                         offsetY: 80
//                     },
//                     duration: 1,
//                     ease: 'power3.inOut'
//                 });
//             }
//         });
//     });
// }

// ===== SMOOTH SCROLL FOR ANCHOR LINKS - NATIVE VERSION =====
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = 80; // Navbar height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// ===== INITIALIZE ALL ANIMATIONS =====
function initAnimations() {
    heroAnimations();
    animateSectionTitles();
    animateStats();
    animateAchievements();
    animateTimeline();
    animateProjects();
    animateSkills();
    animateContact();
    navbarScroll();
    smoothScroll();
}

// ===== RUN ON PAGE LOAD =====
window.addEventListener('load', () => {
    initAnimations();
});

// ===== RELOAD ON RESIZE (for responsive changes) =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});