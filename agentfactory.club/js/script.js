document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let themeToSet = 'light'; // Default to light

    if (currentTheme) {
        themeToSet = currentTheme;
    } else if (prefersDark) {
        themeToSet = 'dark';
    }
    
    document.documentElement.setAttribute('data-theme', themeToSet);
    if (themeToSet === 'dark') {
        document.body.classList.add('dark-mode-active'); // Optional class for more specific body styling if needed
    }


    if (themeToggle) {
        // Set initial icon
        if (themeToSet === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        themeToggle.addEventListener('click', () => {
            let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                document.body.classList.add('dark-mode-active');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                document.body.classList.remove('dark-mode-active');
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Active Nav Link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === '' || currentPath === 'index.html' && window.location.pathname.endsWith('/')) {
        currentPath = 'index.html'; // Treat root path as index.html
    }


    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
            // If it's a dropdown item, also activate its parent dropdown toggle
            if (link.classList.contains('dropdown-item')) {
                const parentDropdown = link.closest('.nav-item.dropdown');
                if (parentDropdown) {
                    const toggleLink = parentDropdown.querySelector('.nav-link.dropdown-toggle');
                    if (toggleLink) {
                       toggleLink.classList.add('active');
                    }
                }
            }
        } else {
            link.classList.remove('active');
        }
    });
    // Special case for homepage when path might be just "/"
    if (currentPath === "index.html" || currentPath === "") {
         const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
         if (homeLink) homeLink.classList.add('active');
    }

});