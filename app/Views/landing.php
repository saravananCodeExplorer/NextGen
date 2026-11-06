<?php
$services = [
    [
        'title' => 'Digital Marketing & Growth',
        'description' => 'Ungal business-ah next level-ku kondu poga high-intent customer leads & strong brand visibility create panrom. Google Ads, Meta Ads & SEO moolama sales double aagum!',
        'features' => [
            'Google Ads & Meta PPC Campaigns (High ROI)',
            'Advanced Search Engine Optimization (SEO Ranking)',
            'Social Media Brand Management & Posters',
            'High-Converting Funnel & Landing Page Design',
        ],
        'cta' => 'Inquire for Digital Growth',
        'value' => 'Digital Marketing & SEO',
    ],
    [
        'title' => 'Web & Mobile App Development',
        'description' => 'Modern UI/UX design, lightning speed-la work aagura Android & iOS mobile apps! Scalable web portals engineering panrom. Customers unga app-ah use panna wow feel panna veipom!',
        'features' => [
            'Native iOS & Android & Flutter Cross-Platform Apps',
            'Modern Web Applications & Customer Portals',
            'High-Throughput REST & GraphQL APIs',
            'Intuitive Figma Prototype to Production Code',
        ],
        'cta' => 'Build an App with Us',
        'value' => 'Web & Mobile App Development',
    ],
    [
        'title' => 'Smart ERP & Billing Software',
        'description' => 'Kadaiku bill podurathula neram waste aagutha? 3 seconds-la GST billing, barcode scanning, multi-godown stock alerts & instant WhatsApp bill share! Stock theera poratha munbadiye therinjukonga!',
        'features' => [
            'Quick 3-Second GST & Non-GST Billing (Thermal Print)',
            'Multi-Location Inventory & Automatic Stock Alerts',
            'Thermal Printing & Instant WhatsApp Invoices',
            'Customer Ledger, Credit Limits & P&L Reports',
        ],
        'cta' => 'Request Billing Software Demo',
        'value' => 'Billing & POS Software',
    ],
    [
        'title' => 'School & College Campus ERP',
        'description' => 'Fees collection tracking, biometric attendance, online admission, exam report cards & parent notification app! Campus-oda administrative burdens-ah zero aaki, 100% digital-ah manage pannunga.',
        'features' => [
            'Online Admission & Automated Fee Payment Gateway',
            'RFID / Biometric Student & Staff Attendance',
            'Automated Exam Grading & Digital Report Cards',
            'Dedicated Mobile Apps for Parents & Faculty',
        ],
        'cta' => 'Campus ERP Demo & Brochure',
        'value' => 'School / College ERP',
    ],
    [
        'title' => 'Corporate & Enterprise ERP',
        'description' => 'Multiple branches, hundreds of staff, complex supply chain irukka? HRMS, biometric attendance, automatic payroll (PF/ESI) & vendor purchase orders - ellathaiyum fingertips-la control pannunga!',
        'features' => [
            'Full HRMS, Biometric Attendance & Payroll (PF/ESI)',
            'Supply Chain, Vendor & Purchase Orders',
            'Multi-Entity Consolidation & Audit Trails',
            'Executive PowerBI & Real-Time Dashboards',
        ],
        'cta' => 'Consult for Enterprise ERP',
        'value' => 'Enterprise ERP Software',
    ],
    [
        'title' => 'Bespoke Custom Software',
        'description' => 'Off-the-shelf software unga unique operational workflows-ku set aagalaya? Unga business-oda exact calculation, approval chain & logic-ku custom software ready panni tharuvom!',
        'features' => [
            'Tailored Internal Business Workflow Systems',
            'Legacy System Migration & Cloud Refactoring',
            'Custom Third-Party API & Hardware Scanner Sync',
            'Dedicated Maintenance & Feature Upgrades',
        ],
        'cta' => 'Discuss Custom Software',
        'value' => 'Custom Software Development',
    ],
];
$arrow = '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
?>
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#f6f6f2">
    <title>Next Gen Technologies — Software, thoughtfully built.</title>
    <meta name="description" content="ERP systems, custom software, web and mobile applications, and digital marketing. Next Gen Technologies builds connected digital experiences around your business.">
    <script>try { if (localStorage.getItem('theme') === 'dark') document.documentElement.dataset.theme = 'dark'; } catch (_) {}</script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= esc(base_url('assets/css/studio.css?v=20261106-1')) ?>">
    <script src="<?= esc(base_url('assets/js/studio.js?v=20261106-1')) ?>" defer></script>
    <link rel="stylesheet" href="<?= esc(base_url('assets/css/restored-sections.css?v=20261106-2')) ?>">
    <script src="<?= esc(base_url('assets/js/software-showcase.js?v=20261106-2')) ?>" defer></script>
