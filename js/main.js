document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }
  document.querySelectorAll('[data-lead]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = form.querySelector('.lead-ok');
      if (ok) ok.hidden = false;
      form.reset();
    });
  });
});
