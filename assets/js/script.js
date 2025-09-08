'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  navToggleFunc();
});

overlay.addEventListener("click", function(e) {
  // Close the nav first
  navToggleFunc();

  // Attempt to activate the element beneath the overlay at the click point
  // This makes a single click both close the overlay and follow links
  const clickX = e.clientX;
  const clickY = e.clientY;

  // Temporarily disable pointer events to detect the element beneath
  const prevPointerEvents = overlay.style.pointerEvents;
  overlay.style.pointerEvents = "none";
  const elementBeneath = document.elementFromPoint(clickX, clickY);
  overlay.style.pointerEvents = prevPointerEvents || "";

  if (elementBeneath) {
    // If it's a link, navigate directly
    if (elementBeneath.tagName === 'A' && elementBeneath.href) {
      window.location.href = elementBeneath.href;
      return;
    }
    // If inside a link, find nearest anchor
    const anchorParent = elementBeneath.closest && elementBeneath.closest('a[href]');
    if (anchorParent && anchorParent.href) {
      window.location.href = anchorParent.href;
      return;
    }
    // Otherwise, trigger a click on the underlying element
    elementBeneath.click && elementBeneath.click();
  }
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function(e) {
    // Don't stop propagation here as we want navbar links to work normally
    navToggleFunc();
  });
}

// LOGIN ↔ SIGNUP form toggle logic
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".forms");
  const signupLink = document.querySelector(".signup-link");
  const loginLink = document.querySelector(".login-link");

  if (signupLink && loginLink && wrapper) {
    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      wrapper.classList.remove("show-login");
      wrapper.classList.add("show-signup");
    });

    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      wrapper.classList.remove("show-signup");
      wrapper.classList.add("show-login");
    });
  }
});
document.querySelectorAll(".eye-icon").forEach(eyeIcon => {
  eyeIcon.addEventListener("click", () => {
    // Find the password input next to the icon
    const passwordInput = eyeIcon.previousElementSibling; // Assuming input is right before the icon

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.classList.replace("bx-hide", "bx-show");
    } else {
      passwordInput.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    }
  });
});


/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * Triggering navigation buttons scroll
 */

document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.querySelector(".blog-list");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");

    const scrollAmount = 340; 

    rightArrow.addEventListener("click", () => {
      blogList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    leftArrow.addEventListener("click", () => {
      blogList.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  });

  // Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.querySelector('.back-to-top');
  let isScrolling;
  
  window.addEventListener('scroll', function() {
    window.clearTimeout(isScrolling);
    
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
    
    isScrolling = setTimeout(function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('pulse-effect');
        setTimeout(() => {
          backToTopButton.classList.remove('pulse-effect');
        }, 1000);
      }
    }, 100);
  });
  
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('clicked');
    setTimeout(() => {
      this.classList.remove('clicked');
    }, 300);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

/**
 * Theme Toggle Functionality
 * Handles light/dark mode switching with proper event isolation
 * to prevent interference with navbar functionality
 */
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Load theme from localStorage
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.checked = true;
    }
    
    // Add event listener with proper event handling
    themeToggle.addEventListener('change', function (e) {
      // Prevent event bubbling to avoid interference with navbar
      e.stopPropagation();
      
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Prevent clicks on the theme switch from triggering navbar events
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
      themeSwitch.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }
  } else {
    // Apply theme if toggle is not present (for pages without header)
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
});

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting immediately

  // Get all field elements
  const location = document.getElementById("input-1");
  const rent = document.getElementById("input-2");
  const carType = document.getElementById("car-type");
  const transmission = document.getElementById("transmission");
  const fuelType = document.getElementById("fuel-type");

  let isValid = true;

  // Clear all previous errors
  clearError(location, "location-error");
  clearError(rent, "rent-error");
  clearError(carType, "carType-error");
  clearError(transmission, "transmission-error");
  clearError(fuelType, "fuelType-error");

  // Validate Location
  if (location.value.trim() === "") {
    showError(location, "location-error", "Location is required");
    isValid = false;
  }

  // Validate Rent
  if (rent.value.trim() === "") {
    showError(rent, "rent-error", "Rent amount is required");
    isValid = false;
  } else if (isNaN(rent.value.trim()) || Number(rent.value.trim()) <= 0) {
    showError(rent, "rent-error", "Please enter a valid number");
    isValid = false;
  }

  // Validate Car Type
  if (carType.value === "") {
    showError(carType, "carType-error", "Please select a car type");
    isValid = false;
  }

  // Validate Transmission
  if (transmission.value === "") {
    showError(transmission, "transmission-error", "Please select transmission");
    isValid = false;
  }

  // Validate Fuel Type
  if (fuelType.value === "") {
    showError(fuelType, "fuelType-error", "Please select fuel type");
    isValid = false;
  }

  // Submit or alert if valid
  if (isValid) {
    alert("Form is valid! Proceeding with search...");
    // this.submit(); // Uncomment this line if you want to allow actual submission
  }
});

// Show error and add red border
function showError(inputEl, errorId, message) {
  inputEl.classList.add("input-error");
  document.getElementById(errorId).innerText = message;
}

// Clear previous error and red border
function clearError(inputEl, errorId) {
  inputEl.classList.remove("input-error");
  document.getElementById(errorId).innerText = "";
}


