(() => {
    'use strict';
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const root=document.documentElement;
    const toggle=document.getElementById('waterMotion');
    const canvas=document.createElement('canvas');
    canvas.id='waterOverlay'; canvas.setAttribute('aria-hidden','true');
    document.body.append(canvas);
    const context=canvas.getContext('2d');
    let paused=false,frame=null,drops=[],rings=[],last=0,lastHover=0,destroyed=false;
    let width=0,height=0;
    const small=window.matchMedia('(pointer: coarse)').matches;

    function resize() {
        width=window.innerWidth; height=window.innerHeight;
        const ratio=Math.min(window.devicePixelRatio||1,1.5);
        canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
        canvas.style.width=width+'px'; canvas.style.height=height+'px';
        context?.setTransform(ratio,0,0,ratio,0,0);
    }
    function stop() {
        if (frame!==null) cancelAnimationFrame(frame);
        frame=null; drops=[]; rings=[]; last=0; context?.clearRect(0,0,width,height);
    }
    function applyMotion() {
        const disabled=paused||reduced.matches;
        root.dataset.waterMotion=reduced.matches?'reduced':paused?'paused':'playing';
        if (toggle) {
            toggle.disabled=reduced.matches;
            toggle.setAttribute('aria-label',disabled?'Resume water animation':'Pause water animation');
            toggle.setAttribute('aria-pressed',String(!disabled));
            toggle.title=reduced.matches?'Reduced motion is enabled':disabled?'Resume water animation':'Pause water animation';
            toggle.classList.toggle('is-paused',disabled);
        }
        if (disabled) stop();
        document.dispatchEvent(new CustomEvent('water:motion',{detail:{paused:disabled}}));
    }
    toggle?.addEventListener('click',()=>{ paused=!paused; applyMotion(); });
    document.addEventListener('water:play',()=>{ if (!reduced.matches) { paused=false; applyMotion(); } });

    function spawn(x,y,strength=1) {
        if (!context || paused || reduced.matches || destroyed || document.hidden) return;
        const now=performance.now()/1000;
        const count=Math.round((small?11:19)*strength);
        for (let index=0; index<count; index++) {
            const angle=Math.PI+(index/count)*Math.PI;
            const speed=(70+Math.random()*95)*strength;
            drops.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-35,radius:1.7+Math.random()*3.8,age:0,life:.7+Math.random()*.5});
        }
        drops=drops.slice(-(small?42:74));
        rings.push({x,y,age:0,life:.8,radius:12}); rings=rings.slice(-5);
        if (frame===null) { last=now; frame=requestAnimationFrame(draw); }
    }
    function draw(stamp) {
        frame=null;
        if (paused || reduced.matches || destroyed || document.hidden || !context) { stop(); return; }
        const time=stamp/1000,dt=Math.min(.035,Math.max(0,time-last));last=time;
        context.clearRect(0,0,width,height);
        rings=rings.filter(ring=>{
            ring.age+=dt; if (ring.age>ring.life) return false;
            const p=ring.age/ring.life;
            context.save(); context.translate(ring.x,ring.y); context.scale(1,.5);
            context.beginPath();context.arc(0,0,ring.radius+p*70,0,Math.PI*2);
            context.strokeStyle=`rgba(82,163,198,${(1-p)*.3})`;context.lineWidth=1.1;context.stroke();context.restore();return true;
        });
        drops=drops.filter(drop=>{
            drop.age+=dt;if(drop.age>drop.life)return false;
            drop.vy+=245*dt;drop.x+=drop.vx*dt;drop.y+=drop.vy*dt;
            const opacity=Math.min(1,(drop.life-drop.age)*4)*.68;
            context.save();context.translate(drop.x,drop.y);context.rotate(Math.atan2(drop.vy,drop.vx)+Math.PI/2);
            const stretch=1+Math.min(.9,Math.abs(drop.vy)/200);
            context.scale(1,stretch);
            const fill=context.createRadialGradient(-drop.radius*.25,-drop.radius*.3,.1,0,0,drop.radius);
            fill.addColorStop(0,`rgba(247,255,255,${opacity})`);fill.addColorStop(.4,`rgba(176,223,239,${opacity*.42})`);fill.addColorStop(.85,`rgba(59,133,169,${opacity*.4})`);fill.addColorStop(1,`rgba(203,244,255,${opacity*.7})`);
            context.beginPath();context.arc(0,0,drop.radius,0,Math.PI*2);context.fillStyle=fill;context.fill();
            context.strokeStyle=`rgba(84,151,179,${opacity*.45})`;context.lineWidth=.55;context.stroke();
            context.beginPath();context.ellipse(-drop.radius*.23,-drop.radius*.3,drop.radius*.19,drop.radius*.3,-.4,0,Math.PI*2);context.fillStyle=`rgba(255,255,255,${opacity*.9})`;context.fill();context.restore();return true;
        });
        if (drops.length||rings.length) frame=requestAnimationFrame(draw);
        else { last=0;context.clearRect(0,0,width,height); }
    }
    const targets=[...document.querySelectorAll('.button:not(.form-submit), .service-row, .industry-grid article, .trust-metrics > div')];
    targets.forEach(target=>{
        target.classList.add('water-interactive');
        function sheen(event) {
            if(paused||reduced.matches)return;
            const rect=target.getBoundingClientRect();
            target.style.setProperty('--water-x',`${event.clientX-rect.left}px`);
            target.style.setProperty('--water-y',`${event.clientY-rect.top}px`);
            target.classList.remove('water-hit');
            requestAnimationFrame(()=>target.classList.add('water-hit'));
        }
        target.addEventListener('pointerenter',event=>{
            sheen(event);
            const now=performance.now();
            if(event.pointerType==='mouse'&&now-lastHover>180) {lastHover=now;spawn(event.clientX,event.clientY,.45);}
        },{passive:true});
        target.addEventListener('pointerdown',event=>{sheen(event);spawn(event.clientX,event.clientY,1);},{passive:true});
        target.addEventListener('animationend',event=>{if(event.animationName==='water-sheen')target.classList.remove('water-hit');});
    });
    window.addEventListener('resize',resize,{passive:true});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
    reduced.addEventListener('change',applyMotion);
    window.addEventListener('pagehide',event=>{if(!event.persisted){destroyed=true;stop();reduced.removeEventListener('change',applyMotion);canvas.remove();}},{once:true});
    resize();applyMotion();
})();
