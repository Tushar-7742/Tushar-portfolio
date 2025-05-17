// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Splash Screen
    setTimeout(() => {
        const splashScreen = document.querySelector('.splash-screen');
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.visibility = 'hidden';
        }, 500);
    }, 2500);

    // Animate headline words
    const headlineWords = document.querySelectorAll('.headline-word');
    headlineWords.forEach((word, index) => {
        word.style.animationDelay = `${index * 0.1 + 0.5}s`;
    });

    // Custom cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add a slight delay to the cursor outline for a trailing effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 100);
    });

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .info-card, .certificate-card, .tool-item, .project-item, .service-card, .blog-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(247, 191, 180, 0.2)';
            cursorOutline.style.borderColor = 'transparent';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'var(--accent-peach)';
        });
    });

    // Hide cursor when mouse leaves window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        }
    });

    document.addEventListener('mouseover', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.toggle('active');
        bars[1].classList.toggle('active');
        bars[2].classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Scroll animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.about-text, .info-card, .certificate-card, .tool-item, .project-item, .service-card, .blog-card');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Hero canvas animation
    const heroCanvas = document.getElementById('hero-canvas');
    const heroCtx = heroCanvas.getContext('2d');

    function resizeHeroCanvas() {
        heroCanvas.width = window.innerWidth;
        heroCanvas.height = window.innerHeight;
    }

    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);

    // Create animated blobs
    class Blob {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = 0.001 + Math.random() * 0.002;
            this.distance = 50 + Math.random() * 100;
            this.originalX = x;
            this.originalY = y;
        }

        update() {
            this.angle += this.speed;
            this.x = this.originalX + Math.cos(this.angle) * this.distance;
            this.y = this.originalY + Math.sin(this.angle) * this.distance;
        }

        draw() {
            heroCtx.beginPath();
            heroCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            heroCtx.fillStyle = this.color;
            heroCtx.fill();
            heroCtx.closePath();
        }
    }

    const blobs = [];
    const colors = ['rgba(247, 191, 180, 0.3)', 'rgba(174, 227, 226, 0.3)', 'rgba(163, 184, 204, 0.3)'];

    function createBlobs() {
        blobs.length = 0;
        const numBlobs = 5;
        
        for (let i = 0; i < numBlobs; i++) {
            const x = Math.random() * heroCanvas.width;
            const y = Math.random() * heroCanvas.height;
            const radius = 100 + Math.random() * 200;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            blobs.push(new Blob(x, y, radius, color));
        }
    }

    function animateHeroCanvas() {
        heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
        
        // Draw blobs
        blobs.forEach(blob => {
            blob.update();
            blob.draw();
        });
        
        requestAnimationFrame(animateHeroCanvas);
    }

    createBlobs();
    animateHeroCanvas();

    // Contact canvas animation
    const contactCanvas = document.getElementById('contact-canvas');
    const contactCtx = contactCanvas.getContext('2d');

    function resizeContactCanvas() {
        contactCanvas.width = window.innerWidth;
        contactCanvas.height = document.querySelector('.contact').offsetHeight;
    }

    resizeContactCanvas();
    window.addEventListener('resize', resizeContactCanvas);

    // Create animated waves
    class Wave {
        constructor(amplitude, period, color) {
            this.amplitude = amplitude;
            this.period = period;
            this.color = color;
            this.offset = Math.random() * Math.PI * 2;
            this.speed = 0.005 + Math.random() * 0.005;
        }

        update() {
            this.offset += this.speed;
        }

        draw() {
            contactCtx.beginPath();
            contactCtx.moveTo(0, contactCanvas.height / 2);
            
            for (let x = 0; x < contactCanvas.width; x++) {
                const y = Math.sin(x * this.period + this.offset) * this.amplitude + contactCanvas.height / 2;
                contactCtx.lineTo(x, y);
            }
            
            contactCtx.lineTo(contactCanvas.width, contactCanvas.height);
            contactCtx.lineTo(0, contactCanvas.height);
            contactCtx.closePath();
            
            contactCtx.fillStyle = this.color;
            contactCtx.fill();
        }
    }

    const waves = [];
    const waveColors = ['rgba(247, 191, 180, 0.1)', 'rgba(174, 227, 226, 0.1)', 'rgba(163, 184, 204, 0.1)'];

    function createWaves() {
        waves.length = 0;
        const numWaves = 3;
        
        for (let i = 0; i < numWaves; i++) {
            const amplitude = 50 + Math.random() * 50;
            const period = 0.001 + Math.random() * 0.002;
            const color = waveColors[i % waveColors.length];
            
            waves.push(new Wave(amplitude, period, color));
        }
    }

    function animateContactCanvas() {
        contactCtx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);
        
        // Draw waves
        waves.forEach(wave => {
            wave.update();
            wave.draw();
        });
        
        requestAnimationFrame(animateContactCanvas);
    }

    createWaves();
    animateContactCanvas();

    // Declare Swiper variable
    const Swiper = window.Swiper;

    // Initialize all Swipers
    const servicesSwiper = new Swiper('.services-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.services-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.services-swiper .swiper-button-next',
            prevEl: '.services-swiper .swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    const blogSwiper = new Swiper('.blog-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.blog-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.blog-swiper .swiper-button-next',
            prevEl: '.blog-swiper .swiper-button-prev',
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Initialize Projects Swiper with grid mode for 2 rows
    const projectsSwiper = new Swiper('.projects-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        grid: {
            rows: 2, // Display 2 rows
            fill: 'row' // Fill rows first
        },
        pagination: {
            el: '.projects-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.projects-swiper .swiper-button-next',
            prevEl: '.projects-swiper .swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                grid: {
                    rows: 2
                },
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                grid: {
                    rows: 2
                },
                spaceBetween: 30,
            },
            1400: {
                slidesPerView: 4,
                grid: {
                    rows: 2
                },
                spaceBetween: 30,
            }
        }
    });

    // Project filtering with Swiper
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectItems = document.querySelectorAll('.project-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter projects
            projectItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Update Swiper after filtering
            projectsSwiper.update();
            projectsSwiper.slideTo(0, 0);
        });
    });

    // Project modal
    const modal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');

    // Project data
    const projectData = {
        project1: {
            title: 'Eco Brand Identity',
            description: 'A comprehensive brand identity design for a sustainable products company. The project included logo design, color palette, typography, packaging design, and brand guidelines.',
            images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
            client: 'GreenLife Organics',
            year: '2023',
            services: 'Brand Strategy, Logo Design, Visual Identity, Packaging'
        },
        project2: {
            title: 'Music Festival Poster',
            description: 'Vibrant poster design for an annual music festival featuring a mix of illustration and typography to create an eye-catching visual that captures the energy of the event.',
            images: ['/placeholder.svg?height=800&width=600', '/placeholder.svg?height=800&width=600'],
            client: 'SoundWave Festival',
            year: '2022',
            services: 'Poster Design, Illustration, Typography'
        },
        project3: {
            title: 'Fitness App UI',
            description: 'User interface design for a health tracking application with a focus on clean, intuitive design and accessibility. The project included wireframing, prototyping, and final UI design.',
            images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
            client: 'FitTrack',
            year: '2023',
            services: 'UX Research, UI Design, Prototyping'
        },
        project4: {
            title: 'Logo Collection',
            description: 'A series of minimalist logo designs created for various clients across different industries. Each logo was designed with versatility and brand recognition in mind.',
            images: ['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
            client: 'Various',
            year: '2021-2023',
            services: 'Logo Design, Brand Identity'
        },
        project5: {
            title: 'E-commerce Redesign',
            description: 'Complete UX/UI overhaul for an online store to improve user experience, increase conversion rates, and modernize the visual design while maintaining brand identity.',
            images: ['/placeholder.svg?height=400&width=800', '/placeholder.svg?height=400&width=800'],
            client: 'StyleHub',
            year: '2022',
            services: 'UX Audit, UI Redesign, Prototyping, User Testing'
        },
        project6: {
            title: 'Film Festival Series',
            description: 'Collection of posters designed for an independent film showcase, featuring a cohesive visual language while highlighting the unique aspects of each featured film.',
            images: ['/placeholder.svg?height=800&width=600', '/placeholder.svg?height=800&width=600'],
            client: 'Indie Film Collective',
            year: '2023',
            services: 'Poster Design, Typography, Visual Identity'
        },
        project7: {
            title: 'Abstract Art Collection',
            description: 'A series of digital abstract artworks created for a gallery exhibition, exploring themes of motion, color, and emotion through digital manipulation techniques.',
            images: ['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
            client: 'Modern Art Gallery',
            year: '2023',
            services: 'Digital Art, Creative Direction'
        },
        project8: {
            title: 'Tech Startup Branding',
            description: 'Complete brand identity for an innovative tech startup, including logo design, visual language, marketing materials, and digital assets.',
            images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
            client: 'NexTech Solutions',
            year: '2022',
            services: 'Brand Strategy, Logo Design, Visual Identity, Digital Assets'
        },
        project9: {
            title: 'Product Launch Campaign',
            description: 'Comprehensive social media campaign for a new product launch, including content strategy, visual design, and engagement tactics.',
            images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
            client: 'InnovateTech',
            year: '2023',
            services: 'Social Media Strategy, Content Creation, Visual Design'
        },
        project10: {
            title: 'Travel App Interface',
            description: 'User-centered interface design for a travel booking application, focusing on intuitive navigation and engaging visual elements.',
            images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
            client: 'WanderWise',
            year: '2023',
            services: 'UX Research, UI Design, Prototyping, User Testing'
        },
        project11: {
            title: 'Digital Illustrations',
            description: 'Collection of character and concept illustrations for a fantasy book series, bringing the author\'s vision to life through detailed digital artwork.',
            images: ['/placeholder.svg?height=600&width=600', '/placeholder.svg?height=600&width=600'],
            client: 'Fantasy Publishing House',
            year: '2022',
            services: 'Character Design, Digital Illustration, Concept Art'
        },
        project12: {
            title: 'Restaurant Rebrand',
            description: 'Complete rebranding for an upscale restaurant, including new logo, menu design, interior graphics, and marketing materials.',
            images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
            client: 'Culinary Heights',
            year: '2023',
            services: 'Brand Strategy, Logo Design, Menu Design, Interior Graphics'
        },
        project13: {
            title: 'Social Media Templates',
            description: 'Custom template designs for a lifestyle brand\'s social media presence, creating a cohesive and engaging visual identity across platforms.',
            images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
            client: 'Urban Lifestyle Co.',
            year: '2023',
            services: 'Social Media Design, Template Creation, Brand Guidelines'
        }
    };

    // Open modal with project details
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = button.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                let modalHTML = `
                    <h2>${project.title}</h2>
                    <div class="project-images">
                `;
                
                project.images.forEach(image => {
                    modalHTML += `<img src="${image}" alt="${project.title}">`;
                });
                
                modalHTML += `
                    </div>
                    <div class="project-details">
                        <p>${project.description}</p>
                        <div class="project-meta">
                            <div class="meta-item">
                                <h4>Client</h4>
                                <p>${project.client}</p>
                            </div>
                            <div class="meta-item">
                                <h4>Year</h4>
                                <p>${project.year}</p>
                            </div>
                            <div class="meta-item">
                                <h4>Services</h4>
                                <p>${project.services}</p>
                            </div>
                        </div>
                    </div>
                `;
                
                modalContent.innerHTML = modalHTML;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Form floating labels
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        if (input.value) {
            input.nextElementSibling.classList.add('active');
        }
        input.addEventListener('focus', () => {
            input.nextElementSibling.classList.add('active');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.nextElementSibling.classList.remove('active');
            }
        });
    });

    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('http://localhost:3000/api/send-email', { // Replace with your server endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await response.json();

            if (response.ok) {
                contactForm.innerHTML = `
                    <div class="form-success">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="var(--accent-peach)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M22 4L12 14.01L9 11.01" stroke="var(--accent-peach)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h3>Message Sent!</h3>
                        <p>${data.message || 'Thank you for reaching out. I\'ll get back to you soon.'}</p>
                    </div>
                `;
            } else {
                console.error('Error sending email:', data.error);
                contactForm.innerHTML = `<div class="form-error"><h3>Error!</h3><p>Something went wrong. Please try again later.</p></div>`;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            contactForm.innerHTML = `<div class="form-error"><h3>Error!</h3><p>Something went wrong. Please try again later.</p></div>`;
        }
    });

    // Window resize event
    window.addEventListener('resize', () => {
        resizeHeroCanvas();
        resizeContactCanvas();
        createBlobs();
        createWaves();
        
        // Update all swipers on resize
        if (servicesSwiper) servicesSwiper.update();
        if (blogSwiper) blogSwiper.update();
        if (projectsSwiper) projectsSwiper.update();
    });

    // CTA button scroll to projects
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', () => {
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
    });
});