</head>
<body>
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="announcement"><span>Ready to modernize your institution or enterprise?</span><a href="#contact">Book a free consultation & demo <span aria-hidden="true">↗</span></a></div>
    <header class="site-header" id="top">
        <div class="container header-inner">
            <a href="#top" class="wordmark" aria-label="Next Gen Technologies home">
                <svg class="brand-symbol" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M5 30V6h7l12 16V6h7v24h-7L12 14v16H5Z" fill="currentColor"/><path d="m16 3 5 30" stroke="var(--page)" stroke-width="2.5"/></svg>
                <span>Next<span class="wordmark-accent">Gen</span><small>TECHNOLOGIES</small></span>
            </a>
            <nav class="desktop-nav" aria-label="Main navigation">
                <a href="#software-3d">Software demos</a><a href="#services">Services</a><a href="#erp-solutions">ERP suites</a><a href="#industries">Industries</a><a href="#why-us">Why us</a><a href="#process">Process</a>
            </nav>
            <div class="header-actions">
                <button id="themeToggleBtn" class="icon-button theme-button" type="button" aria-label="Switch to dark theme" aria-pressed="false">
                    <svg class="theme-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                    <svg class="theme-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </button>
                <a href="#contact" class="button button-small header-contact">Let’s talk <span aria-hidden="true">↗</span></a>
                <button id="mobileMenuBtn" class="icon-button menu-button" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open navigation"><span></span><span></span></button>
            </div>
        </div>
        <nav id="mobileMenu" class="mobile-nav" aria-label="Mobile navigation" hidden>
            <a href="#software-3d">Software demos</a><a href="#services">Services</a><a href="#erp-solutions">ERP suites</a><a href="#industries">Industries</a><a href="#why-us">Why choose us</a><a href="#process">Our process</a><a href="#contact">Start a conversation ↗</a>
        </nav>
    </header>

    <main id="main">
        <section class="hero container" aria-labelledby="hero-title">
            <div class="hero-copy">
                <p class="eyebrow"><span class="status-dot"></span> INDEPENDENT THINKING. CONNECTED SOLUTIONS.</p>
                <h1 id="hero-title">Good software.<br><em>Real progress.</em></h1>
                <p class="hero-description">We turn complex operations into simple, connected experiences. ERP, custom applications and digital growth — built around your business.</p>
                <div class="hero-actions"><a href="#contact" class="button">Start your next chapter <?= $arrow ?></a><a href="#services" class="text-link">Explore our expertise <span aria-hidden="true">↘</span></a></div>
                <div class="hero-note"><span class="note-line"></span><p>Thoughtfully designed.<br>Built to work in the real world.</p></div>
            </div>
            <figure class="glass-figure" id="glassFigure" aria-label="An interactive sculpture of fractured glass, with light catching its floating edges">
                <div class="glass-meta"><span>NEXT GEN / A NEW PERSPECTIVE</span><span class="glass-cross" aria-hidden="true">+</span></div>
                <div class="glass-scene" id="glassScene">
                    <svg class="glass-fallback" viewBox="0 0 600 600" role="img" aria-label="Floating, fractured glass panels">
                        <defs><linearGradient id="shard" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#e1fff5" stop-opacity=".7"/><stop offset=".4" stop-color="#7495ad" stop-opacity=".12"/><stop offset="1" stop-color="#c1f1e2" stop-opacity=".45"/></linearGradient><radialGradient id="glow"><stop stop-color="#b5e6ae" stop-opacity=".6"/><stop offset="1" stop-color="#13232b" stop-opacity="0"/></radialGradient><filter id="shadow"><feGaussianBlur stdDeviation="17"/></filter></defs>
                        <ellipse cx="315" cy="484" rx="150" ry="23" fill="#000" opacity=".7" filter="url(#shadow)"/><ellipse cx="350" cy="355" rx="230" ry="230" fill="url(#glow)"/><text x="135" y="354" fill="#e2ede4" font-family="sans-serif" font-size="170" font-weight="600" opacity=".2">NG</text>
                        <g fill="url(#shard)" stroke="#d5faf0" stroke-opacity=".75" stroke-width="1.3"><path d="m135 138 145 79-33 100Z"/><path d="m150 124 210-5-70 87Z"/><path d="m377 122 88 10-165 78Z"/><path d="m468 151 12 173-172-94Z"/><path d="m494 349-23 111-167-213Z"/><path d="m452 477-127 8-33-234Z"/><path d="m307 481-132-30 99-204Z"/><path d="m156 431-26-119 129-77Z"/><path d="m126 286-3-118 129 157Z"/><path d="m95 112 27 12-8 38Z"/><path d="m490 105 29 8-34 31Z"/><path d="m121 463 24 24-32 11Z"/></g>
                    </svg>
                    <canvas id="glassCanvas" aria-hidden="true"></canvas>
                </div>
                <figcaption class="glass-caption"><div><span class="glass-caption-index">01 / CLARITY BY DESIGN</span><p>Different pieces.<br><em>One clear direction.</em></p></div><button class="glass-replay" id="glassReplay" type="button" aria-label="Replay glass animation" title="Replay glass animation"><span aria-hidden="true">↻</span></button></figcaption>
                <span class="glass-hint" id="glassHint">Move your pointer to explore</span>
            </figure>
        </section>

        <div class="container capability-strip" aria-label="Our focus"><span>IDEAS, CONNECTED.</span><p>Enterprise systems</p><i aria-hidden="true">/</i><p>Digital experiences</p><i aria-hidden="true">/</i><p>Business growth</p><a href="#services" aria-label="Discover our expertise">↓</a></div>


        <div class="container trust-metrics" aria-label="Our experience and support">
            <div><strong>150+</strong><span>Projects Delivered</span></div><div><strong>99.9%</strong><span>Cloud Uptime & SLA</span></div><div><strong>50k+</strong><span>Daily ERP Users</span></div><div><strong>24/7</strong><span>Technical Support</span></div>
        </div>

        <?= view('partials/software_showcase') ?>

        <section class="section container" id="services" aria-labelledby="services-title">
            <div class="section-heading" data-reveal><p class="eyebrow">02 / OUR SPECIALIZED SERVICES</p><div><h2 id="services-title">Our specialized<br><em>services.</em></h2><p>Unga business growth-ku thevaiyaana all-in-one digital solutions. High-tech results with friendly support!</p></div></div>
            <div class="service-list restored-service-grid">
                <?php foreach ($services as $index => $service): ?>
                <a class="service-row" href="#contact" data-service="<?= esc($service['value']) ?>" data-reveal>
                    <span class="service-number"><?= sprintf('%02d', $index + 1) ?></span>
                    <div class="service-title"><h3><?= esc($service['title']) ?></h3></div>
                    <div class="service-description"><p><?= esc($service['description']) ?></p><ul class="restored-feature-list"><?php foreach ($service['features'] as $feature): ?><li><?= esc($feature) ?></li><?php endforeach ?></ul><span class="service-inquiry"><?= esc($service['cta']) ?> <span aria-hidden="true">↗</span></span></div>
                    <span class="service-arrow" aria-hidden="true">↗</span>
                </a>
                <?php endforeach ?>
            </div>
        </section>

        <section class="erp-section" id="erp-solutions" aria-labelledby="erp-title">
            <div class="container erp-layout">
                <div class="erp-copy" data-reveal><p class="eyebrow">03 / SPECIALIZED SOLUTIONS</p><h2 id="erp-title">Engineered specifically for <em>schools, colleges & enterprises.</em></h2><p>Whether you manage an educational campus with thousands of students or operate a multi-branch corporate enterprise, Next Gen ERP scales effortlessly to your exact organizational structure.</p><ul class="feature-list restored-erp-features"><li><span>01</span><div><h3>Campus 360° Management</h3><p>Fee dues reminders via automated SMS/WhatsApp, parent portal, digital hall tickets, and real-time GPS bus tracking.</p></div></li><li><span>02</span><div><h3>Enterprise Departmental Sync</h3><p>Seamless connectivity between Sales, Purchasing, HR, Accounts, and Executive Management with fine-grained role permissions.</p></div></li><li><span>03</span><div><h3>Audit-Ready Compliance &amp; Security</h3><p>End-to-end data encryption, automated daily cloud backups, GST filing exports, and role-based access logs.</p></div></li></ul><a href="#contact" class="text-link" data-service="Enterprise ERP Software">Let’s discuss your ERP <?= $arrow ?></a></div>
                <div class="dashboard-wrap" data-reveal>
                    <div class="dashboard-demo" aria-label="Illustrative ERP dashboard with example data">
                        <aside class="demo-sidebar" aria-hidden="true"><span class="demo-brand">n<span>g</span>.</span><span class="demo-nav selected">▦</span><span class="demo-nav">≡</span><span class="demo-nav">□</span><span class="demo-nav">↗</span><span class="demo-avatar">N</span></aside>
                        <div class="demo-main"><div class="demo-topbar"><span>Workspace <span class="demo-muted">/ Overview</span></span><span class="demo-online"><i></i> Connected</span></div><div class="demo-greeting"><p>YOUR WORKSPACE, AT A GLANCE</p><h3>A little more clarity.</h3><span>Everything you need. In one place.</span></div><div class="demo-stats"><div><span>Orders</span><strong>248<small>↗</small></strong></div><div><span>Inventory</span><strong>1,420<small>◎</small></strong></div><div><span>Departments</span><strong>06<small>⌘</small></strong></div></div><div class="demo-chart"><div><h4>Operations overview</h4><span>This week ▾</span></div><div class="chart-grid" aria-hidden="true"><span style="--bar:44%"></span><span style="--bar:62%"></span><span style="--bar:51%"></span><span style="--bar:78%"></span><span style="--bar:65%"></span><span style="--bar:93%"></span><span style="--bar:82%"></span></div><div class="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div class="demo-bottom"><span><i></i> Your teams, connected.</span><span>View workspace ↗</span></div></div>
                    </div>
                    <p class="demo-disclaimer">INTERFACE CONCEPT · EXAMPLE DATA</p>
                </div>
            </div>
        </section>

        <section class="section container industries-section" id="industries" aria-labelledby="industries-title">
            <div class="section-heading compact" data-reveal><p class="eyebrow">04 / TARGETED EXPERTISE</p><div><h2 id="industries-title">Software tailored<br><em>to your industry.</em></h2><p class="restored-section-intro">Every sector receives specialized billing, regulatory compliance, and multi-location inventory solutions.</p></div></div>
            <div class="industry-grid"><article data-reveal><span class="industry-mark" aria-hidden="true">⌑</span><h3>Schools &amp; Colleges</h3><p>Admissions, student fee receipts, biometric teacher logs, online exam grading, and parent notification portals.</p></article><article data-reveal><span class="industry-mark" aria-hidden="true">▥</span><h3>Retail &amp; Supermarkets</h3><p>Barcode scanner integration, instant GST POS billing, inventory depletion alerts, and customer loyalty points.</p></article><article data-reveal><span class="industry-mark" aria-hidden="true">⌗</span><h3>Manufacturing &amp; Logistics</h3><p>Raw material procurement, production line tracking, multi-warehouse dispatch, and vendor invoice settlement.</p></article><article data-reveal><span class="industry-mark" aria-hidden="true">⌘</span><h3>Corporate &amp; Enterprises</h3><p>HRMS, payroll calculation with PF/ESI deductions, custom workflow approvals, and corporate BI dashboards.</p></article></div>
        </section>

        <section class="approach-section" id="why-us" aria-labelledby="approach-title"><div class="container approach-layout"><div data-reveal><p class="eyebrow">05 / THE NEXT GEN ADVANTAGE</p><h2 id="approach-title">Why companies & institutions <em>choose us.</em></h2><p class="approach-intro">We deliver more than lines of code: we build reliable digital infrastructure that drives your business forward.</p><a href="#contact" class="text-link">Meet your next technology partner <?= $arrow ?></a></div><div class="approach-principles"><article data-reveal><span>01</span><div><h3>100% Tailored to Your Rules</h3><p>Unlike rigid software that forces you to change your operations, our software is engineered around your exact institutional and business workflows.</p></div></article><article data-reveal><span>02</span><div><h3>Direct Support &amp; Training</h3><p>Hands-on staff training sessions, thorough documentation, and direct phone/WhatsApp technical support to ensure seamless user adoption.</p></div></article><article data-reveal><span>03</span><div><h3>Cloud Ready &amp; Bank-Grade Security</h3><p>Hosted on ultra-reliable cloud servers with daily automated backups, SSL/TLS encryption, and multi-factor authentication for total data peace of mind.</p></div></article></div></div></section>

        <section class="section container" id="process" aria-labelledby="process-title"><div class="section-heading compact" data-reveal><p class="eyebrow">06 / HOW WE WORK</p><div><h2 id="process-title">From concept to<br><em>production deployment.</em></h2><p class="restored-section-intro">Clear roadmaps, transparent sprints, and predictable milestones.</p></div></div><div class="process-grid"><article data-reveal><span class="process-number">01</span><h3>Requirement Analysis</h3><p>We consult with your department heads to map every process, ledger, approval chain, and metric you need.</p></article><article data-reveal><span class="process-number">02</span><h3>UI/UX &amp; Architecture</h3><p>Interactive wireframes, database modeling, and prototype screens reviewed with your team prior to coding.</p></article><article data-reveal><span class="process-number">03</span><h3>Development &amp; QA</h3><p>Agile sprint builds, automated unit tests, and rigorous load testing to ensure rock-solid speed and reliability.</p></article><article data-reveal><span class="process-number">04</span><h3>Deployment &amp; Training</h3><p>Seamless data migration, staff training sessions, go-live support, and dedicated 24/7 SLA maintenance.</p></article></div></section>

        <section class="contact-section" id="contact" aria-labelledby="contact-title"><div class="container contact-layout"><div class="contact-copy" data-reveal><p class="eyebrow"><span class="status-dot"></span> YOUR NEXT CHAPTER STARTS HERE</p><h2 id="contact-title">Let’s build your<br><em>solution together.</em></h2><p>Have questions about our School/College ERP, custom software, billing system, mobile app, or digital marketing? Call or WhatsApp our tech specialists today for an instant proposal and free demo.</p><div class="contact-details"><a href="mailto:demomailid4343@gmail.com"><small>WRITE TO US</small><span>demomailid4343@gmail.com ↗</span></a><a href="tel:+916380190949"><small>GIVE US A CALL</small><span>+91 63801 90949 ↗</span></a><div><small>FIND US</small><span>Tamil Nadu, India</span></div></div><a class="contact-whatsapp" href="https://wa.me/916380190949?text=Hello%20Next%20Gen%2C%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener">Prefer a quick chat? Find us on WhatsApp <span aria-hidden="true">↗</span></a></div>
            <div class="inquiry-panel" data-reveal><div class="form-heading"><h3>Request a Quote & Demo</h3><p>Share a few details. We’ll take it from there.</p></div><div id="formAlert" role="status" aria-live="polite" class="hidden"></div>
                <form id="inquiryForm" action="<?= esc(site_url('inquiry')) ?>" method="POST">
                    <?= csrf_field() ?>
                    <div class="form-grid"><div class="field"><label for="name">Your name <span>*</span></label><input id="name" name="name" type="text" autocomplete="name" placeholder="Full name" minlength="2" maxlength="100" required></div><div class="field"><label for="company">Company / institution</label><input id="company" name="company" type="text" autocomplete="organization" placeholder="Where you work" maxlength="150"></div><div class="field"><label for="email">Email address <span>*</span></label><input id="email" name="email" type="email" autocomplete="email" placeholder="you@company.com" maxlength="254" required></div><div class="field"><label for="phone">Phone / WhatsApp <span>*</span></label><input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="Your contact number" minlength="7" maxlength="20" required></div></div>
                    <div class="field"><label for="service">What can we help you with? <span>*</span></label><select id="service" name="service" required><option value="" selected disabled>Select a service</option><option value="School / College ERP">School & College ERP</option><option value="Enterprise ERP Software">Enterprise ERP Software</option><option value="Billing & POS Software">Billing & POS Software</option><option value="Web & Mobile App Development">Web & Mobile App Development</option><option value="Custom Software Development">Custom Software Development</option><option value="Digital Marketing & SEO">Digital Marketing & SEO</option><option value="Multiple / Full Suite Package">Multiple Services / Full Suite</option></select></div>
                    <div class="field"><label for="message">A little about your project</label><textarea id="message" name="message" rows="4" maxlength="2000" placeholder="What are you working on, and what would you like to change?"></textarea></div>
                    <button id="submitBtn" class="button form-submit" type="submit"><span id="btnText">Submit Inquiry & Schedule Demo</span><i id="btnIcon" class="fa-solid fa-paper-plane" aria-hidden="true"></i></button><p class="form-note">Your details help us respond to your inquiry.</p>
                </form>
            </div>
        </div></section>
    </main>

    <footer class="site-footer"><div class="container footer-top restored-footer"><div class="footer-brand"><a class="wordmark" href="#top" aria-label="Next Gen Technologies home"><span>Next<span class="wordmark-accent">Gen</span><small>TECHNOLOGIES</small></span></a><p>Pioneering enterprise software, campus management ERPs, intuitive mobile and web applications, and high-impact digital marketing services.</p><a class="text-link" href="mailto:demomailid4343@gmail.com">demomailid4343@gmail.com ↗</a></div><div class="footer-column"><h3>ERP Systems</h3><ul><li><a href="#services">School Campus ERP</a></li><li><a href="#services">College &amp; University ERP</a></li><li><a href="#services">Corporate Enterprise ERP</a></li><li><a href="#services">GST Billing &amp; POS Software</a></li><li><a href="#services">Multi-Store Inventory</a></li></ul></div><div class="footer-column"><h3>Software &amp; Marketing</h3><ul><li><a href="#services">iOS &amp; Android App Dev</a></li><li><a href="#services">Custom Web Applications</a></li><li><a href="#services">Search Engine Optimization</a></li><li><a href="#services">Google &amp; Meta PPC Ads</a></li><li><a href="#services">Bespoke Custom Software</a></li></ul></div><div class="footer-column"><h3>Company</h3><ul><li><a href="#why-us">About Us</a></li><li><a href="#process">Work Process</a></li><li><a href="#industries">Industry Verticals</a></li><li><a href="#contact">Request a Proposal</a></li><li><a href="#contact">Privacy Policy &amp; Terms</a></li></ul></div></div><div class="container footer-bottom"><span>© <?= date('Y') ?> Next Gen Technologies. All rights reserved.</span><span>Enterprise systems. Human thinking.</span><a href="#top">Back to top ↑</a></div></footer>
    <a class="floating-contact" href="https://wa.me/916380190949?text=Hello%20Next%20Gen%2C%20I%20would%20like%20to%20discuss%20a%20project" target="_blank" rel="noopener" aria-label="Chat with Next Gen on WhatsApp"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.1-4.9A8.5 8.5 0 1 1 20.5 11.5Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 7.7c0 3.9 2.4 6.3 6.3 6.3l1-2-2-1-.9 1c-1.1-.6-1.8-1.3-2.4-2.4l1-.9-1-2-2 1Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg></a>
</body>
</html>
