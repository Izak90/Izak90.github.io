(() => {
  'use strict';

  let studyNavScroll = null;
  let studyNavLinks = [];
  let navLeftBtn = null;
  let navRightBtn = null;
  let observedSections = [];

  let selectedStudySection = null;
  let programmaticStudyScroll = false;
  let studyScrollReleaseTimer = null;

  function updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;

    if (document.documentElement.classList.contains('dark')) {
      icon.className = 'fa-solid fa-sun text-amber-400 text-xs';
      document.getElementById('theme-color-meta')?.setAttribute('content', '#090d16');
    } else {
      icon.className = 'fa-solid fa-moon text-slate-700 text-xs';
      document.getElementById('theme-color-meta')?.setAttribute('content', '#ffffff');
    }
  }

  function setDarkMode() {
    document.documentElement.classList.add('dark');
    localStorage.setItem('cet_theme', 'dark');
    updateThemeIcon();
  }

  function setLightMode() {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('cet_theme', 'light');
    updateThemeIcon();
  }

  function initTheme() {
    if (localStorage.getItem('cet_theme') === 'light') setLightMode();
    else setDarkMode();
  }

  function toggleTheme() {
    document.documentElement.classList.contains('dark') ? setLightMode() : setDarkMode();
  }

  // Compatibility with older summary headers.
  function toggleDarkMode() {
    toggleTheme();
  }

  function toggleSearch() {
    const box = document.getElementById('search-box');
    const input = document.getElementById('search-input');
    if (!box || !input) return;

    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      input.focus();
    } else {
      box.classList.add('hidden');
    }

    requestAnimationFrame(updateStickyPositions);
  }

  function handleSummarySearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    const q = input.value.trim().toLocaleLowerCase('pt-PT');
    const sections = [...document.querySelectorAll('.study-section')];

    sections.forEach(section => {
      const matches = !q || section.textContent.toLocaleLowerCase('pt-PT').includes(q);
      section.classList.toggle('study-search-hidden', !matches);
    });

    studyNavLinks.forEach(link => {
      const section = document.getElementById(link.dataset.section);
      const hidden = section?.classList.contains('study-search-hidden');
      link.classList.toggle('study-search-hidden', Boolean(hidden));
    });

    updateStudyNavArrows();
  }

  function clearSummarySearch() {
    const input = document.getElementById('search-input');
    if (input) input.value = '';

    document.querySelectorAll('.study-search-hidden').forEach(el => {
      el.classList.remove('study-search-hidden');
    });

    document.getElementById('search-box')?.classList.add('hidden');
    requestAnimationFrame(() => {
      updateStickyPositions();
      updateStudyNavArrows();
    });
  }

  function updateStickyPositions() {
    const header = document.querySelector('body > header');
    const localNav = document.getElementById('uc-local-nav');
    const topicNav = document.getElementById('topic-nav');

    const headerH = header?.offsetHeight || 0;
    const localH = localNav?.offsetHeight || 0;

    document.documentElement.style.setProperty('--app-header-height', `${headerH}px`);
    document.documentElement.style.setProperty('--uc-local-nav-height', `${localH}px`);
    document.documentElement.style.setProperty('--study-shell-offset', `${headerH + localH}px`);

    if (localNav) localNav.style.top = `${headerH}px`;
    if (topicNav) topicNav.style.top = `${headerH + localH}px`;
  }

  function updateStudyNavArrows() {
    if (!studyNavScroll || !navLeftBtn || !navRightBtn) return;

    const maxScroll = Math.max(0, studyNavScroll.scrollWidth - studyNavScroll.clientWidth);
    navLeftBtn.disabled = studyNavScroll.scrollLeft <= 2;
    navRightBtn.disabled = studyNavScroll.scrollLeft >= maxScroll - 2;
  }

  function scrollStudyNav(direction) {
    if (!studyNavScroll) return;

    const amount = Math.max(180, Math.round(studyNavScroll.clientWidth * .72));
    studyNavScroll.scrollBy({
      left: direction * amount,
      behavior: 'smooth'
    });
  }

  function centerActiveNavLink(activeLink) {
    if (!activeLink || !studyNavScroll) return;

    const scrollerRect = studyNavScroll.getBoundingClientRect();
    const itemRect = activeLink.getBoundingClientRect();

    const itemCenterInsideScroller =
      (itemRect.left - scrollerRect.left) +
      studyNavScroll.scrollLeft +
      (itemRect.width / 2);

    const target = itemCenterInsideScroller - (studyNavScroll.clientWidth / 2);

    studyNavScroll.scrollTo({
      left: Math.max(0, target),
      behavior: 'smooth'
    });
  }

  function setActiveStudyNav(sectionId, center = true) {
    selectedStudySection = sectionId;

    studyNavLinks.forEach(link => {
      const active = link.dataset.section === sectionId;
      link.classList.toggle('is-active', active);
    });

    if (center) {
      centerActiveNavLink(studyNavLinks.find(link => link.dataset.section === sectionId));
    }
  }

  function getStudyStickyOffset() {
    const header = document.querySelector('body > header');
    const localNav = document.getElementById('uc-local-nav');
    const topicNav = document.getElementById('topic-nav');

    return (header?.offsetHeight || 0) +
      (localNav?.offsetHeight || 0) +
      (topicNav?.offsetHeight || 0) + 8;
  }

  function scrollToStudySection(sectionId, smooth = true) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (smooth) {
      programmaticStudyScroll = true;
      selectedStudySection = sectionId;
      clearTimeout(studyScrollReleaseTimer);

      studyScrollReleaseTimer = setTimeout(() => {
        programmaticStudyScroll = false;
      }, 1100);
    }

    const y = section.getBoundingClientRect().top + window.scrollY - getStudyStickyOffset();

    window.scrollTo({
      top: Math.max(0, y),
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  function initTopicNavigation() {
    studyNavScroll = document.getElementById('study-nav-scroll');
    studyNavLinks = [...document.querySelectorAll('.study-nav[data-section]')];
    navLeftBtn = document.getElementById('nav-scroll-left');
    navRightBtn = document.getElementById('nav-scroll-right');

    updateStickyPositions();

    if (!studyNavLinks.length) return;

    studyNavLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();

        const sectionId = link.dataset.section;
        setActiveStudyNav(sectionId, true);
        history.replaceState(null, '', `#${sectionId}`);
        scrollToStudySection(sectionId, true);
      });
    });

    if (studyNavScroll) {
      studyNavScroll.addEventListener('scroll', updateStudyNavArrows, { passive: true });

      studyNavScroll.addEventListener('wheel', event => {
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
          event.preventDefault();
          studyNavScroll.scrollLeft += event.deltaY;
        }
      }, { passive: false });
    }

    observedSections = studyNavLinks
      .map(link => document.getElementById(link.dataset.section))
      .filter(Boolean);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        // When navigation was initiated by a topic click, retain the clicked
        // item highlight until the smooth scroll reaches the target.
        if (programmaticStudyScroll) return;

        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length) {
          setActiveStudyNav(visible[0].target.id, true);
        }
      }, {
        root: null,
        rootMargin: '-190px 0px -58% 0px',
        threshold: [.05, .2, .5]
      });

      observedSections.forEach(section => observer.observe(section));
    }

    // A genuine manual vertical interaction releases the click-scroll lock.
    ['wheel', 'touchstart'].forEach(eventName => {
      window.addEventListener(eventName, () => {
        if (programmaticStudyScroll) {
          programmaticStudyScroll = false;
          clearTimeout(studyScrollReleaseTimer);
        }
      }, { passive: true });
    });

    requestAnimationFrame(() => {
      updateStickyPositions();
      updateStudyNavArrows();

      const initial =
        location.hash && document.getElementById(location.hash.slice(1))
          ? location.hash.slice(1)
          : (observedSections[0]?.id || '');

      if (initial) {
        setActiveStudyNav(initial, true);

        if (location.hash) {
          requestAnimationFrame(() => scrollToStudySection(initial, false));
        }
      }
    });
  }

  function init() {
    initTheme();
    initTopicNavigation();

    window.addEventListener('resize', () => {
      updateStickyPositions();
      updateStudyNavArrows();
    });
  }

  // Public functions used by existing HTML onclick/oninput attributes.
  window.toggleTheme = toggleTheme;
  window.toggleDarkMode = toggleDarkMode;
  window.toggleSearch = toggleSearch;
  window.handleSummarySearch = handleSummarySearch;
  window.clearSummarySearch = clearSummarySearch;
  window.scrollStudyNav = scrollStudyNav;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
