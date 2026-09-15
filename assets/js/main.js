(() => {
  'use strict';

  const config = window.VOX_CONFIG || {};
  const root = document.documentElement;
  const storageKey = config.themeStorageKey || 'vox-theme';
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const safeStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // Storage can be unavailable in privacy-restricted environments.
      }
    }
  };

  const applyConfig = () => {
    document.querySelectorAll('[data-config]').forEach((element) => {
      const key = element.dataset.config;
      if (Object.prototype.hasOwnProperty.call(config, key)) {
        element.textContent = config[key];
      }
    });

    document.querySelectorAll('[data-config-href]').forEach((element) => {
      const key = element.dataset.configHref;
      const value = config[key];
      if (value) element.setAttribute('href', value);
    });
  };

  const icons = {
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v2m0 14v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M3 12h2m14 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><circle cx="12" cy="12" r="4"/></svg>',
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5 8.5 8.5 0 1 0 20.5 14.7Z"/></svg>'
  };

  const themeButton = document.querySelector('[data-theme-toggle]');

  const getInitialTheme = () => {
    const saved = safeStorage.get(storageKey);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (theme, persist = true) => {
    root.dataset.theme = theme;

    if (persist) safeStorage.set(storageKey, theme);

    if (!themeButton) return;

    const nextTheme = theme === 'light' ? 'dark' : 'light';
    themeButton.innerHTML = icons[theme];
    themeButton.setAttribute('aria-label', `فعال‌کردن حالت ${nextTheme === 'light' ? 'روشن' : 'تاریک'}`);
    themeButton.setAttribute('title', `حالت ${nextTheme === 'light' ? 'روشن' : 'تاریک'}`);
  };

  const initTheme = () => {
    setTheme(getInitialTheme(), false);
    themeButton?.addEventListener('click', () => {
      setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
    });
  };

  const initNavigation = () => {
    const nav = document.querySelector('.nav');
    const menuButton = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 20);
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    const closeMenu = () => {
      navLinks?.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    };

    menuButton?.addEventListener('click', () => {
      const isOpen = navLinks?.classList.toggle('open') ?? false;
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });

    document.addEventListener('click', (event) => {
      if (!navLinks?.classList.contains('open')) return;
      if (!event.target.closest('.nav')) closeMenu();
    });

    const currentPage = document.body.dataset.page;
    if (!currentPage) return;

    document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
      const isCurrent = link.dataset.page === currentPage;
      link.classList.toggle('active', isCurrent);

      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  const initReveal = () => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px'
    });

    items.forEach((item) => observer.observe(item));
  };

  const initCourseFilters = () => {
    const filters = [...document.querySelectorAll('[data-filter]')];
    const cards = [...document.querySelectorAll('[data-category]')];
    const emptyState = document.querySelector('[data-empty-state]');

    if (!filters.length || !cards.length) return;

    const applyFilter = (value) => {
      let visibleCount = 0;

      cards.forEach((card) => {
        const visible = value === 'all' || card.dataset.category === value;
        card.classList.toggle('is-hidden', !visible);
        if (visible) visibleCount += 1;
      });

      emptyState?.classList.toggle('is-visible', visibleCount === 0);
    };

    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        filters.forEach((item) => {
          const isActive = item === filter;
          item.classList.toggle('active', isActive);
          item.setAttribute('aria-selected', String(isActive));
        });

        applyFilter(filter.dataset.filter || 'all');
      });
    });
  };

  const initForms = () => {
    const toast = document.querySelector('.toast');
    let toastTimer;

    const showToast = (message) => {
      if (!toast) return;

      window.clearTimeout(toastTimer);
      toast.textContent = message;
      toast.classList.add('show');
      toastTimer = window.setTimeout(() => toast.classList.remove('show'), config.toastDuration || 3200);
    };

    document.querySelectorAll('form[data-demo-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        showToast(config.formSuccessMessage || 'درخواست شما با موفقیت ثبت شد.');
        form.reset();
      });
    });
  };

  applyConfig();
  initTheme();
  initNavigation();
  initReveal();
  initCourseFilters();
  initForms();
})();
