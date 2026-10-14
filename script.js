// Navigation remains functional without JavaScript.
const navigationLinks = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

function updateNavigation() {
  const bottomReached = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
  let currentSection = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 120) currentSection = section;
  }
  if (bottomReached) currentSection = sections[sections.length - 1];
  for (const link of navigationLinks) {
    if (link.hash === `#${currentSection.id}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    updateNavigation();
    scheduled = false;
  });
}, { passive: true });
window.addEventListener('resize', updateNavigation);
window.addEventListener('load', updateNavigation);
updateNavigation();
