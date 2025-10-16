// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (!menuToggle || !nav) return;

    const toggleMenu = () => {
        nav.classList.toggle('nav--active');
        menuToggle.classList.toggle('menu-toggle--active');
    };

    menuToggle.addEventListener('click', toggleMenu);

    window.addEventListener('click', (event) => {
        if (!event.target.closest('.nav') && !event.target.closest('.menu-toggle')) {
            nav.classList.remove('nav--active');
            menuToggle.classList.remove('menu-toggle--active');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('nav--active')) {
            nav.classList.remove('nav--active');
            menuToggle.classList.remove('menu-toggle--active');
        }
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--active');
            menuToggle.classList.remove('menu-toggle--active');
        });
    });
});


window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});


