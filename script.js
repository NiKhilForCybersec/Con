/* SIEM Consultant Portfolio - Navigation JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initSidebar();
  initMobileNav();
  initCodeCopy();
  highlightActiveNav();
});

/* ===== SIDEBAR FUNCTIONALITY ===== */
function initSidebar() {
  // Toggle section collapse/expand
  const sectionHeaders = document.querySelectorAll('.nav-section-header');
  
  sectionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const section = this.parentElement;
      section.classList.toggle('collapsed');
      
      // Save state to localStorage
      const sectionId = section.dataset.section;
      const collapsed = section.classList.contains('collapsed');
      localStorage.setItem(`nav-section-${sectionId}`, collapsed);
    });
  });
  
  // Restore collapsed states from localStorage
  const sections = document.querySelectorAll('.nav-section');
  sections.forEach(section => {
    const sectionId = section.dataset.section;
    const collapsed = localStorage.getItem(`nav-section-${sectionId}`);
    if (collapsed === 'true') {
      section.classList.add('collapsed');
    }
  });
}

/* ===== MOBILE NAVIGATION ===== */
function initMobileNav() {
  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (toggle) {
    toggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('visible');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });
  }
  
  if (overlay) {
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
      document.body.style.overflow = '';
    });
  }
  
  // Close sidebar on nav item click (mobile)
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ===== HIGHLIGHT ACTIVE NAV ITEM ===== */
function highlightActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
      item.classList.add('active');
      
      // Expand parent section if collapsed
      const section = item.closest('.nav-section');
      if (section) {
        section.classList.remove('collapsed');
      }
    }
  });
}

/* ===== CODE COPY FUNCTIONALITY ===== */
function initCodeCopy() {
  const copyButtons = document.querySelectorAll('.code-copy');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const codeBlock = this.closest('.code-block');
      const code = codeBlock.querySelector('code').textContent;
      
      navigator.clipboard.writeText(code).then(() => {
        const originalText = this.textContent;
        this.textContent = 'Copied!';
        this.style.color = 'var(--success)';
        
        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  });
}

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
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

/* ===== SEARCH FUNCTIONALITY (Future Enhancement) ===== */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      const section = item.closest('.nav-section');
      
      if (text.includes(query)) {
        item.style.display = '';
        if (section) section.classList.remove('collapsed');
      } else {
        item.style.display = query ? 'none' : '';
      }
    });
  });
}
