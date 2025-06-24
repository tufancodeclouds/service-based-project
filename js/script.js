// Toast utility
function showToast(message) {
  const toastContainer = document.createElement('div');
  toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
  toastContainer.style.zIndex = '1055';

  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-primary border-0 show';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');
  toast.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>`;

  toastContainer.appendChild(toast);
  document.body.appendChild(toastContainer);

  setTimeout(() => toastContainer.remove(), 3000);
}

// Check login status and update navbar/bookings
function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const welcome = document.getElementById('welcomeUser');
  const notLoggedInMsg = document.getElementById('notLoggedInMsg');
  const bookingContent = document.getElementById('bookingContent');

  if (user) {
    if (welcome) welcome.innerHTML = `<i class="fa-regular fa-circle-user"></i> ${user.name.split(' ')[0]}`;
    loginBtn?.classList.add('d-none');
    logoutBtn?.classList.remove('d-none');
    notLoggedInMsg?.classList.add('d-none');
    bookingContent?.classList.remove('d-none');

    // Show welcome toast only once
    const showLoginToast = localStorage.getItem('showLoginToast');
    if (showLoginToast === 'true') {
      showToast(`Welcome, ${user.name.split(' ')[0]}!`);
      localStorage.removeItem('showLoginToast');
    }
  } else {
    if (welcome) welcome.innerHTML = '';
    loginBtn?.classList.remove('d-none');
    logoutBtn?.classList.add('d-none');
    notLoggedInMsg?.classList.remove('d-none');
    bookingContent?.classList.add('d-none');
  }
}

// Render all bookings
function renderBookings() {
  const listWrapper = document.getElementById('bookedServicesList');
  const emptyMessage = document.getElementById('noBookings');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

  listWrapper.innerHTML = '';
  if (bookings.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
    bookings.forEach((booking, index) => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-12';
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-primary d-flex justify-content-between align-items-center';
      alertDiv.innerHTML = `
        <div>
          <strong>${booking.name.split(' ')[0]}</strong> booked <strong>${booking.service}</strong> on <strong>${booking.date}</strong> at <strong>${booking.time}</strong><br>
          <small>${booking.address || ''}</small>
        </div>
        <button class="btn btn-sm btn-danger text-white px-3 rounded-pill" onclick="cancelBooking(${index})">Cancel</button>
      `;
      colDiv.appendChild(alertDiv);
      listWrapper.appendChild(colDiv);
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

// Booking form handler
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) return showToast('Please login first.');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const address = document.getElementById('address').value.trim();

    if (!name || !phone || !service || !date || !time || !address) {
      return showToast('Please fill in all required fields.');
    }

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ name, email, phone, service, date, time, address });
    localStorage.setItem('bookings', JSON.stringify(bookings));

    showToast(`Thanks ${name.split(' ')[0]}, your ${service} booking is confirmed.`);
    bookingForm.reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById('bookingModal'));
    modal.hide();
    renderBookings();
  });
}

// Open booking modal if logged in
const openBookingBtn = document.getElementById('openBookingBtn');
if (openBookingBtn) {
  openBookingBtn.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
      return showToast('Please login to book a service.');
    }
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();
  });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (hash && document.getElementById('service')) {
    const select = document.getElementById('service');
    [...select.options].forEach(opt => {
      if (opt.textContent === hash || opt.value === hash) opt.selected = true;
    });
  }
  checkLoginStatus();
  renderBookings();
});
