// GoAdomain JavaScript - All Functionality

// Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('active');
    });
});

// Domain Search Function
function searchDomain(event) {
    event.preventDefault();
    
    const domainInput = document.getElementById('domainInput');
    const searchTerm = domainInput.value.trim();
    
    if (!searchTerm) {
        alert('Please enter a domain name to search');
        return;
    }
    
    // Show loading state
    const searchBtn = document.querySelector('.search-btn');
    const originalBtnText = searchBtn.textContent;
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    
    // Simulate search delay
    setTimeout(() => {
        generateSearchResults(searchTerm);
        
        // Reset button
        searchBtn.textContent = originalBtnText;
        searchBtn.disabled = false;
        
        // Show results section
        const resultsSection = document.getElementById('search');
        resultsSection.style.display = 'block';
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

// Quick search from popular tags
function quickSearch(extension) {
    const domainInput = document.getElementById('domainInput');
    domainInput.value = extension;
    searchDomain(new Event('submit'));
}

// Generate Search Results
function generateSearchResults(searchTerm) {
    const resultsContainer = document.getElementById('searchResults');
    
    // Generate various domain suggestions
    const extensions = ['.com', '.net', '.org', '.io', '.co', '.tech', '.store', '.online', '.app', '.dev'];
    const results = [];
    
    // Clean the search term
    const cleanTerm = searchTerm.replace(/\.[a-z]+$/, '');
    
    extensions.forEach(ext => {
        const domain = cleanTerm + ext;
        const isAvailable = Math.random() > 0.3; // 70% chance of being available
        
        results.push({
            domain: domain,
            available: isAvailable,
            cloudReady: true,
            serverCompatible: true
        });
    });
    
    // Also generate some variations
    const variations = [
        'get' + cleanTerm,
        cleanTerm + 'app',
        'my' + cleanTerm,
        cleanTerm + 'pro',
        'the' + cleanTerm
    ];
    
    variations.forEach(variation => {
        const domain = variation + '.com';
        const isAvailable = Math.random() > 0.4;
        
        results.push({
            domain: domain,
            available: isAvailable,
            cloudReady: true,
            serverCompatible: true
        });
    });
    
    // Render results
    let html = '';
    results.forEach(result => {
        html += `
            <div class="result-card">
                <div>
                    <div class="result-domain">${result.domain}</div>
                    <div class="domain-features" style="margin-top: 0.5rem;">
                        ${result.cloudReady ? '<span class="badge">Cloud Ready</span>' : ''}
                        ${result.serverCompatible ? '<span class="badge">Server Compatible</span>' : ''}
                    </div>
                </div>
                <div class="result-status ${result.available ? 'available' : 'taken'}">
                    ${result.available ? 'Available' : 'Taken'}
                </div>
                <div class="result-actions">
                    ${result.available ? 
                        `<button class="btn-view" onclick="selectDomain('${result.domain}')">Select</button>` :
                        `<button class="btn-view" style="background: #6c757d;" disabled>Unavailable</button>`
                    }
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = html;
}

// Select Domain
function selectDomain(domainName) {
    const modal = document.getElementById('domainModal');
    const domainNameElement = document.getElementById('selectedDomainName');
    
    domainNameElement.textContent = domainName;
    modal.style.display = 'block';
}

// Configure Domain
function configureDomain() {
    const domainName = document.getElementById('selectedDomainName').textContent;
    alert(`Configuration started for: ${domainName}\n\nYour domain will be set up with:\n• Cloud integration\n• Server compatibility\n• DNS management\n• SSL certificate\n\nThank you for choosing GoAdomain!`);
    closeDomainModal();
}

// Close Domain Modal
function closeDomainModal() {
    document.getElementById('domainModal').style.display = 'none';
}

// Show Admin Login
function showAdminLogin() {
    document.getElementById('adminModal').style.display = 'block';
}

// Close Admin Modal
function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

// Admin Login Function
function adminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Check credentials
    if (username.toLowerCase() === 'olawale abdul-ganiyu' || username.toLowerCase() === 'admin') {
        if (password === 'admin123' || password === 'olawale') {
            // Successful login
            alert(`Welcome, Olawale Abdul-Ganiyu!\n\nLicense: GA-2024-ADMIN-001\nStatus: Authorized to operate and use all systems\n\nAccess granted to admin panel.`);
            closeAdminModal();
            
            // Store admin session
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminName', 'Olawale Abdul-Ganiyu');
            
            // Update UI to show admin is logged in
            updateAdminUI();
        } else {
            alert('Invalid password. Please try again.');
        }
    } else {
        alert('Access denied. This admin panel is licensed to Olawale Abdul-Ganiyu only.');
    }
}

// Update Admin UI
function updateAdminUI() {
    const adminLink = document.querySelector('.admin-link');
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (isLoggedIn === 'true') {
        const adminName = localStorage.getItem('adminName');
        adminLink.textContent = `Admin (${adminName.split(' ')[0]})`;
        adminLink.style.background = '#28a745';
    }
}

// Check admin login status on page load
document.addEventListener('DOMContentLoaded', () => {
    updateAdminUI();
});

// Contact Form Submission
function submitContact(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    alert('Thank you for your message! Our team will get back to you within 24 hours.');
    form.reset();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const adminModal = document.getElementById('adminModal');
    const domainModal = document.getElementById('domainModal');
    
    if (event.target === adminModal) {
        adminModal.style.display = 'none';
    }
    
    if (event.target === domainModal) {
        domainModal.style.display = 'none';
    }
}

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Add animation to domain cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe domain cards
document.addEventListener('DOMContentLoaded', () => {
    const domainCards = document.querySelectorAll('.domain-card');
    domainCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// Generate random domain suggestions
function generateRandomDomains() {
    const prefixes = ['tech', 'smart', 'cloud', 'digital', 'innovative', 'future', 'global', 'pro'];
    const suffixes = ['solutions', 'systems', 'ventures', 'hub', 'lab', 'works', 'zone', 'base'];
    const extensions = ['.com', '.net', '.io', '.co'];
    
    const domains = [];
    for (let i = 0; i < 8; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        const ext = extensions[Math.floor(Math.random() * extensions.length)];
        domains.push(prefix + suffix + ext);
    }
    
    return domains;
}

// Add hover effects to cloud items
document.querySelectorAll('.cloud-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Validate domain name format
function isValidDomain(domain) {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    return domainRegex.test(domain);
}

// Add validation to domain search
document.getElementById('domainInput').addEventListener('input', (e) => {
    const value = e.target.value;
    // Remove invalid characters
    e.target.value = value.replace(/[^a-zA-Z0-9.-]/g, '');
});

// Console welcome message
console.log('%c🌐 GoAdomain - Premium Domain Marketplace', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cLicensed to: Olawale Abdul-Ganiyu', 'color: #764ba2; font-size: 14px;');
console.log('%cAll systems operational ✓', 'color: #28a745; font-size: 12px;');