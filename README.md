## UrbanSnaps - On-Demand Home Services

UrbanSnaps is a modern and responsive multi-page website. This is a fully functional user interface for home services booking with features like user authentication, booking listings and dynamic interactions using HTML5, CSS3, Bootstrap 5, JavaScript (ES6) and jQuery.

## Live Demo

https://urbansnaps.vercel.app

## Features

- Responsive layout (mobile, tablet, desktop)
- User registration and login system using localStorage
- Form validations and dynamic toasts
- Secure Base64 password encoding
- Service listing with booking CTA
- Custom UI/UX using Bootstrap 5 & Font Awesome 6
- Slick.js slider for testimonials or banners
- Auto redirection if user tries to access login/register while already logged in

## Tech Stack

- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6)
- jQuery
- Slick Carousel
- Google Fonts + Font Awesome 6

## Authentication

- All user data is stored in browser's localStorage.
- Passwords are Base64-encoded using `btoa()` before saving.
- User redirection logic:
- Logged-in users can't access `login.html` or `register.html`.
- Upon successful login/registration, redirect to `booking.html`.
