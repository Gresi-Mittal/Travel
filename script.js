// Initialize AOS (Animations)
AOS.init({
    duration: 800,
    offset: 150,
    once: false
});

// Mobile Menu Logic
const menuBtn = document.querySelector('#menu-btn');
const navbar = document.querySelector('.navbar');

menuBtn.onclick = () => {
    menuBtn.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

// Close menu on scroll or click
window.onscroll = () => {
    menuBtn.classList.remove('fa-times');
    navbar.classList.remove('active');
};

// Typed.js (Dynamic Text in Hero)
new Typed('#typed', {
    strings: ['Europe', 'Bali', 'Maldives', 'Goa', 'Switzerland'],
    typeSpeed: 60,
    backSpeed: 40,
    loop: true
});

// Smooth scroll handle (optional if CSS scroll-behavior works)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});