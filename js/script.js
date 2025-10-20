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


document.addEventListener('DOMContentLoaded', function() {
  const openBtn = document.getElementById('openModalBtn');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeModalBtn');
  const form = document.getElementById('applyForm');
  const statusBox = document.getElementById('formStatus');

  // Если вы случайно оставили старую mailto ссылку, переключаем её поведение
  // (ищем <a href="mailto:..."> в hero и отключаем переход)
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    // если нужно — можно отключать только определённую ссылку по тексту или классу
    a.addEventListener('click', function(e){
      // предотвращаем открытие почтового клиента и откроем модалку вместо этого
      e.preventDefault();
      openModal();
    });
  });

  function openModal() {
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    const first = overlay.querySelector('input,textarea,button');
    if (first) first.focus();
  }
  function closeModal() {
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden', 'true');
  }

  openBtn && openBtn.addEventListener('click', openModal);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e)=> { if (e.key === 'Escape') closeModal(); });

  // Обработка отправки: Formspree вернёт 200 и перенаправление — мы перехватим ответ для UX
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      statusBox.textContent = 'Отправка...';
      const action = form.getAttribute('action');
      try {
        const formData = new FormData(form);
        const resp = await fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (resp.ok) {
          const data = await resp.json();
          // Formspree возвращает { "success": true } или пустой объект
          statusBox.style.color = 'green';
          statusBox.textContent = '✅ Заявка отправлена! Спасибо.';
          form.reset();
          setTimeout(closeModal, 1500);
        } else {
          const err = await resp.json();
          statusBox.style.color = 'red';
          statusBox.textContent = err?.error || 'Ошибка отправки. Попробуйте позже.';
        }
      } catch (err) {
        console.error(err);
        statusBox.style.color = 'red';
        statusBox.textContent = 'Сетевая ошибка. Проверьте интернет.';
      }
    });
  }
});


