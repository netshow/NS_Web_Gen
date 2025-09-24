// Agent Web Applications shared interactions
// Handles theme persistence, navigation behavior, dropdowns, and form validation.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');
  const storedTheme = localStorage.getItem('awa-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const applyTheme = (theme) => {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', normalized);
    localStorage.setItem('awa-theme', normalized);
    if (themeLabel) {
      themeLabel.textContent = normalized === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', normalized === 'dark');
    }
  };

  if (storedTheme) {
    applyTheme(storedTheme);
  } else if (prefersDark.matches) {
    applyTheme('dark');
  }

  prefersDark.addEventListener('change', (event) => {
    if (!storedTheme) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const primaryNav = document.querySelector('.primary-nav');
  const dropdownToggle = document.querySelector('[data-dropdown-toggle]');
  const dropdownMenu = document.querySelector('[data-dropdown-menu]');

  const closeMenu = () => {
    if (primaryNav && primaryNav.classList.contains('open')) {
      primaryNav.classList.remove('open');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  };

  const closeDropdown = () => {
    if (dropdownMenu && dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
      dropdownToggle?.setAttribute('aria-expanded', 'false');
    }
  };

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        primaryNav.querySelector('a, button')?.focus();
      }
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        closeDropdown();
      }
    });
  }

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', () => {
      const isOpen = dropdownMenu.classList.toggle('show');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        dropdownMenu.querySelector('a')?.focus();
      }
    });

    dropdownToggle.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        dropdownMenu.classList.add('show');
        dropdownToggle.setAttribute('aria-expanded', 'true');
        dropdownMenu.querySelector('a')?.focus();
      }
    });

    dropdownMenu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
        dropdownToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
        closeDropdown();
      }
    });
  }

  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach((form) => {
    const message = form.querySelector('.form-message');

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let firstInvalid = null;
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach((field) => {
        const input = field;
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          if (!input.checkValidity()) {
            input.classList.add('input-error');
            firstInvalid = firstInvalid || input;
          } else {
            input.classList.remove('input-error');
          }
        }
      });

      if (firstInvalid) {
        if (message) {
          message.textContent = 'Please review the highlighted fields and try again.';
        }
        firstInvalid.focus();
        return;
      }

      if (message) {
        const successText = form.getAttribute('data-success-message') || 'Thanks! Your submission has been received.';
        message.textContent = successText;
      }
      form.reset();
    });

    form.addEventListener('input', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        if (target.checkValidity()) {
          target.classList.remove('input-error');
        }
      }
    });
  });
});
