import * as THREE from './vendor/three.module.min.js';

// A solid, bevelled glass sheet fractured into irregular triangular prisms.
// The environment is generated locally; no HDR images or network assets are needed.
function triangulate(points) {
    const source = [...points, [-30, -20], [30, -20], [0, 35]];
    const count = points.length;
    let triangles = [[count, count + 1, count + 2]];
    function contains(triangle, point) {
        const [a, b, c] = triangle.map(index => source[index]);
        const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
        if (Math.abs(d) < 1e-10) return false;
        const aa = a[0] ** 2 + a[1] ** 2, bb = b[0] ** 2 + b[1] ** 2, cc = c[0] ** 2 + c[1] ** 2;
        const x = (aa * (b[1] - c[1]) + bb * (c[1] - a[1]) + cc * (a[1] - b[1])) / d;
        const y = (aa * (c[0] - b[0]) + bb * (a[0] - c[0]) + cc * (b[0] - a[0])) / d;
        return (point[0] - x) ** 2 + (point[1] - y) ** 2 <= (a[0] - x) ** 2 + (a[1] - y) ** 2 + 1e-8;
    }
    for (let index = 0; index < count; index++) {
        const bad = triangles.filter(triangle => contains(triangle, source[index]));
        const edges = new Map();
        bad.forEach(triangle => {
            for (let side = 0; side < 3; side++) {
                const edge = [triangle[side], triangle[(side + 1) % 3]].sort((a, b) => a - b);
                const key = edge.join(',');
                edges.set(key, edges.has(key) ? null : edge);
            }
        });
        triangles = triangles.filter(triangle => !bad.includes(triangle));
        for (const edge of edges.values()) if (edge) triangles.push([...edge, index]);
    }
    return triangles.filter(triangle => triangle.every(index => index < count)).map(triangle => triangle.map(index => source[index]));
}

function studioEnvironment(renderer) {
    const studio = new THREE.Scene();
    const room = new THREE.Mesh(new THREE.BoxGeometry(16, 16, 16), new THREE.MeshBasicMaterial({color: '#252d30', side: THREE.BackSide}));
    studio.add(room);
    function panel(width, height, position, color) {
        const light = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({color}));
        light.position.set(...position);
        light.lookAt(0, 0, 0);
        studio.add(light);
    }
    panel(2.2, 8, [-4, 2, 4], new THREE.Color(5, 5.5, 5.2));
    panel(.65, 9, [3.5, .2, 4], new THREE.Color(3, 3.8, 4.3));
    panel(7, 2, [0, 5, 1], new THREE.Color(3.4, 3.7, 3.2));
    panel(3, 5, [4, -2, -3], new THREE.Color(.8, 1.5, .65));
    const generator = new THREE.PMREMGenerator(renderer);
    const environment = generator.fromScene(studio, .02);
    generator.dispose();
    studio.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
    return environment;
}

function backdrop() {
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = textureCanvas.height = 1024;
    const context = textureCanvas.getContext('2d');
    context.fillStyle = '#102027';
    context.fillRect(0, 0, 1024, 1024);
    const glow = context.createRadialGradient(670, 650, 15, 620, 650, 630);
    glow.addColorStop(0, '#537b58'); glow.addColorStop(.42, '#28443c'); glow.addColorStop(1, '#102027');
    context.fillStyle = glow;
    context.fillRect(0, 0, 1024, 1024);
    context.font = '600 320px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#d3e7d822';
    context.fillText('NG', 510, 500);
    context.strokeStyle = '#d7eddd0c';
    context.lineWidth = 1;
    for (let line = 80; line < 1024; line += 96) { context.beginPath(); context.moveTo(0, line); context.lineTo(1024, line); context.stroke(); }
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({map: texture}));
}

