// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Form submission handler with email functionality
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form data
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Prepare email content
        const subject = `Website Inquiry from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        
        // Open default email client with prefilled data
        window.location.href = `mailto:as3331733@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Provide feedback to the user
        alert('Thank you for your message! Redirecting to your email client.');
        
        // Reset the form
        this.reset();
        
        // For SMS option (requires user action due to security restrictions)
        const sendSMS = confirm('Would you also like to send an SMS notification?');
        if (sendSMS) {
            // Open SMS app with prefilled message (mobile only)
            const smsBody = `New website inquiry from ${name} (${email})`;
            window.open(`sms:+916202150367?body=${encodeURIComponent(smsBody)}`);
        }
    });
}

// Animated entrance for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Scroll Animation
function animateSections() {
    const sections = document.querySelectorAll('.section-fade');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Project Filtering
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = 1;
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = 1;
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = 0;
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Certificate Gallery Modal
function setupGalleryModal() {
    const certItems = document.querySelectorAll('.cert-item');
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = document.querySelector('.close-modal');
    
    certItems.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = item.querySelector('img').src;
            
            const title = item.querySelector('h3').textContent;
            const issuer = item.querySelector('p:nth-of-type(1)').textContent;
            const date = item.querySelector('p:nth-of-type(2)').textContent;
            
            modalCaption.innerHTML = `<h3>${title}</h3><p>${issuer}</p><p>${date}</p>`;
        });
    });
    
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Editable About Section
function setupEditableContent() {
    const editBtn = document.getElementById('edit-about-btn');
    const aboutText = document.getElementById('about-text');
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            if (aboutText.getAttribute('contenteditable') === 'true') {
                // Save content
                aboutText.setAttribute('contenteditable', 'false');
                editBtn.textContent = 'Edit About Me';
                aboutText.classList.remove('editing');
                
                // Here you would typically save the content to a database
                console.log('Saving content:', aboutText.innerHTML);
                // For demo purposes, we'll save to localStorage
                localStorage.setItem('aboutContent', aboutText.innerHTML);
                
                alert('Content saved successfully!');
            } else {
                // Enable editing
                aboutText.setAttribute('contenteditable', 'true');
                editBtn.textContent = 'Save Changes';
                aboutText.classList.add('editing');
                aboutText.focus();
            }
        });
    }
    
    // Load saved content if it exists
    const savedContent = localStorage.getItem('aboutContent');
    if (savedContent && aboutText) {
        aboutText.innerHTML = savedContent;
    }
}

// Add Project Functionality
function setupProjectAdding() {
    const addProjectBtn = document.getElementById('add-project-btn');
    
    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => {
            // In a real application, this would open a form
            // For demo purposes, we'll create a simple prompt
            const title = prompt('Enter project title:');
            if (!title) return;
            
            const description = prompt('Enter project description:');
            const category = prompt('Enter project category (web, mobile, design):');
            const technologies = prompt('Enter technologies (comma separated):');
            
            // Create new project card
            const projectsGrid = document.querySelector('.projects-grid');
            const newProject = document.createElement('div');
            newProject.className = 'project-card';
            newProject.setAttribute('data-category', category || 'web');
            
            newProject.innerHTML = `
                <div class="project-img">
                    <img src="images/placeholder.jpg" alt="${title}">
                </div>
                <div class="project-info">
                    <h3>${title}</h3>
                    <p>${description || 'No description provided'}</p>
                    <div class="project-tech">
                        ${technologies.split(',').map(tech => `<span>${tech.trim()}</span>`).join('')}
                    </div>
                    <a href="#" class="project-link">View Project</a>
                </div>
            `;
            
            projectsGrid.appendChild(newProject);
            alert('Project added successfully!');
        });
    }
}

// Add Certificate Functionality
function setupCertificateAdding() {
    const addCertBtn = document.getElementById('add-cert-btn');
    
    if (addCertBtn) {
        addCertBtn.addEventListener('click', () => {
            // In a real application, this would open a form
            // For demo purposes, we'll create a simple prompt
            const title = prompt('Enter certificate title:');
            if (!title) return;
            
            const issuer = prompt('Enter issuing organization:');
            const date = prompt('Enter date received:');
            
            // Create new certificate item
            const certGallery = document.querySelector('.cert-gallery');
            const newCert = document.createElement('div');
            newCert.className = 'cert-item';
            
            newCert.innerHTML = `
                <img src="images/cert-placeholder.jpg" alt="${title}">
                <div class="cert-overlay">
                    <h3>${title}</h3>
                    <p>Issued by: ${issuer || 'Unknown'}</p>
                    <p>Date: ${date || 'Not specified'}</p>
                </div>
            `;
            
            certGallery.appendChild(newCert);
            setupGalleryModal(); // Refresh modal handlers
            alert('Certificate added successfully!');
        });
    }
}

// Animation for timeline
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach((item, index) => {
        // Add delay to stagger animations
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
}

// Admin Authentication
function setupAdminAuthentication() {
    const adminTrigger = document.getElementById('admin-login-trigger');
    const adminModal = document.getElementById('admin-login-modal');
    const closeModal = adminModal.querySelector('.close-modal');
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('admin-password');
    const errorMessage = document.getElementById('login-error');
    
    // Admin password - in a real app, this would be handled securely on a backend
    const ADMIN_PASSWORD = 'ghost123'; // You should change this to your preferred password
    
    // Check if already logged in
    const isAdmin = localStorage.getItem('ghostDevAdmin') === 'true';
    if (isAdmin) {
        document.body.classList.add('admin-active');
    }
    
    adminTrigger.addEventListener('click', () => {
        adminModal.style.display = 'block';
        passwordInput.focus();
    });
    
    closeModal.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });
    
    loginBtn.addEventListener('click', attemptLogin);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            attemptLogin();
        }
    });
    
    function attemptLogin() {
        const password = passwordInput.value;
        
        if (password === ADMIN_PASSWORD) {
            // Login successful
            localStorage.setItem('ghostDevAdmin', 'true');
            document.body.classList.add('admin-active');
            adminModal.style.display = 'none';
            passwordInput.value = '';
            errorMessage.textContent = '';
        } else {
            // Login failed
            errorMessage.textContent = 'Incorrect password. Try again.';
            passwordInput.value = '';
        }
    }
    
    // Logout function
    window.logoutAdmin = function() {
        localStorage.removeItem('ghostDevAdmin');
        document.body.classList.remove('admin-active');
        alert('You have been logged out as admin.');
    };
    
    // Add logout button to the page
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout Admin';
    logoutBtn.className = 'admin-btn admin-logout-btn';
    logoutBtn.style.position = 'fixed';
    logoutBtn.style.bottom = '20px';
    logoutBtn.style.left = '20px';
    logoutBtn.style.zIndex = '999';
    logoutBtn.addEventListener('click', window.logoutAdmin);
    document.body.appendChild(logoutBtn);
    
    // Show logout button only when logged in
    if (isAdmin) {
        logoutBtn.style.display = 'block';
    }
}

// Initialize all functions when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing code
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Form handling remains the same as your previous update
    
    // Initialize new functions
    animateSections();
    setupProjectFilters();
    setupGalleryModal();
    setupEditableContent();
    setupProjectAdding();
    setupCertificateAdding();
    animateTimeline();
    
    setupAdminAuthentication();
}); 