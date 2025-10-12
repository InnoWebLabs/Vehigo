const onecards = [
  {
    icon: "✈️",
    title: "Travel Inquiries",
    info: "hello@vehigo.com",
    sub: "Response within 2 hours",
    bgClass: "card-blue",
    iconClass: "icon-blue",
  },
  {
    icon: "🌍",
    title: "24/7 Support",
    info: "1800-100-100",
    sub: "Emergency assistance",
    bgClass: "card-green",
    iconClass: "icon-green",
  },
  {
    icon: "📍",
    title: "Visit Our Office",
    info: "Xyz, New Delhi",
    sub: "Mon-Sat: 9:00AM-6:00PM",
    bgClass: "card-purple",
    iconClass: "icon-purple",
  },
];

const cardsContainer = document.getElementById("ContactUscards");
onecards.forEach((card) => {
  const div = document.createElement("div");
  div.className = `card ${card.bgClass}`;
  div.innerHTML = `

    <div class="icon ${card.iconClass}">${card.icon}</div>
    <div>
    <br>
      <h4 class="title text-light">${card.title}</h4>
      <p class="info text-light">${card.info}</p>
      <p class="sub text-light">${card.sub}</p>
    </div>
  `;
  cardsContainer.appendChild(div);
});

const form = document.getElementById("form");
const success = document.getElementById("successMessage");
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');

function validateName(name) {
  const trimmedName = name.trim();
  if (trimmedName.length < 3) {
    return { valid: false, message: "Name must be at least 3 characters long" };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
    return {
      valid: false,
      message: "Name can only contain letters, spaces, hyphens and apostrophes",
    };
  }
  return { valid: true };
}

function validateEmail(email) {
  const trimmedEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, message: "Please enter a valid email address" };
  }
  return { valid: true };
}

function validateMessage(message) {
  const trimmedMessage = message.trim();
  if (trimmedMessage.length < 10) {
    return {
      valid: false,
      message: "Message must be at least 10 characters long",
    };
  }
  if (trimmedMessage.length > 500) {
    return { valid: false, message: "Message cannot exceed 500 characters" };
  }
  return { valid: true };
}

function showError(input, message) {
  const formGroup = input.parentElement;
  let errorElement = formGroup.querySelector(".error-message");

  if (!errorElement) {
    errorElement = document.createElement("span");
    errorElement.className = "error-message";
    formGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
  input.classList.add("input-error");
  input.setAttribute("aria-invalid", "true");
  input.setAttribute(
    "aria-describedby",
    errorElement.id || "error-" + input.name
  );
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");

  if (errorElement) {
    errorElement.textContent = "";
  }

  input.classList.remove("input-error");
  input.setAttribute("aria-invalid", "false");
  input.removeAttribute("aria-describedby");
}

nameInput.addEventListener("blur", () => {
  const validation = validateName(nameInput.value);
  if (!validation.valid) {
    showError(nameInput, validation.message);
  } else {
    clearError(nameInput);
  }
});

emailInput.addEventListener("blur", () => {
  const validation = validateEmail(emailInput.value);
  if (!validation.valid) {
    showError(emailInput, validation.message);
  } else {
    clearError(emailInput);
  }
});

messageInput.addEventListener("blur", () => {
  const validation = validateMessage(messageInput.value);
  if (!validation.valid) {
    showError(messageInput, validation.message);
  } else {
    clearError(messageInput);
  }
});

nameInput.addEventListener("input", () => {
  if (nameInput.classList.contains("input-error")) {
    const validation = validateName(nameInput.value);
    if (validation.valid) {
      clearError(nameInput);
    }
  }
});

emailInput.addEventListener("input", () => {
  if (emailInput.classList.contains("input-error")) {
    const validation = validateEmail(emailInput.value);
    if (validation.valid) {
      clearError(emailInput);
    }
  }
});

messageInput.addEventListener("input", () => {
  if (messageInput.classList.contains("input-error")) {
    const validation = validateMessage(messageInput.value);
    if (validation.valid) {
      clearError(messageInput);
    }
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValidation = validateName(nameInput.value);
  const emailValidation = validateEmail(emailInput.value);
  const messageValidation = validateMessage(messageInput.value);

  let isValid = true;

  if (!nameValidation.valid) {
    showError(nameInput, nameValidation.message);
    isValid = false;
  }

  if (!emailValidation.valid) {
    showError(emailInput, emailValidation.message);
    isValid = false;
  }

  if (!messageValidation.valid) {
    showError(messageInput, messageValidation.message);
    isValid = false;
  }

  if (isValid) {
    form.classList.add("hidden");
    success.classList.remove("hidden");

    form.reset();

    setTimeout(() => {
      success.classList.add("hidden");
      form.classList.remove("hidden");
    }, 3000);
  }
});
