// document.addEventListener('DOMContentLoaded', function () {
//     // --- Theme Toggler ---
//     const themeToggler = document.getElementById('theme-toggler');
//     const htmlElement = document.documentElement; // Targets <html>
//     const themeIcon = themeToggler.querySelector('i');

//     // Load saved theme from localStorage or default to 'light'
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     htmlElement.setAttribute('data-bs-theme', savedTheme);
//     updateThemeIcon(savedTheme);

//     themeToggler.addEventListener('click', () => {
//         const currentTheme = htmlElement.getAttribute('data-bs-theme');
//         const newTheme = currentTheme === 'light' ? 'dark' : 'light';
//         htmlElement.setAttribute('data-bs-theme', newTheme);
//         localStorage.setItem('theme', newTheme);
//         updateThemeIcon(newTheme);
//     });

//     function updateThemeIcon(theme) {
//         if (theme === 'dark') {
//             themeIcon.classList.remove('bi-moon-stars-fill');
//             themeIcon.classList.add('bi-sun-fill');
//         } else {
//             themeIcon.classList.remove('bi-sun-fill');
//             themeIcon.classList.add('bi-moon-stars-fill');
//         }
//     }

//     // --- Active Nav Link ---
//     const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
//     const currentPath = window.location.pathname.split("/").pop() || 'index.html'; // Get current page filename

//     navLinks.forEach(link => {
//         const linkPath = link.getAttribute('href').split("/").pop();
//         if (linkPath === currentPath) {
//             // Remove active from all first (if any was manually set in HTML)
//             navLinks.forEach(l => l.classList.remove('active'));
//             // Add active to the current one
//             link.classList.add('active');
//             // If it's in a dropdown, also make the dropdown toggle active (optional)
//             const parentDropdown = link.closest('.nav-item.dropdown');
//             if (parentDropdown) {
//                 parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
//             }
//         } else {
//             link.classList.remove('active'); // Ensure others are not active
//         }
//     });

//     // --- Update current year in footer ---
//     const yearSpan = document.getElementById('currentYear');
//     if (yearSpan) {
//         yearSpan.textContent = new Date().getFullYear();
//     }

//     // --- Contact Form Submission (Example) ---
//     const contactForm = document.getElementById('contactForm');
//     if (contactForm) {
//         contactForm.addEventListener('submit', function (event) {
//             event.preventDefault(); // Prevent actual submission for this demo
//             // You would typically gather form data here:
//             // const name = document.getElementById('contactName').value;
//             // const email = document.getElementById('contactEmail').value;
//             // const message = document.getElementById('contactMessage').value;
//             // console.log('Form submitted:', { name, email, message });

