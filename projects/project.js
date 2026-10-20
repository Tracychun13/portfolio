// Shared script for every project page in this folder.
// Case-study pages: fade-in for process steps, and a full-size screenshot viewer.
// Load this AFTER script.js on each project page.
document.addEventListener('DOMContentLoaded', () => {
  // ----- Fade in process steps and sections as they scroll into view -----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.step, .cs-section').forEach((el) => {
      el.classList.add('reveal');
      reveal.observe(el);
    });
  }

  // ----- Screenshot lightbox (case-study pages) -----
  // Any real <img class="shot"> opens full-size with its caption when clicked.
  const shots = document.querySelectorAll('img.shot');
  if (shots.length && typeof HTMLDialogElement === 'function') {
    const box = document.createElement('dialog');
    box.className = 'lightbox';
    box.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close image">×</button><img alt=""><p></p>';
    document.body.appendChild(box);
    const boxImg = box.querySelector('img');
    const boxCap = box.querySelector('p');

    shots.forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      const open = () => {
        boxImg.src = img.currentSrc || img.src;
        boxImg.alt = img.alt;
        const cap = img.closest('figure')?.querySelector('figcaption');
        boxCap.textContent = cap ? cap.textContent : '';
        box.showModal();
      };
      img.addEventListener('click', open);
      img.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });
    box.querySelector('.lightbox-close').addEventListener('click', () => box.close());
    box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
  }

});
