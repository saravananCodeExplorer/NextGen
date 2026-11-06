(() => {
    'use strict';
    const viewport = document.getElementById('softwareViewport');
    if (!viewport) return;
    const panels = [...viewport.querySelectorAll('.sw3d-panel')];
    const tabs = [...document.querySelectorAll('.software-tabs [role="tab"]')];
    const label = document.getElementById('sw3d-label-text');
    const inquiry = document.getElementById('showcaseInquiry');
    const motion = document.getElementById('sw3d-motion');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = 0, paused = reduced.matches, inView = false, hovered = false, focusInside = false;
    let pointer = null, drag = 0, suppressClickUntil = 0;
    const total = panels.length;

    function render(offset = 0) {
        const scale = Math.min(1, Math.max(.45, (viewport.clientWidth - 68) / 360));
        panels.forEach((panel, index) => {
            const distance = ((index - active + total + total / 2) % total) - total / 2;
            const abs = Math.abs(distance);
            panel.style.transform = `translate3d(${distance * 280 * scale + offset}px,0,${-abs * 150}px) rotateY(${-distance * 36}deg) scale(${scale * (abs ? .88 : 1)})`;
            panel.style.opacity = abs > 1 ? '0' : abs ? '.5' : '1';
            panel.style.filter = abs ? 'saturate(.4) brightness(.78)' : 'saturate(.8)';
            panel.style.zIndex = String(total - abs);
            panel.style.pointerEvents = abs ? 'none' : 'auto';
            panel.setAttribute('aria-hidden', String(index !== active));
            panel.inert = index !== active;
        });
        tabs.forEach((tab,index) => { tab.setAttribute('aria-selected',String(index === active)); tab.tabIndex = index === active ? 0 : -1; });
        label.textContent = panels[active].dataset.label;
        inquiry.dataset.service = panels[active].querySelector('[data-service]').dataset.service;
        motion.textContent = `Auto rotation: ${paused ? 'off' : 'on'}`;
        motion.setAttribute('aria-pressed',String(!paused));
    }
    function select(index, manual = false) {
        active = (index + total) % total;
        if (manual) paused = true;
        render();
    }
    document.getElementById('sw3d-prev').addEventListener('click',() => select(active-1,true));
    document.getElementById('sw3d-next').addEventListener('click',() => select(active+1,true));
    tabs.forEach((tab,index) => {
        tab.addEventListener('click',() => select(index,true));
        tab.addEventListener('keydown',event => {
            const target = event.key === 'ArrowRight' ? active+1 : event.key === 'ArrowLeft' ? active-1 : event.key === 'Home' ? 0 : event.key === 'End' ? total-1 : null;
            if (target === null) return;
            event.preventDefault(); select(target,true); tabs[active].focus({preventScroll:true});
        });
    });
    motion.addEventListener('click',() => { paused = !paused; render(); });
    viewport.addEventListener('pointerenter',() => { hovered = true; });
    viewport.addEventListener('pointerleave',() => { hovered = false; });
    document.getElementById('software-3d').addEventListener('focusin',() => { focusInside = true; });
    document.getElementById('software-3d').addEventListener('focusout',event => { focusInside = event.currentTarget.contains(event.relatedTarget); });
    viewport.addEventListener('dragstart',event => event.preventDefault());
    viewport.addEventListener('pointerdown',event => {
        if (event.button !== 0 || event.target.closest('button')) return;
        pointer = {id:event.pointerId,x:event.clientX,y:event.clientY,dragging:false};
        drag = 0;
    });
    viewport.addEventListener('pointermove',event => {
        if (!pointer || pointer.id !== event.pointerId) return;
        const x = event.clientX-pointer.x, y = event.clientY-pointer.y;
        if (!pointer.dragging && Math.abs(x)>9 && Math.abs(x)>Math.abs(y)) {
            pointer.dragging = true; paused = true;
            viewport.setPointerCapture(event.pointerId);
            viewport.classList.add('is-dragging');
        }
        if (pointer.dragging) { drag = x; render(x*.55); }
    });
    function endDrag(event) {
        if (!pointer || pointer.id !== event.pointerId) return;
        const dragging = pointer.dragging;
        pointer = null;
        viewport.classList.remove('is-dragging');
        if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
        if (dragging) {
            suppressClickUntil = performance.now()+350;
            select(active + (Math.abs(drag)>40 ? (drag<0 ? 1 : -1) : 0),true);
        }
        drag = 0;
    }
    viewport.addEventListener('pointerup',endDrag);
    viewport.addEventListener('pointercancel',endDrag);
    viewport.addEventListener('click',event => {
        if (performance.now()<suppressClickUntil) { event.preventDefault(); event.stopPropagation(); }
    },true);
    const resize = new ResizeObserver(() => render());
    resize.observe(viewport);
    const visibility = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; },{threshold:.15});
    visibility.observe(viewport);
    const timer = setInterval(() => {
        if (!paused && !reduced.matches && inView && !document.hidden && !hovered && !focusInside && !pointer) select(active+1);
    },6000);
    function motionChanged() { if (reduced.matches) paused = true; render(); }
    reduced.addEventListener('change',motionChanged);
    window.addEventListener('pagehide',event => {
        if (event.persisted) return;
        clearInterval(timer); resize.disconnect(); visibility.disconnect();
        reduced.removeEventListener('change',motionChanged);
    },{once:true});
    render();
})();
