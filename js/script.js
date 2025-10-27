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

    // Закрытие меню при клике вне
    window.addEventListener('click', (event) => {
        if (
            event.target.closest('.nav') ||
            event.target.closest('.menu-toggle')
        ) return;

        nav.classList.remove('nav--active');
        menuToggle.classList.remove('menu-toggle--active');
    });

    // Закрытие меню по Esc
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('nav--active')) {
            nav.classList.remove('nav--active');
            menuToggle.classList.remove('menu-toggle--active');
        }
    });

    // Закрытие меню при клике по ссылкам
    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--active');
            menuToggle.classList.remove('menu-toggle--active');
        });
    });
});

// Скролл в начало при загрузке
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// дата в подвале
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('ru-RU', options);
  document.getElementById("current-date").textContent = `Сегодня: ${today}`;


