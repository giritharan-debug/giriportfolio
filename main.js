document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* 1. Sticky Navbar */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* 2. Hamburger Mobile Menu */
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        // Toggle hamburger icon between menu and close (x)
        const icon = hamburger.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            hamburger.querySelector('i').setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    /* 3. Intersection Observer for Active Nav Highlight & Scroll Fade-Up */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a, #nav-connect-btn');
    
    // Highlight Active Link
    const activeObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the sweet spot of the viewport
        threshold: 0
    };

    const activeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, activeObserverOptions);

    sections.forEach(section => {
        activeObserver.observe(section);
    });

    // Scroll reveal observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserverOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal once only
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* 4. Projects Detailed Data Map */
    const projectsData = {
        nexdesk: {
            title: "NexDesk",
            tagline: "Enterprise IT Help Desk & Service Management System",
            description: "NexDesk is a robust, full-stack IT Help Desk and Service Management (ITSM) application that replaces legacy email-based IT support structures with a modern, centralized ticketing platform. Designed with logical partition, employees raise tickets with priority tags, engineers track updates, and administrators manage service level policies.",
            tags: ["Full-Stack", "Django", "ITSM", "MySQL", "Bootstrap 5"],
            features: [
                "Secure Authentication: Role-based routing (Employee, Engineer, Administrator).",
                "Ticket Management: Seamless lifecycle stages (Open → In Progress → Resolved → Closed) with attachments.",
                "Knowledge Base: Integrated search for common system FAQs and issue mitigations.",
                "Asset Management: Dynamic database tracking hardware assets, software licenses, and user assignments.",
                "SLA Management: Policy enforcement checks alerting engineers about overdue items.",
                "Dashboard Analytics: Visual graphs of metrics (open vs resolved tickets, engineer loads, average response times)."
            ],
            techStack: ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Python", "Django", "Django REST Framework", "MySQL", "Git & GitHub"],
            github: "https://github.com",
            live: null
        },
        greeneye: {
            title: "Green Eye",
            tagline: "Smart Waste Reporting Platform",
            description: "Developed as a civic-tech innovation, Green Eye empowers citizens to participate actively in urban environmental care. By creating an interactive reporting interface, locals can file waste cleanup requests dynamically with geographic context, driving structured waste management dispatch.",
            tags: ["Civic Tech", "Python", "Community Impact", "SQL"],
            features: [
                "Geotagged Trash Reports: Visual coordinates linked to citizen report logs.",
                "Image Upload Support: Snap and upload pictures of disposal issues directly from mobile viewports.",
                "Official Portal: Authorized local government logs to coordinate sanitary collections.",
                "Dynamic Progress Dashboard: Tracks community reports from logged to cleaned."
            ],
            techStack: ["HTML5", "CSS3", "JavaScript (Vanilla)", "Python", "Django", "SQL", "Git"],
            github: "https://github.com",
            live: null
        },
        travelalarm: {
            title: "Travel Alarm",
            tagline: "Smart Navigation Alert System",
            description: "A web-based travel assistant created to safeguard commuters from oversleeping during journeys. By combining active tracking APIs with interactive maps, the system monitors location boundaries and sound alarms when reaching the geofence perimeter.",
            tags: ["Geolocation", "Maps", "Real-Time", "Mobile-Friendly"],
            features: [
                "Live Geolocation Tracking: Continual coordinate monitoring using HTML5 APIs.",
                "Map Integration: Interactive tracking nodes utilizing Leaflet.js maps and OpenStreetMap API.",
                "Geofenced Alert Boundary: Set dynamic radius alerts (e.g. ring alarm 1.5km before destination).",
                "Background Audio Player: Optimized high-contrast sound player using Howler.js."
            ],
            techStack: ["HTML5", "CSS3", "JavaScript (Vanilla)", "Leaflet.js", "OpenStreetMap API", "Geolocation API", "Howler.js"],
            github: "https://github.com",
            live: null
        },
        thriftpannuvom: {
            title: "Thrift Pannuvom",
            tagline: "Online Thrift Business (Founder)",
            description: "A personal entrepreneurial retail store managed and deployed online. Handles clothing curation, product grading, pricing, inventory sheets, customer support outreach, and social shipping schedules, building core operations and business logic.",
            tags: ["Entrepreneurship", "Digital Marketing", "E-commerce", "Sales"],
            features: [
                "Inventory Tracking: Optimized spreadsheet structures for stock tracking.",
                "Marketing Automation: Curated social campaign layouts driving client interactions.",
                "Customer Fulfillment: Handled logistical planning, packaging, and shipping processes.",
                "Venture Growth: Achieved operational profits within the first month of rollout."
            ],
            techStack: ["Social Commerce Tools", "Digital Marketing", "E-commerce", "Client Relations", "Excel Operations"],
            github: null,
            live: "https://linkedin.com"
        }
    };

    /* 5. Project Modal Handler */
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const projectCards = document.querySelectorAll('.project-card');

    // Open Modal function
    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        // Set text values
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-tagline').textContent = data.tagline;
        document.getElementById('modal-desc').textContent = data.description;

        // Render tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        // Render features
        const featuresContainer = document.getElementById('modal-features');
        const featuresSection = document.getElementById('modal-features-section');
        featuresContainer.innerHTML = '';
        if (data.features && data.features.length > 0) {
            featuresSection.style.display = 'block';
            data.features.forEach(feat => {
                const li = document.createElement('li');
                li.textContent = feat;
                featuresContainer.appendChild(li);
            });
        } else {
            featuresSection.style.display = 'none';
        }

        // Render tech stack
        const techContainer = document.getElementById('modal-tech-stack');
        techContainer.innerHTML = '';
        data.techStack.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        // Render Links
        const linksContainer = document.getElementById('modal-links');
        linksContainer.innerHTML = '';
        
        if (data.github) {
            const btnGit = document.createElement('a');
            btnGit.href = data.github;
            btnGit.target = "_blank";
            btnGit.className = "nav-btn btn-outline";
            btnGit.style.display = "inline-flex";
            btnGit.style.gap = "8px";
            btnGit.innerHTML = `<i data-lucide="github" style="width: 18px; height: 18px;"></i> GitHub Code`;
            linksContainer.appendChild(btnGit);
        }

        if (data.live) {
            const btnLive = document.createElement('a');
            btnLive.href = data.live;
            btnLive.target = "_blank";
            btnLive.className = "nav-btn btn-primary";
            btnLive.style.display = "inline-flex";
            btnLive.style.gap = "8px";
            btnLive.innerHTML = `<i data-lucide="external-link" style="width: 18px; height: 18px;"></i> View Project`;
            linksContainer.appendChild(btnLive);
        }

        // Update Icons inside modal
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Add active classes
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Stop background scroll
    };

    // Close Modal function
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Resume background scroll
    };

    // Attach click events to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

    // Close handlers
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);

    // Escape key closes modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /* 6. Form Submission Simulation & Validation */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showStatus('Please fill in all fields.', 'error');
                return;
            }

            // Simple email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Disable button, show loading
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `Sending... <div class="spinner" style="display:inline-block; width:12px; height:12px; border:2px solid white; border-radius:50%; border-top-color:transparent; animation: spin 0.8s linear infinite; margin-left:5px;"></div>`;
            
            // Inject styling for temporary inline spinner if not in CSS
            if (!document.getElementById('spinner-style')) {
                const styleSheet = document.createElement("style");
                styleSheet.id = "spinner-style";
                styleSheet.innerText = `@keyframes spin { to { transform: rotate(360deg); } }`;
                document.head.appendChild(styleSheet);
            }

            formStatus.className = 'form-status'; // Reset classes

            // Simulate server request delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                // Show Success status
                showStatus('Message sent successfully! Giritharan will contact you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }

    function showStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = `form-status ${type}`;
        
        // Hide error message after 5 seconds
        if (type === 'error') {
            setTimeout(() => {
                formStatus.style.opacity = '0';
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                    formStatus.style.opacity = '';
                }, 300);
            }, 5000);
        }
    }
});
