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
                const projectCard = `
                    <div class="project-card">
                        <div class="project-thumbnail">
                            <img src="${project.image}" alt="${project.title}">
                        </div>
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                    </div>
                `;
                projectsContainer.innerHTML += projectCard;
            });
            
            console.log('Projects loaded successfully!');
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    }
});