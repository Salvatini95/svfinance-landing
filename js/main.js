// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── NAV HIGHLIGHT ──
const navSections = document.querySelectorAll('[id]');
window.addEventListener('scroll', () => {
  const pos = window.scrollY + 80;
  navSections.forEach(s => {
    const link = document.querySelector(`nav a[href="#${s.id}"]`);
    if (!link) return;
    const active = pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight;
    link.classList.toggle('active', active);
  });
});

// ── NEWSLETTER ──
const form = document.getElementById('nl-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value;
    console.log('Newsletter:', email);
    // TODO: integrar com API /newsletter
    form.style.display = 'none';
    document.getElementById('nl-success').style.display = 'block';
  });
}