// Toast utility
function showToast(message) {
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container';
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  document.body.appendChild(toastContainer);
  setTimeout(() => toastContainer.remove(), 3000);
}

// Handle pre-select service from hash
window.addEventListener('DOMContentLoaded', () => {
  const hash = decodeURIComponent(window.location.hash.slice(1));
if (hash && document.getElementById('service')) {
  const select = document.getElementById('service');
  [...select.options].forEach(opt => {
    if (opt.textContent === hash || opt.value === hash) opt.selected = true;
  });
}

  renderBookings();
});

function renderBookings() {
  const container = document.getElementById('bookedServicesContainer');
  const listWrapper = document.getElementById('bookedServicesList');
  const emptyMessage = document.getElementById('noBookings');
  const bookBtnTop = document.getElementById('openBookingBtn');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

  listWrapper.innerHTML = '';

  if (bookings.length === 0) {
    container.style.display = 'block';
    emptyMessage.style.display = 'block';
    bookBtnTop.style.display = 'none';
  } else {
    container.style.display = 'block';
    emptyMessage.style.display = 'none';
    bookBtnTop.style.display = 'inline-block';
    bookings.forEach((booking, index) => {
      const div = document.createElement('div');
      div.className = 'alert alert-info d-flex justify-content-between align-items-center';
      div.innerHTML = `
        <div>
          <strong>${booking.name}</strong> booked <strong>${booking.service}</strong> on <strong>${booking.date}</strong> at <strong>${booking.time}</strong>
        </div>
        <button class="btn btn-sm btn-danger" onclick="cancelBooking(${index})">Cancel</button>
      `;
      listWrapper.appendChild(div);
    });
  }
}

function cancelBooking(index) {
  let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.splice(index, 1);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  showToast('Booking cancelled.');
  renderBookings();
}

// Booking modal submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const phone = document.getElementById('phone').value.trim();

    if (!name || !service || !date || !time || !phone) {
      showToast('Please fill in all required fields.');
      return;
    }

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ name, service, date, time });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    showToast(`Thanks ${name}, your ${service} booking is confirmed.`);
    bookingForm.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
    renderBookings();
  });
}

// Trigger modal
document.getElementById('openBookingBtn')?.addEventListener('click', () => {
  const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
  modal.show();
});