export function mountGlass(canvas) {
    if (!canvas) return;
    const figure = canvas.closest('figure');
    const replay = document.getElementById('glassReplay');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: false, powerPreference: 'low-power'});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 641 ? 1 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#102027');
    const camera = new THREE.PerspectiveCamera(42, 1, .1, 40);
    camera.position.set(0, .15, 7.4);
    camera.lookAt(0, .12, 0);
    const environment = studioEnvironment(renderer);
    scene.environment = environment.texture;
    const background = backdrop();
    background.position.z = -1.1;
    scene.add(background);
    scene.add(new THREE.HemisphereLight('#f0fff6', '#344a40', 1.2));
    const key = new THREE.DirectionalLight('#ffffff', 3.3);
    key.position.set(-4, 5, 6);
    scene.add(key);
    const edge = new THREE.DirectionalLight('#c7efdd', 2.4);
    edge.position.set(4, -1, 3);
    scene.add(edge);

    const sculpture = new THREE.Group();
    sculpture.position.y = .22;
    scene.add(sculpture);
    const points = [
        [-1.72,-1.95],[-.5,-1.95],[.8,-1.95],[1.72,-1.95],
        [1.72,-.7],[1.72,.6],[1.72,1.95],[.55,1.95],[-.7,1.95],[-1.72,1.95],[-1.72,.65],[-1.72,-.6],
        [-.25,.3],[.55,-.5],[-.8,-.65],[.65,1.05]
    ];
    const triangles = triangulate(points);
    const pieces = [];
    const material = new THREE.MeshPhysicalMaterial({
        color: '#e3f2ee', metalness: 0, roughness: .065, transmission: .98, thickness: .24,
        ior: 1.5, clearcoat: 1, clearcoatRoughness: .05, envMapIntensity: 1.55,
        attenuationColor: new THREE.Color('#c2e9db'), attenuationDistance: 2.4
    });
    triangles.forEach((vertices, index) => {
        const x = vertices.reduce((sum, vertex) => sum + vertex[0], 0) / 3;
        const y = vertices.reduce((sum, vertex) => sum + vertex[1], 0) / 3;
        const shape = new THREE.Shape();
        vertices.forEach(([vx, vy], vertex) => shape[vertex ? 'lineTo' : 'moveTo']((vx - x) * .962, (vy - y) * .962));
        shape.closePath();
        const geometry = new THREE.ExtrudeGeometry(shape, {depth: .155, steps: 1, bevelEnabled: true, bevelSize: .013, bevelThickness: .015, bevelSegments: 2, curveSegments: 1});
        geometry.translate(0, 0, -.08);
        const glassMaterial = material.clone();
        glassMaterial.roughness = .035 + (index % 5) * .012;
        const mesh = new THREE.Mesh(geometry, glassMaterial);
        const seed = Math.sin((index + 1) * 32.73);
        const outer = Math.hypot(x, y) > 1.5;
        const home = new THREE.Vector3(x * 1.035, y * 1.035, seed * .09);
        pieces.push({mesh, home, seed, outer, index});
        sculpture.add(mesh);
    });
    // Detached edge chips add depth without covering the content or controls.
    for (const [index, position] of [[-2.12,1.5,.2],[2.06,1.72,.4],[-2.12,-1.72,.35],[1.95,-1.55,.9]].entries()) {
        const shape = new THREE.Shape().moveTo(-.12,-.13).lineTo(.15,-.05).lineTo(.03,.25).closePath();
        const chip = new THREE.Mesh(new THREE.ExtrudeGeometry(shape,{depth:.09,bevelEnabled:true,bevelSize:.009,bevelThickness:.01,bevelSegments:1}),material.clone());
        const home = new THREE.Vector3(...position);
        pieces.push({mesh:chip,home,seed:Math.sin(index*8+1),outer:true,index:index+triangles.length});
        sculpture.add(chip);
    }
    material.dispose();

    let frame = null, visible = true, lost = false, destroyed = false, lastRender = 0;
    let replayStart = performance.now(), staticSpread = false;
    const pointer = {x:0,y:0,hover:false};
    const current = {x:0,y:0};
    function pose(now) {
        const time = reduced.matches ? 0 : now * .00035;
        current.x += (pointer.x - current.x) * .055;
        current.y += (pointer.y - current.y) * .055;
        sculpture.rotation.set(.13 - current.y * .1, -.24 + current.x * .18 + Math.sin(time) * .04, -.12);
        const elapsed = (now - replayStart) / 1600;
        const burst = reduced.matches ? (staticSpread ? .75 : 0) : Math.pow(Math.max(0, 1 - elapsed), 3) * 1.25;
        const hover = !reduced.matches && pointer.hover ? .09 : 0;
        pieces.forEach(({mesh,home,seed,outer,index}) => {
            const spread = burst + hover;
            mesh.position.copy(home);
            mesh.position.x += home.x * spread * .48;
            mesh.position.y += home.y * spread * .43 + Math.sin(time * 1.2 + index) * (outer ? .024 : .008);
            mesh.position.z += seed * spread * .9;
            mesh.rotation.set(seed * (.035 + spread * .24), seed * (.045 + spread * .3), seed * spread * .1);
        });
    }
    function render(now = performance.now()) {
        frame = null;
        if (destroyed || lost || !visible || document.hidden) return;
        if (now - lastRender >= 1000 / 30 || reduced.matches) {
            lastRender = now;
            pose(now);
            renderer.render(scene, camera);
        }
        if (!reduced.matches) frame = requestAnimationFrame(render);
    }
    function requestRender() { if (frame === null && !destroyed && !lost && visible && !document.hidden) frame = requestAnimationFrame(render); }
    function resize() {
        const rect = figure.getBoundingClientRect();
        renderer.setSize(Math.max(1,rect.width), Math.max(1,rect.height), false);
        camera.aspect = rect.width / Math.max(1,rect.height);
        camera.updateProjectionMatrix();
        requestRender();
    }
    function move(event) {
        if (reduced.matches) return;
        const rect = figure.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width * 2 - 1;
        pointer.y = (event.clientY - rect.top) / rect.height * 2 - 1;
        pointer.hover = true;
        figure.classList.add('has-interacted');
        requestRender();
    }
    function leave() { pointer.x = 0; pointer.y = 0; pointer.hover = false; requestRender(); }
    function replayAnimation() { replayStart = performance.now(); staticSpread = !staticSpread; figure.classList.add('has-interacted'); requestRender(); }
    function motionChanged() {
        replay?.setAttribute('aria-label', reduced.matches ? 'Change glass composition' : 'Replay glass animation');
        if (frame !== null) { cancelAnimationFrame(frame); frame = null; }
        requestRender();
    }
    function visibilityChanged() {
        if (document.hidden && frame !== null) { cancelAnimationFrame(frame); frame = null; }
        else requestRender();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(figure);
    const intersection = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        if (!visible && frame !== null) { cancelAnimationFrame(frame); frame = null; }
        else requestRender();
    });
    intersection.observe(figure);
    figure.addEventListener('pointermove',move,{passive:true});
    figure.addEventListener('pointerleave',leave);
    replay?.addEventListener('click',replayAnimation);
    reduced.addEventListener('change',motionChanged);
    document.addEventListener('visibilitychange',visibilityChanged);
    canvas.addEventListener('webglcontextlost',event => {
        event.preventDefault(); lost = true;
        if (frame !== null) { cancelAnimationFrame(frame); frame = null; }
        figure.classList.remove('is-webgl');
    });
    canvas.addEventListener('webglcontextrestored',() => { lost = false; figure.classList.add('is-webgl'); requestRender(); });
    resize();
    pose(reduced.matches ? 2000 : performance.now());
    renderer.render(scene,camera);
    figure.classList.add('is-webgl');
    figure.dataset.renderer = 'webgl';
    motionChanged();
    window.addEventListener('pagehide',event => {
        if (event.persisted) return;
        destroyed = true;
        if (frame !== null) cancelAnimationFrame(frame);
        resizeObserver.disconnect(); intersection.disconnect();
        reduced.removeEventListener('change',motionChanged);
        document.removeEventListener('visibilitychange',visibilityChanged);
        scene.traverse(object => { object.geometry?.dispose(); if (object.material) { object.material.map?.dispose(); object.material.dispose(); } });
        environment.dispose(); renderer.dispose();
    },{once:true});
}
