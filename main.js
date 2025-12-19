/* SIEM Consultant Portfolio - Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Copy code buttons
    initCodeCopy();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Active nav highlighting
    initActiveNav();
    
    // Collapsible sections
    initCollapsibles();
});

/* ============================================
   Mobile Menu
   ============================================ */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (!toggle || !sidebar) return;
    
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !toggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Close menu when clicking a nav link
    const navLinks = sidebar.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    });
}

/* ============================================
   Code Copy Functionality
   ============================================ */
function initCodeCopy() {
    const copyButtons = document.querySelectorAll('.code-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.closest('.code-block') || button.closest('div');
            const code = codeBlock.querySelector('code');
            
            if (!code) return;
            
            try {
                await navigator.clipboard.writeText(code.textContent);
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = 'var(--success)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Failed';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            }
        });
    });
}

/* ============================================
   Smooth Scroll
   ============================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        });
    });
}

/* ============================================
   Active Navigation Highlighting
   ============================================ */
function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPath) {
            item.classList.add('active');
        }
    });
}

/* ============================================
   Collapsible Sections
   ============================================ */
function initCollapsibles() {
    const collapsibles = document.querySelectorAll('.collapsible-header');
    
    collapsibles.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.collapsible-icon');
            
            header.classList.toggle('open');
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            if (icon) {
                icon.style.transform = header.classList.contains('open') 
                    ? 'rotate(90deg)' 
                    : 'rotate(0deg)';
            }
        });
    });
}

/* ============================================
   Search Functionality (for future use)
   ============================================ */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }
        
        // Search logic would go here
        // For now, this is a placeholder
    });
}

/* ============================================
   Table of Contents Generator
   ============================================ */
function generateTOC() {
    const content = document.querySelector('.content-wrapper');
    const tocContainer = document.querySelector('.toc');
    
    if (!content || !tocContainer) return;
    
    const headings = content.querySelectorAll('h2, h3');
    const tocList = document.createElement('ul');
    
    headings.forEach((heading, index) => {
        // Add ID if not present
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const li = document.createElement('li');
        li.className = heading.tagName === 'H3' ? 'toc-h3' : 'toc-h2';
        
        const a = document.createElement('a');
        a.href = `#${heading.id}`;
        a.textContent = heading.textContent;
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
    
    tocContainer.appendChild(tocList);
}

/* ============================================
   Progress Indicator
   ============================================ */
function initProgressIndicator() {
    const progressBar = document.querySelector('.reading-progress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
    });
}

/* ============================================
   Tab Functionality
   ============================================ */
function initTabs() {
    const tabContainers = document.querySelectorAll('.tabs');
    
    tabContainers.forEach(container => {
        const tabButtons = container.querySelectorAll('.tab-button');
        const tabPanels = container.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-tab');
                
                // Remove active from all
                tabButtons.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                
                // Add active to clicked
                button.classList.add('active');
                document.getElementById(targetId)?.classList.add('active');
            });
        });
    });
}
