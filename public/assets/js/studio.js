(() => {
    'use strict';
    const themeButton = document.getElementById('themeToggleBtn');
    function updateThemeLabel() {
        const dark = document.documentElement.dataset.theme === 'dark';
        themeButton?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
        themeButton?.setAttribute('aria-pressed', String(dark));
    }
    themeButton?.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        try { localStorage.setItem('theme', theme); } catch (_) {}
        updateThemeLabel();
    });
    updateThemeLabel();

    const menuButton = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    function closeMenu() {
        mobileMenu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
    }
    menuButton?.addEventListener('click', () => {
        const open = menuButton.getAttribute('aria-expanded') !== 'true';
        mobileMenu.hidden = !open;
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) { closeMenu(); menuButton.focus(); }
    });
    document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
        const service = document.getElementById('service');
        service.value = link.dataset.service;
        service.dispatchEvent(new Event('change', {bubbles:true}));
    }));

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if ('IntersectionObserver' in window && !reduced.matches) {
        document.documentElement.classList.add('reveal-ready');
        const observer = new IntersectionObserver(entries => entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        }),{threshold:.06});
        document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element));
    }
    const figure = document.getElementById('glassFigure');
    if (figure) {
        import('./glass.js?v=20261106-1').then(module => module.mountGlass(document.getElementById('glassCanvas'))).catch(() => {
            figure.dataset.renderer = 'fallback';
            document.getElementById('glassReplay').hidden = true;
            document.getElementById('glassHint').textContent = 'A new perspective.';
        });
    }

    // --- Contact Form AJAX Submission ---
        const inquiryForm = document.getElementById('inquiryForm');
        const formAlert = document.getElementById('formAlert');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');

        function showInquiryAlert(message, success, errors = {}) {
            formAlert.className = 'mb-6 p-4 rounded-xl text-sm font-medium block ' + (success
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200');
            const icon = document.createElement('i');
            icon.className = success
                ? 'fa-solid fa-circle-check text-emerald-500 mr-2'
                : 'fa-solid fa-triangle-exclamation text-rose-500 mr-2';
            formAlert.replaceChildren(icon, document.createTextNode(message));

            if (errors && typeof errors === 'object') {
                const messages = Object.values(errors).filter(value => typeof value === 'string');
                if (messages.length) {
                    const list = document.createElement('ul');
                    list.className = 'mt-2 list-disc list-inside text-xs';
                    messages.forEach(value => {
                        const item = document.createElement('li');
                        item.textContent = value;
                        list.append(item);
                    });
                    formAlert.append(list);
                }
            }
        }

        if (inquiryForm) {
            inquiryForm.addEventListener('submit', async function (e) {
                e.preventDefault();
                if (submitBtn.disabled) return;

                submitBtn.disabled = true;
                btnText.innerText = 'Submitting Your Request...';
                btnIcon.className = 'fa-solid fa-spinner fa-spin text-sm';
                formAlert.className = 'hidden';

                try {
                    const response = await fetch(inquiryForm.action, {
                        method: 'POST',
                        body: new FormData(inquiryForm),
                        headers: {
                            'Accept': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });
                    const data = await response.json();

                    if (response.ok && data.status === 'success') {
                        showInquiryAlert(data.message || 'Your inquiry has been sent to our team.', true);
                        inquiryForm.reset();
                    } else {
                        showInquiryAlert(data.message || 'We could not send your inquiry. Please try again later.', false, data.errors);
                    }
                } catch (error) {
                    showInquiryAlert("We couldn't confirm your inquiry was sent. Your details are still here; please try again or email demomailid4343@gmail.com directly.", false);
                } finally {
                    submitBtn.disabled = false;
                    btnText.innerText = 'Submit Inquiry & Schedule Demo';
                    btnIcon.className = 'fa-solid fa-paper-plane text-sm';
                }
            });
        }
})();
