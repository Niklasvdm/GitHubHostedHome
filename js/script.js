document.addEventListener('DOMContentLoaded', () => {

  // ── Link injection ──
  if (typeof LINK_URLS === 'object' && LINK_URLS !== null) {
    const linkNodes = document.querySelectorAll('[data-link-key]');
    linkNodes.forEach(node => {
      const key = node.dataset.linkKey;
      const url = LINK_URLS[key];
      if (!key || !url) return;

      node.setAttribute('href', url);

      if (/^https?:/i.test(url) && !node.hasAttribute('target')) {
        node.setAttribute('target', '_blank');
        node.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ── Active sidebar nav on scroll ──
  const navLinks = document.querySelectorAll('.sidebar__nav-link');
  const sections = document.querySelectorAll('.section');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      rootMargin: '-10% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // ── Mobile menu toggle ──
  const toggle = document.querySelector('.mobile-header__toggle');
  const sidebar = document.querySelector('.sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      let overlay = document.querySelector('.sidebar-overlay');

      if (isOpen && !overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeSidebar);
      } else if (!isOpen && overlay) {
        overlay.remove();
      }
    });

    // Close sidebar when a nav link is clicked (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', closeSidebar);
    });

    function closeSidebar() {
      sidebar.classList.remove('open');
      const overlay = document.querySelector('.sidebar-overlay');
      if (overlay) overlay.remove();
    }
  }

});
