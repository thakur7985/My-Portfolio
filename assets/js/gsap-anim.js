// GSAP animations (hero text reveal, scroll marquee, section reveals)
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('gsap-on');

    // Split text into masked words (and optionally chars), keeping <br> and inner spans
    function split(el, type) {
        var pieces = [];
        el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());

        function walk(node) {
            Array.prototype.slice.call(node.childNodes).forEach(function (n) {
                if (n.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    n.textContent.split(/(\s+)/).forEach(function (part) {
                        if (!part) return;
                        if (/^\s+$/.test(part)) {
                            frag.appendChild(document.createTextNode(' '));
                            return;
                        }
                        var word = document.createElement('span');
                        word.className = 'split-word';
                        word.setAttribute('aria-hidden', 'true');
                        if (type === 'chars') {
                            part.split('').forEach(function (c) {
                                var ch = document.createElement('span');
                                ch.className = 'split-piece';
                                ch.textContent = c;
                                word.appendChild(ch);
                                pieces.push(ch);
                            });
                        } else {
                            var inner = document.createElement('span');
                            inner.className = 'split-piece';
                            inner.textContent = part;
                            word.appendChild(inner);
                            pieces.push(inner);
                        }
                        frag.appendChild(word);
                    });
                    n.parentNode.replaceChild(frag, n);
                } else if (n.nodeType === 1 && n.tagName !== 'BR') {
                    walk(n);
                }
            });
        }

        walk(el);
        return pieces;
    }

    // ---- Preloader (homepage, once per visit) ----
    var root = document.documentElement;
    var preloader = document.querySelector('.preloader');
    var preloaderActive = preloader && root.classList.contains('pl-on');
    var heroTl = null;
    var logoTl = null;

    if (preloaderActive) {
        var count = { value: 0 };
        var countEl = preloader.querySelector('.pl-count span');
        var plTl = gsap.timeline({
            defaults: { ease: 'power4.out' },
            onComplete: function () {
                root.classList.remove('pl-on');
                try { sessionStorage.setItem('preloaderSeen', '1'); } catch (e) {}
                ScrollTrigger.refresh();
                if (heroTl) heroTl.play();
                if (logoTl) logoTl.play();
            }
        });

        plTl.from(split(preloader.querySelector('.pl-hi'), 'chars'), { yPercent: 110, duration: 0.7, stagger: 0.03 })
            .from(split(preloader.querySelector('.pl-name'), 'chars'), {
                yPercent: 115, rotate: 8, duration: 1, stagger: 0.035
            }, 0.25)
            .from(split(preloader.querySelector('.pl-welcome'), 'words'), { yPercent: 110, duration: 0.8, stagger: 0.08 }, 0.9)
            .fromTo('.pl-bar span', { scaleX: 0 }, { scaleX: 1, duration: 2.3, ease: 'power2.inOut' }, 0)
            .to(count, {
                value: 100, duration: 2.3, ease: 'power2.inOut',
                onUpdate: function () { countEl.textContent = Math.round(count.value); }
            }, 0)
            .to('.preloader-inner, .pl-bottom', { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: 'power3.in' }, 2.4)
            .to(preloader, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'power4.inOut' }, 2.65);
    }

    // ---- Logo: box pops in, the T and A strokes draw themselves, nodes pop ----
    var brandMark = document.querySelector('.brand-mark');
    if (brandMark) {
        var strokes = brandMark.querySelectorAll('.bm-line');
        strokes.forEach(function (path) {
            var len = path.getTotalLength();
            gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        });
        logoTl = gsap.timeline({ paused: preloaderActive, delay: preloaderActive ? 0 : 0.2 })
            .from(brandMark.querySelector('.bm-box'), {
                scale: 0.4, rotate: -90, autoAlpha: 0, transformOrigin: '50% 50%', duration: 0.8, ease: 'back.out(1.7)'
            })
            .to(strokes, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', stagger: 0.25 }, 0.35)
            .from(brandMark.querySelectorAll('.bm-node'), {
                scale: 0, transformOrigin: '50% 50%', duration: 0.5, ease: 'back.out(3)', stagger: 0.1
            }, 1)
            .from('.brand-text > *', { x: -14, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, 0.5);
    }

    // ---- Hero ----
    var heroTitle = document.querySelector('.home-text h1');
    if (heroTitle) {
        var chars = split(heroTitle, 'chars');
        var tl = heroTl = gsap.timeline({ paused: preloaderActive, defaults: { ease: 'power4.out' } });

        tl.from('.hero-eyebrow', { y: 20, autoAlpha: 0, duration: 0.6 })
          .from(chars, { yPercent: 120, rotate: 6, duration: 1, stagger: 0.018 }, '-=0.3');

        // Hero drifts up and fades as you scroll away
        gsap.to('#home .home-text', {
            yPercent: -25,
            autoAlpha: 0.15,
            ease: 'none',
            scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true }
        });
    }

    // ---- Big tech marquee: rows slide in opposite directions with scroll ----
    gsap.utils.toArray('.marquee-row').forEach(function (row) {
        var track = row.querySelector('.marquee-track');
        var toLeft = row.dataset.direction === 'left';
        gsap.fromTo(track,
            { xPercent: toLeft ? 0 : -35 },
            {
                xPercent: toLeft ? -35 : 0,
                ease: 'none',
                scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
            });
    });

    // ---- Shared section labels + headings ----
    gsap.utils.toArray('.sec-label').forEach(function (label) {
        gsap.from(label, {
            y: 20, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: label, start: 'top 88%' }
        });
    });

    gsap.utils.toArray('.sec-heading, .contact-heading').forEach(function (heading) {
        gsap.from(split(heading, 'chars'), {
            yPercent: 115, rotate: 5, duration: 1, ease: 'power4.out', stagger: 0.02,
            scrollTrigger: { trigger: heading, start: 'top 85%' }
        });
    });

    // ---- Big statement: words light up as you scroll through ----
    gsap.utils.toArray('.big-statement-text').forEach(function (text) {
        gsap.fromTo(split(text, 'words'),
            { opacity: 0.12 },
            {
                opacity: 1, ease: 'none', stagger: 0.1,
                scrollTrigger: { trigger: text, start: 'top 80%', end: 'bottom 45%', scrub: true }
            });
    });

    // ---- About ----
    var about = document.querySelector('.about-v2');
    if (about) {
        // Giant outline word slides across behind the section
        gsap.fromTo('.about-bg-word', { xPercent: 5 }, {
            xPercent: -40, ease: 'none',
            scrollTrigger: { trigger: about, start: 'top bottom', end: 'bottom top', scrub: true }
        });

        // Photo opens like a curtain while the image eases out of a zoom
        if (document.querySelector('.about-photo')) {
            gsap.timeline({ scrollTrigger: { trigger: '.about-visual', start: 'top 80%' } })
                .fromTo('.about-photo',
                    { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
                    { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.2, ease: 'power4.inOut' })
                .from('.about-photo img', { scale: 1.35, duration: 1.6, ease: 'power3.out' }, 0);

            // gentle parallax while scrolling past
            gsap.fromTo('.about-photo img', { yPercent: -4 }, {
                yPercent: 4, ease: 'none',
                scrollTrigger: { trigger: '.about-visual', start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }

        gsap.from('.about-label', {
            y: 20, autoAlpha: 0, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: '.about-body', start: 'top 80%' }
        });

        gsap.from(split(document.querySelector('.about-heading'), 'words'), {
            yPercent: 110, duration: 1, ease: 'power4.out', stagger: 0.07,
            scrollTrigger: { trigger: '.about-heading', start: 'top 85%' }
        });

        // Paragraph lights up word by word as you read down
        gsap.fromTo(split(document.querySelector('.about-para'), 'words'),
            { opacity: 0.15 },
            {
                opacity: 1, ease: 'none', stagger: 0.05,
                scrollTrigger: { trigger: '.about-para', start: 'top 80%', end: 'bottom 55%', scrub: true }
            });

        // Fact rows: divider line draws, then the text slides in
        gsap.utils.toArray('.about-facts li').forEach(function (li, i) {
            gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 90%' }, delay: i * 0.08 })
                .fromTo(li, { '--line': 0 }, { '--line': 1, duration: 0.9, ease: 'power3.inOut' })
                .from(li.children, { y: 20, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, 0.3);
        });

        gsap.from('.about-actions > *', {
            y: 24, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: '.about-actions', start: 'top 92%' }
        });
    }

    // ---- Projects: rows draw in ----
    gsap.utils.toArray('.work-item').forEach(function (item) {
        gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 90%' } })
            .fromTo(item, { '--line': 0 }, { '--line': 1, duration: 1, ease: 'power3.inOut' })
            .from(item.querySelectorAll('.work-num, .work-main, .work-meta, .work-toggle'), {
                y: 30, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06
            }, 0.25);
    });

    // ---- Project details: bullet points slide in when opened ----
    gsap.utils.toArray('.work-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.work-item');
            // Content below moves when a panel opens/closes, so re-measure triggers
            setTimeout(function () { ScrollTrigger.refresh(); }, 650);
            if (!item.classList.contains('open')) return;
            gsap.fromTo(item.querySelectorAll('.work-thumb, .work-intro, .work-points li, .work-link'),
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07, delay: 0.15 });
        });
    });

    // ---- Tool logo carousel: endless loop, speeds up with scroll, slows on hover ----
    var logoRows = gsap.utils.toArray('.logo-row');
    if (logoRows.length) {
        var loops = logoRows.map(function (row) {
            var track = row.querySelector('.logo-track');
            var toLeft = row.dataset.direction === 'left';
            // Track holds 4 identical copies, so moving 50% lands on an identical frame
            var loop = gsap.fromTo(track,
                { xPercent: toLeft ? 0 : -50 },
                { xPercent: toLeft ? -50 : 0, duration: 45, ease: 'none', repeat: -1 });
            // Start far into the repeats so it can also run backwards without hitting the start
            loop.totalTime(45 * 1000);
            return loop;
        });

        var hovering = false;
        var direction = 1;
        var settle = null;
        function setSpeed(speed, duration) {
            loops.forEach(function (loop) {
                gsap.to(loop, { timeScale: speed, duration: duration, ease: 'power2.out', overwrite: true });
            });
        }

        ScrollTrigger.create({
            trigger: '.logo-carousel',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: function (self) {
                if (hovering) return;
                var boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 250);
                // Scrolling up runs the rows backwards
                direction = self.direction;
                setSpeed(boost * direction, 0.2);
                if (settle) settle.kill();
                settle = gsap.delayedCall(0.25, function () { if (!hovering) setSpeed(direction, 1.2); });
            }
        });

        var carousel = document.querySelector('.logo-carousel');
        carousel.addEventListener('mouseenter', function () { hovering = true; setSpeed(0.15 * direction, 0.6); });
        carousel.addEventListener('mouseleave', function () { hovering = false; setSpeed(direction, 0.8); });

        gsap.from('.logo-row', {
            x: function (i) { return i % 2 ? 200 : -200; },
            autoAlpha: 0, duration: 1.2, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: '.logo-carousel', start: 'top 90%' }
        });
    }

    // ---- Contact ----
    if (document.querySelector('.contact-v2')) {
        gsap.utils.toArray('.contact-row').forEach(function (row, i) {
            gsap.timeline({ scrollTrigger: { trigger: '.contact-info', start: 'top 85%' }, delay: i * 0.12 })
                .fromTo(row, { '--line': 0 }, { '--line': 1, duration: 0.9, ease: 'power3.inOut' })
                .from(row.querySelectorAll('span, strong'), { x: -30, autoAlpha: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06 }, 0.25)
                .from(row.querySelector('i'), { autoAlpha: 0, duration: 0.5 }, 0.4);
        });
        gsap.from('.contact-form .field, .contact-submit', {
            y: 30, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: '.contact-form', start: 'top 85%' }
        });
    }

    // ---- Footer: giant name rises letter by letter ----
    var footerWord = document.querySelector('.footer-word');
    if (footerWord) {
        gsap.from(split(footerWord, 'chars'), {
            yPercent: 100, ease: 'none', stagger: 0.04,
            scrollTrigger: { trigger: footerWord, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 }
        });
        gsap.from('.footer-brand, .footer-col', {
            y: 30, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: '.footer-v2', start: 'top 85%' }
        });
    }

    // ---- Magnetic buttons (mouse only) ----
    if (window.matchMedia('(pointer: fine)').matches) {
        gsap.utils.toArray('.header-btn, .gts, .social-link, .about-cta, .contact-submit, .footer-icon').forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var r = btn.getBoundingClientRect();
                gsap.to(btn, {
                    x: (e.clientX - r.left - r.width / 2) * 0.3,
                    y: (e.clientY - r.top - r.height / 2) * 0.3,
                    duration: 0.4, ease: 'power3.out'
                });
            });
            btn.addEventListener('mouseleave', function () {
                gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }

    // Images change the layout after load
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