//             // Show a success message (or error)
//             const formMessages = document.getElementById('formMessages');
//             if (formMessages) {
//                 formMessages.innerHTML = '<div class="alert alert-success" role="alert">Thank you for your message! We will get back to you soon.</div>';
//                 contactForm.reset(); // Clear the form
//             } else {
//                 alert('Thank you for your message!'); // Fallback
//                 contactForm.reset();
//             }
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", function () {
  const themeToggler = document.getElementById("theme-toggler");
  const htmlElement = document.documentElement;
  const themeIcon = themeToggler.querySelector("i");
  const mainNavbar = document.getElementById("mainNavbar"); // Get the navbar

  // --- Theme Toggler ---
  const savedTheme = localStorage.getItem("theme") || "light";
  htmlElement.setAttribute("data-bs-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggler.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    htmlElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.classList.remove("bi-moon-stars-fill");
      themeIcon.classList.add("bi-sun-fill");
    } else {
      themeIcon.classList.remove("bi-sun-fill");
      themeIcon.classList.add("bi-moon-stars-fill");
    }
  }

  // --- Navbar Scroll Effect ---
  if (mainNavbar) {
    const scrollThreshold = 50; // Pixels to scroll before changing navbar
    const addScrolledClass = () => {
      if (window.scrollY > scrollThreshold) {
        mainNavbar.classList.add("scrolled");
      } else {
        mainNavbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", addScrolledClass);
    addScrolledClass(); // Initial check in case page is already scrolled
  }

  // --- Active Nav Link ---
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").split("/").pop();
    // Reset active state for all links first
    link.classList.remove("active");
    const parentDropdownToggle = link
      .closest(".nav-item.dropdown")
      ?.querySelector(".dropdown-toggle");
    if (parentDropdownToggle) {
      parentDropdownToggle.classList.remove("active");
    }

    if (linkPath === currentPath) {
      link.classList.add("active");
      if (parentDropdownToggle) {
        parentDropdownToggle.classList.add("active");
      }
    }
  });

  // --- Update current year in footer ---
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Contact Form Submission (Example) ---
  // const contactForm = document.getElementById('contactForm');
  // if (contactForm) {
  //     contactForm.addEventListener('submit', function (event) {
  //         event.preventDefault();
  //         const formMessages = document.getElementById('formMessages');
  //         if (formMessages) {
  //             formMessages.innerHTML = '<div class="alert alert-success" role="alert">Thank you for your message! We will get back to you soon.</div>';
  //             contactForm.reset();
  //         } else {
  //             alert('Thank you for your message!');
  //             contactForm.reset();
  //         }
  //     });
  // }

  // --- Contact Form Submission & Validation (Updated) ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener(
      "submit",
      function (event) {
        if (!contactForm.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          // Optionally, scroll to the first invalid field
          const firstInvalidField = contactForm.querySelector(":invalid");
          if (firstInvalidField) {
            // firstInvalidField.focus(); // Can be slightly jarring
            // Consider scrolling into view smoothly if needed
            // firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else {
          // Form is valid, proceed with submission (AJAX or default)
          event.preventDefault(); // Prevent actual submission for this demo

          const formMessages = document.getElementById("formMessages");
          if (formMessages) {
            // Simulate AJAX submission
            formMessages.innerHTML =
              '<div class="alert alert-info alert-dismissible fade show" role="alert">Sending your message... <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
            setTimeout(() => {
              formMessages.innerHTML =
                '<div class="alert alert-success alert-dismissible fade show" role="alert">Thank you for your message! We will get back to you soon. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
              contactForm.reset();
              contactForm.classList.remove("was-validated"); // Reset validation state
            }, 2000);
          } else {
            alert("Thank you for your message!"); // Fallback
            contactForm.reset();
            contactForm.classList.remove("was-validated");
          }
        }
        contactForm.classList.add("was-validated"); // Add class to show validation messages
      },
      false
    );
  }

  // ... (Keep all your existingDOMContentLoaded, theme toggler, navbar scroll, active nav, current year logic) ...

  // --- Demo Request Form Submission & Validation ---
  const demoRequestForm = document.getElementById("demoRequestForm");
  if (demoRequestForm) {
    demoRequestForm.addEventListener(
      "submit",
      function (event) {
        if (!demoRequestForm.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          // Form is valid, proceed with submission (AJAX or default)
          event.preventDefault(); // Prevent actual submission for this demo

          const formMessages = document.getElementById("demoFormMessages");
          if (formMessages) {
            // Simulate AJAX submission
            formMessages.innerHTML =
              '<div class="alert alert-info alert-dismissible fade show" role="alert">Submitting your request... <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            // Gather form data (example)
            // const email = document.getElementById('demoWorkEmail').value;
            // console.log("Demo request from:", email);

            setTimeout(() => {
              formMessages.innerHTML =
                '<div class="alert alert-success alert-dismissible fade show" role="alert">Thank you! We received your demo request and will be in touch soon. <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
              demoRequestForm.reset();
              demoRequestForm.classList.remove("was-validated"); // Reset validation state
            }, 2000);
          } else {
            alert("Thank you for your demo request! We will be in touch."); // Fallback
            demoRequestForm.reset();
            demoRequestForm.classList.remove("was-validated");
          }
        }
        demoRequestForm.classList.add("was-validated"); // Add class to show validation messages
      },
      false
    );
  }

  // Add this to your js/script.js inside the DOMContentLoaded listener

  // --- Bootstrap Form Validation (Generic) ---
  const formsToValidate = document.querySelectorAll(".needs-validation");
  Array.from(formsToValidate).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          // If it's one of our specific forms, handle its specific success message
          if (form.id === "heroEmailForm") {
            event.preventDefault(); // Prevent actual submission for demo
            // You would handle the email submission here (e.g., via AJAX)
            alert(
              "Thank you for your interest! (Email: " +
                form.querySelector("#heroEmail").value +
                ")"
            );
            form.reset();
            form.classList.remove("was-validated");
          }
          // Let contactForm and demoRequestForm be handled by their specific handlers
          // if they exist and also have the 'needs-validation' class.
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
});
