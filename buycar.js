// Modal logic
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalAction = document.getElementById('modal-action');
    const closeModal = document.getElementById('close-modal');

    function showModal(title, message, actionText, actionCallback) {
      modalTitle.textContent = title;
      modalMessage.textContent = message;
      if (actionText) {
        modalAction.textContent = actionText;
        modalAction.style.display = 'inline-block';
        modalAction.onclick = actionCallback;
      } else {
        modalAction.style.display = 'none';
      }
      modal.classList.add('active');
    }
    function hideModal() {
      modal.classList.remove('active');
    }
    closeModal.onclick = hideModal;
    modal.onclick = function(e) {
      if (e.target === modal) hideModal();
    };

    // Button event listeners
    document.querySelectorAll('.buy-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const car = btn.getAttribute('data-car');
        showModal(
          'Buy Car',
          `Thank you for choosing to buy the ${car}! Our team will contact you soon for further process.`,
          null
        );
      });
    });
    document.querySelectorAll('.rent-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const car = btn.getAttribute('data-car');
        showModal(
          'Rent Car',
          `You have selected to rent the ${car}. Please login or contact us to proceed.`,
          'Go to Login',
          () => { window.location.href = 'login.html'; }
        );
      });
    });
    // Buy Car Page Script
    document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  const carCards = document.querySelectorAll(".car-card");

  searchBar.addEventListener("input", () => {
    const searchTerm = searchBar.value.toLowerCase();
    carCards.forEach(card => {
      const carName = card.querySelector("h2").textContent.toLowerCase();
      card.style.display = carName.includes(searchTerm) ? "block" : "none";
    });
  });
});
