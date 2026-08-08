/* ============================================
   Landing Page Builder — App Template
   Copy this file as your project's script.
   Requires: design-system.css (for .reveal, etc.)
   Zero dependencies. Progressive enhancement.
   ============================================ */

(function () {
    'use strict';

    // ========================================
    // 1. Scroll Reveal (IntersectionObserver)
    // ========================================

    function initScrollReveal() {
        var reveals = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            // Fallback: show everything
            reveals.forEach(function (el) { el.classList.add('visible'); });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(function (el) { observer.observe(el); });
    }

    // ========================================
    // 2. Navbar Scroll Effect + Progress Bar
    // ========================================

    function initNavbarScroll() {
        var navbar = document.getElementById('navbar');
        var progressBar = document.getElementById('progressBar');
        var lastScroll = 0;

        window.addEventListener('scroll', function () {
            var scroll = window.pageYOffset || document.documentElement.scrollTop;

            // Navbar shadow
            if (navbar) {
                if (scroll > 10) navbar.classList.add('scrolled');
                else navbar.classList.remove('scrolled');
            }

            // Progress bar
            if (progressBar) {
                var docHeight = document.documentElement.scrollHeight - window.innerHeight;
                var progress = docHeight > 0 ? (scroll / docHeight) * 100 : 0;
                progressBar.style.width = progress + '%';
            }

            lastScroll = scroll;
        }, { passive: true });
    }

    // ========================================
    // 3. Mobile Menu Toggle
    // ========================================

    function initMobileMenu() {
        var toggle = document.getElementById('menuToggle');
        var menu = document.getElementById('mobileMenu');
        if (!toggle || !menu) return;

        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            menu.classList.toggle('open');
        });

        // Close on link click
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                toggle.classList.remove('active');
                menu.classList.remove('open');
            });
        });
    }

    // ========================================
    // 4. Code Copy Buttons
    // ========================================

    function initCodeCopy() {
        document.querySelectorAll('.code-copy').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var block = btn.closest('.code-block');
                if (!block) return;
                var code = block.querySelector('code');
                if (!code) return;

                var text = code.textContent;
                var originalText = btn.textContent;

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(function () {
                        btn.textContent = '✓ Copied';
                        btn.classList.add('copied');
                        setTimeout(function () {
                            btn.textContent = originalText;
                            btn.classList.remove('copied');
                        }, 2000);
                    });
                } else {
                    // Fallback
                    var ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    try { document.execCommand('copy'); } catch (e) {}
                    document.body.removeChild(ta);
                    btn.textContent = '✓ Copied';
                    btn.classList.add('copied');
                    setTimeout(function () {
                        btn.textContent = originalText;
                        btn.classList.remove('copied');
                    }, 2000);
                }
            });
        });
    }

    // ========================================
    // 5. Tabs
    // ========================================

    function initTabs() {
        document.querySelectorAll('[data-tabs]').forEach(function (container) {
            var buttons = container.querySelectorAll('.tab-btn');
            var panels = container.querySelectorAll('.tab-panel');

            buttons.forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var target = btn.getAttribute('data-tab');

                    buttons.forEach(function (b) { b.classList.remove('active'); });
                    panels.forEach(function (p) { p.classList.remove('active'); });

                    btn.classList.add('active');
                    var panel = container.querySelector('[data-panel="' + target + '"]');
                    if (panel) panel.classList.add('active');
                });
            });
        });
    }

    // ========================================
    // 6. Theme Toggle (dark/light)
    // ========================================

    function initThemeToggle() {
        var themeBtn = document.querySelector('[data-toggle="theme"]');
        if (!themeBtn) return;

        // Load saved theme
        var saved = localStorage.getItem('lp-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', saved);
        if (themeBtn) themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';

        themeBtn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('lp-theme', next);
            themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
        });
    }

    // ========================================
    // 7. i18n (Internationalization)
    // ========================================
    //
    // Usage:
    //   1. Define window.translations = { en: {...}, ko: {...} }
    //   2. Add data-i18n="key.name" to HTML elements
    //   3. Call initI18n()
    //
    // Language buttons: <button class="lang-btn" data-lang="en">EN</button>

    function getLang() {
        return localStorage.getItem('lp-lang') || 'en';
    }

    function setLang(lang) {
        localStorage.setItem('lp-lang', lang);
        applyTranslations(lang);
        updateLangButtons(lang);
    }

    function applyTranslations(lang) {
        var dict = (typeof translations !== 'undefined') ? translations[lang] : {};
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key]) {
                // Preserve <code> children
                var codeEls = el.querySelectorAll('code');
                if (codeEls.length > 0) {
                    var codeTexts = Array.from(codeEls).map(function (c) { return c.textContent; });
                    var translated = dict[key];
                    var escaped = codeTexts.map(function (t) {
                        return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    });
                    var pattern = new RegExp('(' + escaped.join('|') + ')', 'g');
                    var parts = translated.split(pattern);

                    el.textContent = '';
                    parts.forEach(function (part) {
                        if (codeTexts.indexOf(part) !== -1) {
                            var code = document.createElement('code');
                            code.textContent = part;
                            el.appendChild(code);
                        } else if (part) {
                            el.appendChild(document.createTextNode(part));
                        }
                    });
                } else {
                    el.textContent = dict[key];
                }
            }
        });
        document.documentElement.lang = lang;
    }

    function updateLangButtons(lang) {
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    function initI18n() {
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                setLang(btn.getAttribute('data-lang'));
            });
        });
        applyTranslations(getLang());
        updateLangButtons(getLang());
    }

    // ========================================
    // 8. Smooth Anchor Scrolling (native via CSS)
    // ========================================
    // html { scroll-behavior: smooth; } handles this.
    // This adds offset correction for fixed navbar:
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var href = this.getAttribute('href');
                if (href === '#' || href.length < 2) return;
                var target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                var offset = 70; // navbar height
                var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            });
        });
    }

    // ========================================
    // Init Everything
    // ========================================

    function init() {
        initScrollReveal();
        initNavbarScroll();
        initMobileMenu();
        initCodeCopy();
        initTabs();
        initThemeToggle();
        initI18n();
        initSmoothScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for manual control
    window.LP = {
        setLang: setLang,
        getLang: getLang,
        applyTranslations: applyTranslations,
    };
})();
