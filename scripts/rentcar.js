const carForm = document.getElementById('carForm');
const carList = document.getElementById('carList');

// Remove empty state when first car is added
function removeEmptyState() {
  const emptyState = carList.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }
}

carForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const carName = document.getElementById('carName').value;
  const year = document.getElementById('year').value;
  const price = document.getElementById('price').value;
  const location = document.getElementById('location').value;
  const imageUrl = document.getElementById('imageUrl').value;

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
  
  // Add smooth animation
  carCard.style.opacity = '0';
  carCard.style.transform = 'translateY(20px)';
  setTimeout(() => {
    carCard.style.transition = 'all 0.3s ease';
    carCard.style.opacity = '1';
    carCard.style.transform = 'translateY(0)';
  }, 100);
});
