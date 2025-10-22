const carForm = document.getElementById('carForm');
const carList = document.getElementById('carList');
const toastRoot = document.getElementById('toast-root');

// Remove empty state when first car is added
function removeEmptyState() {
  const emptyState = carList.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }
}

function showError(inputId, message) {
  const group = document.getElementById(`group-${inputId}`);
  if (!group) return;
  group.classList.add('has-error');
  const errorEl = document.getElementById(`${inputId}-error`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

function clearError(inputId) {
  const group = document.getElementById(`group-${inputId}`);
  if (!group) return;
  group.classList.remove('has-error');
  const errorEl = document.getElementById(`${inputId}-error`);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
}

function validateForm(values) {
  let isValid = true;
  const currentYear = new Date().getFullYear();

  // carName
  if (!values.carName || values.carName.trim().length < 2) {
    isValid = false;
    showError('carName', 'Please enter a valid model name.');
  } else {
    clearError('carName');
  }

  // year
  const yearNum = Number(values.year);
  if (!yearNum || yearNum < 1990 || yearNum > currentYear) {
    isValid = false;
    showError('year', `Enter a year between 1990 and ${currentYear}.`);
  } else {
    clearError('year');
  }

  // price
  const priceNum = Number(values.price);
  if (!priceNum || priceNum <= 0) {
    isValid = false;
    showError('price', 'Price must be greater than 0.');
  } else {
    clearError('price');
  }

  // location
  if (!values.location || values.location.trim().length < 2) {
    isValid = false;
    showError('location', 'Please enter a valid location.');
  } else {
    clearError('location');
  }

  // imageUrl
  try {
    // quick URL validation
    // eslint-disable-next-line no-new
    new URL(values.imageUrl);
    clearError('imageUrl');
  } catch (_) {
    isValid = false;
    showError('imageUrl', 'Please provide a valid image URL (https://...).');
  }

  return isValid;
}

function showSuccessToast(text) {
  if (!toastRoot) return;
  const toast = document.createElement('div');
  toast.className = 'success-message';
  toast.textContent = text;
  toastRoot.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 1800);
}

carForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const carName = document.getElementById('carName').value;
  const year = document.getElementById('year').value;
  const price = document.getElementById('price').value;
  const location = document.getElementById('location').value;
  const imageUrl = document.getElementById('imageUrl').value;

  const values = { carName, year, price, location, imageUrl };
  if (!validateForm(values)) {
    return;
  }

  // Remove empty state if it exists
  removeEmptyState();

  const carCard = document.createElement('div');
  carCard.classList.add('car-card');
  carCard.innerHTML = `
    <img src="${imageUrl}" alt="${carName}" class="car-image" onerror="this.src='https://via.placeholder.com/300x200?text=Car+Image'" />
    <div class="car-content">
      <h3 class="car-title">${carName} (${year})</h3>
      <div class="car-details">
        <div class="car-detail">
          <i class="fas fa-rupee-sign"></i>
          <span>₹${price}/day</span>
        </div>
        <div class="car-detail">
          <i class="fas fa-map-marker-alt"></i>
          <span>${location}</span>
        </div>
        <div class="car-detail">
          <i class="fas fa-calendar-alt"></i>
          <span>Year: ${year}</span>
        </div>
      </div>
      <div class="car-price">₹${price}/day</div>
    </div>
  `;

  carList.appendChild(carCard);
  carForm.reset();
  showSuccessToast('Car added successfully!');
  
  // Add smooth animation
  carCard.style.opacity = '0';
  carCard.style.transform = 'translateY(20px)';
  setTimeout(() => {
    carCard.style.transition = 'all 0.3s ease';
    carCard.style.opacity = '1';
    carCard.style.transform = 'translateY(0)';
  }, 100);
});
