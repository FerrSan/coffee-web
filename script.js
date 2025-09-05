  // Debug external resources
        window.addEventListener('error', (e) => {
            console.error('Resource failed to load:', e.target.src || e.target.href);
        });

        // Loader
        window.addEventListener('load', () => {
            console.log('Page loaded, hiding loader...');
            setTimeout(() => {
                const loader = document.querySelector('.loader');
                if (loader) {
                    loader.classList.add('hidden');
                    console.log('Loader hidden');
                    // Remove loader completely after transition
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                } else {
                    console.error('Loader element not found');
                }
            }, 1000);
        });

        // Fallback to hide loader if window.load doesn't fire
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM Content Loaded');
            
            // Check if basic elements exist
            const loader = document.querySelector('.loader');
            const header = document.querySelector('header');
            const heroSection = document.querySelector('.hero-section');
            
            console.log('Elements found:', {
                loader: !!loader,
                header: !!header,
                heroSection: !!heroSection
            });
            
            setTimeout(() => {
                if (loader && !loader.classList.contains('hidden')) {
                    console.log('Fallback: hiding loader via DOMContentLoaded');
                    loader.classList.add('hidden');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                }
            }, 3000);
        });

        // Mobile Menu Toggle
        const menuOpenButton = document.querySelector("#menu-open-button");
        const menuCloseButton = document.querySelector("#menu-close-button");

        menuOpenButton.addEventListener("click", (e) => {
            e.preventDefault();
            document.body.classList.toggle("show-mobile-menu");
        });

        menuCloseButton.addEventListener("click", (e) => {
            e.preventDefault();
            document.body.classList.remove("show-mobile-menu");
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('show-mobile-menu');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.querySelector('.nav-menu');
            if (document.body.classList.contains('show-mobile-menu') && 
                !navMenu.contains(e.target) && 
                e.target !== menuOpenButton) {
                document.body.classList.remove('show-mobile-menu');
            }
        });

        // Prevent scrolling when mobile menu is open
        const menuObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const hasMenu = document.body.classList.contains('show-mobile-menu');
                    document.body.style.overflow = hasMenu ? 'hidden' : '';
                }
            });
        });
        menuObserver.observe(document.body, { attributes: true });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
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

        // Testimonials Slider
        try {
            if (typeof Swiper !== 'undefined') {
                const swiper = new Swiper('.slider-wrapper', {
            loop: true,
            grabCursor: true,
            spaceBetween: 20,
            centeredSlides: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            keyboard: {
                enabled: true,
            },
            a11y: {
                enabled: true,
            },
            touchRatio: 1.5,
            touchAngle: 45,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                    centeredSlides: false
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: false
                }
            }
                });
            } else {
                console.error('Swiper library not loaded');
            }
        } catch (error) {
            console.error('Error initializing Swiper:', error);
        }

        // Scroll Reveal Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => {
            scrollObserver.observe(el);
        });

        // Custom Cursor (for desktop)
        if (window.matchMedia('(hover: hover)').matches) {
            const cursor = document.querySelector('.custom-cursor');
            
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            document.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        }

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // Newsletter form
        document.querySelector('footer form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });

        // Gallery lightbox effect
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 10px;
                `;
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', () => {
                    lightbox.remove();
                });
            });
        });

        // Parallax effect for hero section (desktop only)
        if (window.matchMedia('(hover: hover)').matches && window.innerWidth > 768) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroImage = document.querySelector('.hero-image');
                if (heroImage && scrolled < window.innerHeight) {
                    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }

        // Touch improvements
        if ('ontouchstart' in window) {
            // Add touch-friendly class to body for CSS targeting
            document.body.classList.add('touch-device');
            
            // Improve touch scrolling
            document.body.style.webkitOverflowScrolling = 'touch';
            
            // Add touch feedback for interactive elements
            document.querySelectorAll('button, .button, a, .menu-item, .gallery-item').forEach(el => {
                el.addEventListener('touchstart', function() {
                    this.style.opacity = '0.7';
                });
                
                el.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.style.opacity = '';
                    }, 100);
                });
                
                el.addEventListener('touchcancel', function() {
                    this.style.opacity = '';
                });
            });
        }

        // Viewport height fix for mobile browsers
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', () => {
            setTimeout(setVH, 100);
        });