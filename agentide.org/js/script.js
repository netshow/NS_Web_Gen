document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', saved);
  toggle.addEventListener('click', () => {
    const cur = htmlEl.getAttribute('data-theme');
    const next = cur === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
