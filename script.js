document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    // Move loadProjects function outside and call it directly
    loadProjects();


    async function loadProjects() {
        try {
            console.log('Starting to load projects...');
            console.log('Attempting to fetch from:', window.location.href + 'data/projects.json');
            
            const response = await fetch('./data/projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Loaded projects:', data);
            
            const projectsContainer = document.getElementById('projectsContainer');
            if (!projectsContainer) {
                throw new Error('Projects container not found!');
            }
            
            // Clear existing content
            projectsContainer.innerHTML = '';
            
            data.projects.forEach(project => {
                let videoUrl = project.video_url;
                if (videoUrl && videoUrl.includes('loom.com/share')) {
                    videoUrl = videoUrl.replace('share', 'embed');
                }
                const projectCard = `
                    <div class="project-card">
                        <div class="project-thumbnail">
                            <img src="${project.image}" data-small-src="${project.image}" data-large-src="${project.imageLarge}" alt="${project.title}">
                            <p class="image-caption">${project.imageCaption}</p>
                        </div>
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                            <p class="project-detailed-description">${project.challengeDescription}</p>
                            ${videoUrl ? `<div class="project-video">
                                <iframe width="100%" height="400" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
                            </div>` : ''}
                            <button class="close-button">×</button>
                        </div>
                    </div>
                `;
                projectsContainer.innerHTML += projectCard;
            });
            
            console.log('Projects loaded successfully!');

            // Add click event listeners to project cards
            const projectCards = document.querySelectorAll('.project-card');
            const body = document.body;

            // Create overlay element
            const overlay = document.createElement('div');
            overlay.className = 'project-overlay';
            body.appendChild(overlay);

            projectCards.forEach(card => {
                const closeButton = card.querySelector('.close-button');

                card.addEventListener('click', function(e) {
                    if (!card.classList.contains('expanded') && e.target !== closeButton) {
                        expandProject(card);
                        body.style.overflow = 'hidden';
                    }
                });

                closeButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    collapseProject(card);
                    body.style.overflow = '';
                });
            });

            // Add keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const expandedCard = document.querySelector('.project-card.expanded');
                    if (expandedCard) {
                        collapseProject(expandedCard);
                        body.style.overflow = '';
                    }
                }
            });

            function expandProject(card) {
                const thumbnail = card.querySelector('img');
                const largeSrc = thumbnail.getAttribute('data-large-src');
                thumbnail.src = largeSrc;
                card.classList.add('expanded');
                document.querySelector('.project-overlay').classList.add('active');
            }

            function collapseProject(card) {
                const thumbnail = card.querySelector('img');
                const smallSrc = thumbnail.getAttribute('data-small-src');
                thumbnail.src = smallSrc;
                card.classList.remove('expanded');
                document.querySelector('.project-overlay').classList.remove('active');
            }
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }
});  
document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to: 'lmdesigns@protonmail.com'
            };
            
            // Here you would typically send the form data to your backend
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', formData);
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});