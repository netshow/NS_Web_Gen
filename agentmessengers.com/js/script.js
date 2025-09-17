/*
  Agent Messengers Interaction Logic
  ----------------------------------
  Handles theme persistence, lightweight form feedback, and accessibility
  enhancements required across the marketing experience.
*/

document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('themeSwitch');
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('agentmessengers-theme');

  const applyTheme = (mode) => {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      root.setAttribute('data-bs-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      root.setAttribute('data-bs-theme', 'light');
    }
  };

  if (storedTheme) {
    applyTheme(storedTheme);
    if (themeSwitch) {
      themeSwitch.checked = storedTheme === 'dark';
    }
  } else {
    // Respect system preference on first visit
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
    if (themeSwitch) {
      themeSwitch.checked = prefersDark;
    }
  }

  if (themeSwitch) {
    themeSwitch.addEventListener('change', (event) => {
      const mode = event.target.checked ? 'dark' : 'light';
      applyTheme(mode);
      localStorage.setItem('agentmessengers-theme', mode);
    });
  }

  // Simple form handling to provide instant user feedback in a static build
  const forms = document.querySelectorAll('form[data-form]');
  forms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const responseTarget = form.querySelector('.form-response');
      const submitButton = form.querySelector('button[type="submit"]');
      const defaultLabel = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
      }

      window.setTimeout(() => {
        if (responseTarget) {
          responseTarget.textContent = 'Thank you! Our team will follow up shortly.';
          responseTarget.classList.remove('text-danger');
          responseTarget.classList.add('text-success');
        } else {
          window.alert('Thank you! Our team will follow up shortly.');
        }

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = defaultLabel || 'Submit';
        }
        form.reset();
      }, 600);
    });
  });
});
